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
    max_games = int(input("Enter number of games : "))
    while start_value < max_games:
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
            if game.find('div', class_="css-l24hbj"):
                price_container = game.find('div', class_="css-1a6kj04")
                price_container_2 = price_container.find('div', class_="css-o1hbmr")
                price = price_container_2.find('span', class_="css-119zqif").text.strip()
            else:
                price = "N/A"
            print(f"{name.ljust(60)} - {price.rjust(15)}")
        start_value += 100

epic_scraper = scrape_epic_page()
print(epic_scraper)