from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from app.core.database import get_db
from app.core.config import settings
from app.models.project import Project
from app.schemas.project import ProjectOut

router = APIRouter()


class ProjectUpdate(BaseModel):
    short_description: str | None = None
    full_description: str | None = None
    tech_stack: list[str] | None = None
    metrics: str | None = None
    demo_url: str | None = None
    repo_url: str | None = None


@router.patch("/projects/{slug}")
async def update_project(
    slug: str,
    body: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
    x_api_key: str = Header(...),
):
    if x_api_key != settings.ADMIN_API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API key")
    result = await db.execute(select(Project).where(Project.slug == slug))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(project, field, value)
    await db.commit()
    return {"status": "updated", "slug": slug}


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
