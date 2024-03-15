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
            link_container = game.find('a', class_="css-g3jcms")
            link = f"https://store.epicgames.com/{link_container.get('href')}"
            print(link)
            game_page = requests.get(link)
            soup2 = BeautifulSoup(game_page.content, 'html.parser')
            print(soup2)
            description_container = soup2.find(id="about-long-description")
            description = description_container.find('div', class_="css-1o9l22h").text.strip()
            print(f"Name: {name}")
            print(f"Price: {price}")
            print(f"Link: {link}")
            print(f"Description: {description}")
        start_value += 100

epic_scraper = scrape_epic_page()
print(epic_scraper)