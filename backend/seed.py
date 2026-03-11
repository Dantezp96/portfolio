"""Seed script to populate the database with sample data."""

import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import engine, async_session
from app.models import Base, Project, Skill, Experience


PROJECTS = [
    Project(
        slug="real-time-object-detection",
        title="Real-Time Object Detection",
        short_description="YOLOv8 running 100% in the browser via ONNX Runtime Web — live webcam, image upload, demo gallery with sci-fi bounding boxes.",
        full_description="Built an in-browser real-time object detection app using YOLOv8-nano running via ONNX Runtime Web (WebAssembly). No backend needed — all inference happens client-side for total privacy. Features 3 detection modes (live webcam, image upload, demo gallery), sci-fi styled bounding boxes with neon glow, real-time FPS gauge, class breakdown stats, confidence threshold slider, and screenshot export. Bilingual ES/EN interface. 80 COCO classes detected.",
        category="Computer Vision",
        tech_stack=["React", "TypeScript", "ONNX Runtime", "YOLOv8", "Canvas API", "Vite"],
        thumbnail_url="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
        demo_url="https://real-time-object-detection-three.vercel.app",
        repo_url="https://github.com/Dantezp96/real-time-object-detection",
        display_order=1,
        is_featured=True,
        metrics='{"Classes": "80 COCO", "Model": "YOLOv8n", "Inference": "Browser WASM"}',
    ),
    Project(
        slug="satellite-image-segmentation",
        title="Satellite Image Segmentation",
        short_description="FLAIR U-Net+ResNet34 trained on real aerial imagery, running in the browser via ONNX Runtime Web — interactive satellite map with 15-class land cover segmentation.",
        full_description="Built an in-browser satellite image segmentation app using the FLAIR U-Net with ResNet34 encoder (trained on 218K real aerial imagery patches from French IGN at 0.2m/px) running via ONNX Runtime Web (WebAssembly). Features interactive MapLibre GL map with ESRI satellite tiles, image upload, demo gallery, 15 land cover classes (Building, Water, Coniferous, Deciduous, Agricultural Land, Bare Soil, Herbaceous, and more), real-time class distribution pie chart and stats, opacity slider, and bilingual ES/EN interface. Model quantized to 23MB INT8.",
        category="Image Analysis",
        tech_stack=["React", "TypeScript", "ONNX Runtime", "PyTorch", "MapLibre GL", "Vite"],
        thumbnail_url="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80",
        demo_url="https://satellite-image-segmentation.vercel.app",
        repo_url="https://github.com/Dantezp96/satellite-image-segmentation",
        display_order=2,
        is_featured=True,
        metrics='{"Classes": "15 Land Cover", "Model": "FLAIR U-Net ResNet34", "Size": "23MB INT8"}',
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
        title="RIPS ETL Pipeline",
        short_description="High-performance ETL pipeline processing +1M RIPS healthcare files daily with Apache Airflow, Polars Lazy API, and SHA-256 deduplication — 40% faster ingestion.",
        full_description="Designed and deployed production ETL pipelines processing +1M RIPS healthcare files daily with Apache Airflow (Dynamic Task Mapping, ThreadPoolExecutor). Reduced ingestion times 40% migrating from Pandas to Polars Lazy API. Implemented 3-layer validation pipeline (structure, content, relation) with SHA-256 deduplication and MinSalud/SISPRO integration, achieving 99.9% data integrity. Optimized SQL Server queries with in-process cache (27-74x speedup) and Celery with 3 specialized workers.",
        category="Data Engineering",
        tech_stack=["Python", "Apache Airflow", "Polars", "Celery", "Azure", "PostgreSQL"],
        thumbnail_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
        display_order=4,
        is_featured=True,
        metrics='{"Files/Day": "1M+", "Integrity": "99.9%", "Speedup": "27-74x", "Rules": "11.4K+"}',
    ),
    Project(
        slug="medical-image-classification",
        title="Medical Image Classification",
        short_description="Multi-modal AI medical diagnosis: chest X-ray (18 pathologies + GradCAM), skin cancer (7 types), and brain tumor (4 classes) — 100% in-browser.",
        full_description="Built a multi-modal medical image classification platform with 3 AI models running entirely in the browser. Chest X-Ray mode uses DenseNet121 trained on 400K+ images detecting 18 pulmonary conditions with GradCAM heatmaps. Skin Cancer mode uses MobileNetV2 on HAM10000 classifying 7 lesion types including Melanoma. Brain Tumor mode uses Swin Transformer on brain MRIs detecting Glioma, Meningioma, and Pituitary tumors. All inference via ONNX Runtime Web WASM — zero server, complete privacy.",
        category="Computer Vision",
        tech_stack=["React", "TypeScript", "ONNX Runtime Web", "DenseNet121", "MobileNetV2", "Swin Transformer", "GradCAM", "Vite"],
        thumbnail_url="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80",
        demo_url="https://medical-image-classification-gilt.vercel.app",
        repo_url="https://github.com/Dantezp96/medical-image-classification",
        display_order=5,
        is_featured=True,
        metrics='{"Models": "3", "Classes": "29 total", "Inference": "<1.5s", "Privacy": "100% Browser"}',
    ),
    Project(
        slug="time-series-forecasting",
        title="Energy Demand Forecasting",
        short_description="Multi-model forecasting dashboard comparing Prophet, Fourier Series, Seasonal Naive and Weekly Average on PJM energy data — best MAPE 4.47%.",
        full_description="Built an interactive energy demand forecasting dashboard comparing 4 prediction models: Facebook Prophet, Fourier Series regression, Seasonal Naive, and Weekly Average. Features bilingual ES/EN interface, historical data with aggregation controls, 1-7 day forecasting with model selection, and a multi-model comparison chart with metrics table. React + Recharts frontend, FastAPI backend, deployed on Vercel + Railway.",
        category="ML / Time Series",
        tech_stack=["Python", "FastAPI", "Prophet", "NumPy", "React", "Recharts", "Pandas"],
        thumbnail_url="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=640&q=80",
        cover_image_url="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
        demo_url="https://energy-forecast-xi.vercel.app",
        repo_url="https://github.com/Dantezp96/energy-demand-forecasting",
        display_order=6,
        is_featured=True,
        metrics='{"Best MAPE": "4.47%", "Models": "4", "Records": "35K+"}',
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


async def update_project(slug: str):
    """Update a single project by slug using data from PROJECTS list."""
    from sqlalchemy import select

    target = next((p for p in PROJECTS if p.slug == slug), None)
    if not target:
        print(f"Project '{slug}' not found in PROJECTS list")
        return

    async with async_session() as session:
        result = await session.execute(select(Project).where(Project.slug == slug))
        existing = result.scalar_one_or_none()
        if not existing:
            print(f"Project '{slug}' not found in database")
            return

        existing.short_description = target.short_description
        existing.full_description = target.full_description
        existing.tech_stack = target.tech_stack
        existing.metrics = target.metrics
        existing.demo_url = target.demo_url
        existing.repo_url = target.repo_url
        await session.commit()
        print(f"Updated project '{slug}' successfully")


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "update":
        slug = sys.argv[2] if len(sys.argv) > 2 else None
        if slug:
            asyncio.run(update_project(slug))
        else:
            print("Usage: python seed.py update <slug>")
    else:
        asyncio.run(seed())
