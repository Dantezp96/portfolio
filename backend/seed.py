"""Seed script to populate the database with sample data."""

import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import engine, async_session
from app.models import Base, Project, Skill, Experience


PROJECTS = [
    Project(
        slug="real-time-object-detection",
        title="Real-Time Object Detection",
        short_description="YOLOv8-based detection system processing live video feeds at 30+ FPS with custom-trained models.",
        full_description="Built a real-time object detection pipeline using YOLOv8 with custom training on domain-specific data. The system processes live RTSP video feeds, performs inference on GPU, and streams annotated results via WebSocket. Achieved 94.2% mAP on the validation set.",
        category="Computer Vision",
        tech_stack=["Python", "YOLOv8", "OpenCV", "PyTorch", "FastAPI", "WebSocket"],
        thumbnail_url="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
        demo_url="https://demo.example.com/detection",
        repo_url="https://github.com/youruser/object-detection",
        display_order=1,
        is_featured=True,
        metrics='{"mAP": "94.2%", "FPS": "32", "Classes": "15"}',
    ),
    Project(
        slug="satellite-image-segmentation",
        title="Satellite Image Segmentation",
        short_description="U-Net architecture for land-use classification from satellite imagery with 96% pixel accuracy.",
        full_description="Developed a semantic segmentation model using a U-Net architecture with ResNet-50 encoder for classifying land use from high-resolution satellite imagery. The pipeline processes raw GeoTIFF data, handles tiling and augmentation, and produces georeferenced prediction masks.",
        category="Image Analysis",
        tech_stack=["Python", "TensorFlow", "Rasterio", "GDAL", "Docker", "AWS S3"],
        thumbnail_url="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80",
        repo_url="https://github.com/youruser/satellite-segmentation",
        display_order=2,
        is_featured=True,
        metrics='{"Pixel Accuracy": "96.1%", "IoU": "0.89", "Dataset": "50K tiles"}',
    ),
    Project(
        slug="nlp-sentiment-dashboard",
        title="NLP Sentiment Dashboard",
        short_description="Real-time sentiment analysis with RoBERTa model — interactive dashboard with word clouds, trends, and batch processing.",
        full_description="Built a real-time sentiment analysis dashboard using a fine-tuned RoBERTa model (cardiffnlp/twitter-roberta-base-sentiment-latest). Features single text and batch CSV analysis with confidence scores, interactive dashboard with pre-loaded tweet and product review datasets, word clouds, sentiment distribution charts, and temporal trend visualization.",
        category="NLP",
        tech_stack=["Python", "HuggingFace", "Gradio", "Transformers", "PyTorch", "Matplotlib"],
        thumbnail_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        demo_url="https://nlp-sentiment-dashboard-production.up.railway.app",
        repo_url="https://github.com/Dantezp96/nlp-sentiment-dashboard",
        display_order=3,
        is_featured=True,
        metrics='{"Throughput": "10K/min", "F1 Score": "0.91", "Latency": "<200ms"}',
    ),
    Project(
        slug="data-pipeline-etl",
        title="Automated ETL Pipeline",
        short_description="Scalable data pipeline processing 5TB+ daily with Apache Airflow and Spark on Kubernetes.",
        full_description="Designed and implemented a production-grade ETL pipeline using Apache Airflow for orchestration and PySpark for distributed processing. The system ingests data from multiple sources (APIs, S3, databases), performs complex transformations, and loads into a data warehouse for analytics.",
        category="Data Engineering",
        tech_stack=["Python", "Apache Airflow", "PySpark", "Kubernetes", "AWS", "Terraform"],
        thumbnail_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
        repo_url="https://github.com/youruser/etl-pipeline",
        display_order=4,
        is_featured=True,
        metrics='{"Daily Volume": "5TB+", "Uptime": "99.9%", "Jobs": "200+"}',
    ),
    Project(
        slug="medical-image-classification",
        title="Medical Image Classification",
        short_description="Deep learning model for X-ray anomaly detection achieving 97.3% sensitivity in clinical validation.",
        full_description="Developed a CNN-based classification system for detecting anomalies in chest X-ray images. Used transfer learning with EfficientNet-B4, trained on a curated dataset of 120K images. The model includes GradCAM explainability for clinical interpretability.",
        category="Computer Vision",
        tech_stack=["Python", "PyTorch", "MONAI", "GradCAM", "FastAPI", "DICOM"],
        thumbnail_url="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80",
        display_order=5,
        is_featured=True,
        metrics='{"Sensitivity": "97.3%", "Specificity": "95.1%", "AUC": "0.98"}',
    ),
    Project(
        slug="time-series-forecasting",
        title="Energy Demand Forecasting",
        short_description="LSTM + Transformer hybrid model for 24h energy demand prediction with 2.1% MAPE.",
        full_description="Built a hybrid forecasting model combining LSTM and Transformer attention mechanisms for predicting energy demand. The system incorporates weather data, calendar features, and historical patterns. Deployed as a microservice with automated retraining pipeline.",
        category="ML / Time Series",
        tech_stack=["Python", "PyTorch", "Prophet", "MLflow", "Redis", "Grafana"],
        thumbnail_url="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
        demo_url="https://demo.example.com/forecast",
        display_order=6,
        is_featured=True,
        metrics='{"MAPE": "2.1%", "Horizon": "24h", "Features": "45+"}',
    ),
]

SKILLS = [
    # Languages
    Skill(name="Python", category="Languages", proficiency=95, icon_name="python", display_order=1),
    Skill(name="SQL", category="Languages", proficiency=90, icon_name="database", display_order=2),
    Skill(name="R", category="Languages", proficiency=70, icon_name="r-lang", display_order=3),
    Skill(name="TypeScript", category="Languages", proficiency=65, icon_name="typescript", display_order=4),
    # ML / Deep Learning
    Skill(name="PyTorch", category="ML / Deep Learning", proficiency=90, icon_name="pytorch", display_order=1),
    Skill(name="TensorFlow", category="ML / Deep Learning", proficiency=85, icon_name="tensorflow", display_order=2),
    Skill(name="Scikit-learn", category="ML / Deep Learning", proficiency=92, icon_name="scikit", display_order=3),
    Skill(name="HuggingFace", category="ML / Deep Learning", proficiency=80, icon_name="huggingface", display_order=4),
    Skill(name="OpenCV", category="ML / Deep Learning", proficiency=88, icon_name="opencv", display_order=5),
    # Data Engineering
    Skill(name="Apache Spark", category="Data Engineering", proficiency=80, icon_name="spark", display_order=1),
    Skill(name="Apache Airflow", category="Data Engineering", proficiency=85, icon_name="airflow", display_order=2),
    Skill(name="PostgreSQL", category="Data Engineering", proficiency=88, icon_name="postgresql", display_order=3),
    Skill(name="Docker", category="Data Engineering", proficiency=85, icon_name="docker", display_order=4),
    Skill(name="Kubernetes", category="Data Engineering", proficiency=70, icon_name="kubernetes", display_order=5),
    # Tools & Cloud
    Skill(name="AWS", category="Tools & Cloud", proficiency=80, icon_name="aws", display_order=1),
    Skill(name="Git", category="Tools & Cloud", proficiency=90, icon_name="git", display_order=2),
    Skill(name="MLflow", category="Tools & Cloud", proficiency=75, icon_name="mlflow", display_order=3),
    Skill(name="Linux", category="Tools & Cloud", proficiency=85, icon_name="linux", display_order=4),
]

EXPERIENCES = [
    Experience(
        company="Tech Corp",
        role="Senior ML Engineer",
        description="Leading the computer vision team. Designed and deployed real-time inference pipelines serving 1M+ predictions/day. Reduced model inference latency by 40% through optimization.",
        start_date="2023-06",
        end_date=None,
        tech_used=["Python", "PyTorch", "Kubernetes", "AWS", "MLflow"],
        display_order=1,
    ),
    Experience(
        company="Data Solutions Inc",
        role="Data Engineer",
        description="Built scalable ETL pipelines processing 5TB+ daily. Migrated legacy batch systems to real-time streaming with Apache Kafka. Improved data freshness from 24h to 15min.",
        start_date="2021-03",
        end_date="2023-05",
        tech_used=["Python", "Apache Spark", "Airflow", "PostgreSQL", "Docker"],
        display_order=2,
    ),
    Experience(
        company="AI Startup",
        role="ML Engineer",
        description="Developed NLP models for document classification and entity extraction. Built training pipelines with automated hyperparameter tuning. Achieved 92% accuracy on production data.",
        start_date="2019-08",
        end_date="2021-02",
        tech_used=["Python", "TensorFlow", "HuggingFace", "GCP", "FastAPI"],
        display_order=3,
    ),
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        session.add_all(PROJECTS)
        session.add_all(SKILLS)
        session.add_all(EXPERIENCES)
        await session.commit()
        print(f"Seeded {len(PROJECTS)} projects, {len(SKILLS)} skills, {len(EXPERIENCES)} experiences")


if __name__ == "__main__":
    asyncio.run(seed())
