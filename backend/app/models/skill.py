from sqlalchemy import Column, String, Integer
from app.models.base import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    proficiency = Column(Integer, default=0)
    icon_name = Column(String(50))
    display_order = Column(Integer, default=0)
