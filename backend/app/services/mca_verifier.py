# app/services/mca_verifier.py

import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import time

def verify_company_mca(company_name: str):
    try:
        if not company_name:
            return None

        # Launch undetected Chrome
        driver = uc.Chrome()
        driver.maximize_window()
        driver.implicitly_wait(10)

        # Load MCA search page directly
        url = "https://www.mca.gov.in/content/mca/global/en/mca/master-data/MDS.html"
        driver.get(url)

        # Wait until the correct search input is present
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "searchbox2"))
        )

        # Enter company name and submit
        search_box.clear()
        search_box.send_keys(company_name)
        search_box.send_keys(u'\ue007')  # Press Enter

        # Wait for results table to appear
        try:
            table = WebDriverWait(driver, 20).until(
                EC.visibility_of_element_located((By.TAG_NAME, "table"))
            )
            table_html = table.get_attribute("outerHTML")
        except TimeoutException:
            # Fallback: grab table HTML via JS
            try:
                table_html = driver.execute_script("return document.querySelector('table').outerHTML;")
            except Exception:
                driver.quit()
                return None

        # Parse table with BeautifulSoup
        soup = BeautifulSoup(table_html, "html.parser")
        rows = soup.find_all("tr")
        company_data = {}
        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 2:
                key = cols[0].get_text(strip=True).lower().replace(" ", "_")
                value = cols[1].get_text(strip=True)
                company_data[key] = value

        driver.quit()

        if not company_data:
            return None

        company_data["searched_name"] = company_name
        return company_data

    except Exception as e:
        print("❌ Error in verify_company_mca:", str(e))
        if 'driver' in locals():
            driver.quit()
        return None
