from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/portfolio"
    FRONTEND_URL: str = "http://localhost:4321"
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    CONTACT_RECIPIENT_EMAIL: str = ""
    ADMIN_API_KEY: str = "change-me"
    RATE_LIMIT_PER_MINUTE: int = 5
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.1-8b-instant"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
