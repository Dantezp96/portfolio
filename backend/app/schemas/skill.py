from pydantic import BaseModel


class SkillOut(BaseModel):
    id: int
    name: str
    category: str
    proficiency: int
    icon_name: str | None = None
    display_order: int

    model_config = {"from_attributes": True}
