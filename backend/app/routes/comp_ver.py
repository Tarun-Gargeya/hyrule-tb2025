from fastapi import APIRouter
from app.services.mca_verifier import verify_company_mca

router = APIRouter()

@router.post("/verify-company")
async def verify_company(data: dict):
    company_name = data.get("company_name")
    result = verify_company_mca(company_name)
    return result or {"error": "Could not verify company"}
