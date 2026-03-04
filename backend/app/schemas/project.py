from pydantic import BaseModel


class ProjectOut(BaseModel):
    id: int
    slug: str
    title: str
    short_description: str
    full_description: str
    category: str
    tech_stack: list[str]
    thumbnail_url: str
    cover_image_url: str | None = None
    media_urls: list[str] = []
    demo_url: str | None = None
    repo_url: str | None = None
    display_order: int
    is_featured: bool
    metrics: str | None = None

    model_config = {"from_attributes": True}
