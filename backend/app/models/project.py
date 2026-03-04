from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, Float
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.sql import func
from app.models.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    short_description = Column(String(300), nullable=False)
    full_description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)
    tech_stack = Column(ARRAY(String), nullable=False, default=[])
    thumbnail_url = Column(String(500), nullable=False)
    cover_image_url = Column(String(500))
    media_urls = Column(ARRAY(String), default=[])
    demo_url = Column(String(500))
    repo_url = Column(String(500))
    display_order = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    metrics = Column(Text)  # JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
