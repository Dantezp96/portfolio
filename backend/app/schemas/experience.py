from pydantic import BaseModel


class ExperienceOut(BaseModel):
    id: int
    company: str
    role: str
    description: str | None = None
    start_date: str
    end_date: str | None = None
    tech_used: list[str] = []
    company_logo_url: str | None = None
    display_order: int

    model_config = {"from_attributes": True}
