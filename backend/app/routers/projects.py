from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectOut

router = APIRouter()


@router.get("/projects", response_model=list[ProjectOut])
async def list_projects(
    featured: bool = Query(False),
    db: AsyncSession = Depends(get_db),
):
    query = select(Project).where(Project.is_published == True)
    if featured:
        query = query.where(Project.is_featured == True)
    query = query.order_by(Project.display_order)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/projects/{slug}", response_model=ProjectOut)
async def get_project(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project).where(Project.slug == slug, Project.is_published == True)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
