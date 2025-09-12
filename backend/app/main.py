from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.routes.comp_ver import router as company_verification_router

import requests

app = FastAPI(title="Company Verification API")
app.include_router(company_verification_router)
# Request model
class CompanyRequest(BaseModel):
    company_name: str

# Sample MCA verification function (placeholder for now)
def verify_company_mca(company_name):
    """
    Placeholder function for MCA verification.
    In the future, this can use MCA API or scrape MCA site.
    Returns a dictionary with verification results.
    """
    # TODO: Implement actual MCA API call or scraping
    dummy_result = {
        "company_name": company_name,
        "status": "Active",
        "registered_address": "123, Sample Street, City",
        "CIN": "U12345MH2025PTC123456"
    }
    return dummy_result

# Endpoint for company verification
@app.post("/verify-company")
def verify_company(request: CompanyRequest):
    result = verify_company_mca(request.company_name)
    if not result:
        raise HTTPException(status_code=404, detail="Company not found")
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
