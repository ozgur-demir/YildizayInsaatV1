from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

app = FastAPI(title="YILDIZAY API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include routers
try:
    from routes.content import router as content_router
    app.include_router(content_router)
    logger.info("Content router registered successfully")
except Exception as e:
    logger.error(f"Failed to register content router: {str(e)}")

@app.get("/")
async def root():
    return {"message": "YILDIZAY API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "yildizay-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
