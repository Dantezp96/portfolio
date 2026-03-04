from pydantic import BaseModel, EmailStr


class ContactIn(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


class ContactOut(BaseModel):
    message: str
