from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.core.config import settings
from app.core.database import engine
from app.models import Base
from app.routers import health, projects, skills, experience, contact
from app.routers import chat


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(title="Portfolio API", version="1.0.0", lifespan=lifespan)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"detail": "Too many requests. Please wait a moment."})


app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:4321"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(projects.router, prefix="/api/v1", tags=["projects"])
app.include_router(skills.router, prefix="/api/v1", tags=["skills"])
app.include_router(experience.router, prefix="/api/v1", tags=["experience"])
app.include_router(contact.router, prefix="/api/v1", tags=["contact"])
app.include_router(chat.router, prefix="/api/v1", tags=["chat"])
