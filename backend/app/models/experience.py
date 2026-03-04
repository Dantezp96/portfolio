from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.dialects.postgresql import ARRAY
from app.models.base import Base


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(200), nullable=False)
    role = Column(String(200), nullable=False)
    description = Column(Text)
    start_date = Column(String(7), nullable=False)  # "2022-01"
    end_date = Column(String(7))  # null = current
    tech_used = Column(ARRAY(String), default=[])
    company_logo_url = Column(String(500))
    display_order = Column(Integer, default=0)
