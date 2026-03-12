"""Chat endpoint with rate limiting."""

from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel, Field
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.services.chat import chat_completion
from app.core.config import settings

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(max_length=500)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(max_length=20)


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat", response_model=ChatResponse)
@limiter.limit("5/minute")
async def chat(request: Request, body: ChatRequest):
    if not settings.GROQ_API_KEY:
        raise HTTPException(status_code=503, detail="Chat service not configured")

    messages = [{"role": m.role, "content": m.content} for m in body.messages]
    reply = await chat_completion(messages)
    return ChatResponse(reply=reply)
