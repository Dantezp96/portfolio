from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.models.base import Base


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(300), nullable=False)
    subject = Column(String(300))
    message = Column(Text, nullable=False)
    ip_address = Column(String(45))
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    is_read = Column(Boolean, default=False)
