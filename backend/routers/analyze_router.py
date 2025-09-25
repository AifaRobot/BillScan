from fastapi import APIRouter, File, UploadFile
from models.bill_model import Bill
from services.analyze import analyze_image

router = APIRouter()

@router.post("/analyze", response_model=Bill)
async def analyze(image: UploadFile = File(...)):
    info = await analyze_image(image)
    return info