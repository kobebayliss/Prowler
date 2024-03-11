import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from fuzzywuzzy import fuzz
import time

epic_url = "https://store.epicgames.com/en-US/browse?sortBy=title&sortDir=ASC&category=Game&count=100"

driver = webdriver.Chrome()
driver.get(epic_url)

def scrape_epic_page(url):
    updated_html = driver.page_source
    soup = BeautifulSoup(updated_html, 'html.parser')

    container = soup.find('ul', class_="css-cnqlhg")
    for game in container.find_all('li'):
        name = game.find('div', class_="css-rgqwpc")
        print(name)

epic_scraper = scrape_epic_page(epic_url)
print(epic_scraper)