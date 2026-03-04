from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.experience import Experience
from app.schemas.experience import ExperienceOut

router = APIRouter()


@router.get("/experience", response_model=list[ExperienceOut])
async def list_experience(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Experience).order_by(Experience.display_order)
    )
    return result.scalars().all()
