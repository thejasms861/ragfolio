import logging
import time
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("RagfolioAPI")

# Import RAG query function
try:
    from .rag_query import answer_question
except ImportError:
    try:
        from rag_query import answer_question
    except ImportError:
        raise ImportError("Failed to import 'answer_question' from 'rag_query'. Ensure rag_query.py is in the same directory.")

app = FastAPI(
    title="Ragfolio RAG API",
    description="An orchestration layer for querying resume data using RAG.",
    version="1.0.0",
)

# CORS Configuration for development flexibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.debug(f"Request start: {request.method} {request.url}")
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.debug(f"Request end: {request.method} {request.url} - Status: {response.status_code} - Time: {process_time:.2f}s")
        return response
    except Exception as e:
        logger.exception(f"Unhandled exception during request: {request.method} {request.url}")
        raise

class AskRequest(BaseModel):
    """
    Schema for the RAG query request.
    """
    question: str


class AskResponse(BaseModel):
    """
    Schema for the RAG query response.
    """
    answer: str


@app.get("/api/health")
async def health():
    """
    Simple health check endpoint.
    """
    return {"status": "ok"}


@app.post("/api/ask", response_model=AskResponse)
async def ask(request: AskRequest):
    """
    Enhanced RAG endpoint with detailed logging and error handling.
    """
    if not request.question or not request.question.strip():
        logger.debug("Validation failed: Empty question received.")
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty or whitespace only.",
        )

    try:
        logger.debug(f"Incoming question: {request.question}")

        # Call the RAG engine
        answer = answer_question(request.question)

        # Example of logging observability data (adjust based on actual implementation)
        logger.debug({
            "retrieved_context": "[Example context items]",  # Replace with actual context retrieval logs
            "gemini_prompt": "[Example Gemini prompt]",  # Replace with actual prompt
            "gemini_output": answer,  # Replace with actual Gemini output
            "model_parameters": {"temperature": 0.7, "model": "gemini-2.5-flash-lite"},  # Gemini model used
        })

        return AskResponse(answer=answer)
    except Exception as e:
        logger.exception("Error during RAG processing.")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during RAG processing: {str(e)}",
        )


# Serve Frontend Static Files (only in production)
FRONTEND_DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(FRONTEND_DIST_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST_DIR, "assets")), name="static")

    @app.get("/{full_path:path}")
    async def serve_react_app(request: Request, full_path: str):
        # Allow /api to pass through
        if full_path.startswith("api"):
            raise HTTPException(status_code=404)
        
        # Look for the file in the frontend/dist folder
        file_path = os.path.join(FRONTEND_DIST_DIR, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
            
        # Default to React's index.html
        return FileResponse(os.path.join(FRONTEND_DIST_DIR, "index.html"))

if __name__ == "__main__":
    import uvicorn

    # Load configuration from environment variables with sensible defaults
    host = os.getenv("UVICORN_HOST", "0.0.0.0")
    port = int(os.getenv("UVICORN_PORT", 8000))
    reload = os.getenv("UVICORN_RELOAD", "true").lower() in ("true", "1")
    log_level = os.getenv("UVICORN_LOG_LEVEL", "debug")

    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=reload,
        log_level=log_level,
    )
