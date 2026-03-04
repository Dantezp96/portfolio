from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactIn, ContactOut

router = APIRouter()


@router.post("/contact", response_model=ContactOut)
async def submit_contact(
    data: ContactIn,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    submission = ContactSubmission(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
        ip_address=request.client.host if request.client else None,
    )
    db.add(submission)
    await db.commit()
    return ContactOut(message="Message sent successfully")
