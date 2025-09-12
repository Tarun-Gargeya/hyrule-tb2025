# app/services/mca_verifier.py

def verify_company_mca(company_name: str):
    """
    Dummy company verification function for testing purposes.
    Returns fake company info instead of scraping MCA.
    """
    if not company_name:
        return None

    # Dummy data
    dummy_database = {
        "Amazon": {
            "status": "Active",
            "registered_address": "410 Terry Ave N, Seattle, WA 98109, USA",
            "CIN": "U12345MH2025PTC123456"
        },
        "Flipkart": {
            "status": "Active",
            "registered_address": "Buildings Alyssa, Embassy Tech Village, Bengaluru, Karnataka, India",
            "CIN": "U54321KA2020PTC098765"
        },
        "Infosys": {
            "status": "Active",
            "registered_address": "Electronics City, Bengaluru, Karnataka, India",
            "CIN": "U67890KA1981PLC012345"
        }
    }

    # Return dummy info if company is in the database
    company_data = dummy_database.get(company_name, {
        "status": "Unknown",
        "registered_address": "N/A",
        "CIN": "N/A"
    })

    # Include the searched name
    company_data["company_name"] = company_name
    return company_data
