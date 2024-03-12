import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from fuzzywuzzy import fuzz
import undetected_chromedriver as uc 
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options 
import time

options = uc.ChromeOptions() 
options.headless = False
driver = uc.Chrome(options=options) 

def scrape_epic_page():
    start_value = 0
    while start_value < 3800:
        epic_url = f"https://store.epicgames.com/en-US/browse?sortBy=title&sortDir=ASC&category=Game&count=100&start={start_value}"
        driver.get(epic_url)
        time.sleep(2)
        updated_html = driver.page_source
        soup = BeautifulSoup(updated_html, 'html.parser')
        container = soup.find('ul', class_="css-cnqlhg")
        for game in container.find_all('li'):
            if game.find('div', class_="css-rgqwpc"):
                name = game.find('div', class_="css-rgqwpc").text.strip()
            else:
                name = game.find('div', class_="css-8uhtka").text.strip()
            print(name)
        start_value += 100

epic_scraper = scrape_epic_page()
print(epic_scraper)