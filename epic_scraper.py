import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import undetected_chromedriver as uc 
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options 
from fuzzywuzzy import fuzz
import time

options = uc.ChromeOptions() 
options.headless = False
driver = uc.Chrome(options=options) 

def is_similar(epicgame, steamgame, threshold=80):
    similarity = fuzz.ratio(epicgame.lower(), steamgame.lower())
    return similarity >= threshold

def scrape_epic_page():
    start_value = 0
    index = 1
    max_games = int(input("Enter number of games : "))
    while start_value < max_games:
        epic_url = f"https://store.epicgames.com/en-US/browse?sortBy=title&sortDir=ASC&category=Game&count=100&start={start_value}"
        driver.get(epic_url)
        time.sleep(1)
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
            print(f"Index: {index}")
            print(f"Name: {name}")
            print(f"Price: {price}")
            print(f"Link: {link}")

            steam_game = input("Enter game here: ")
            if is_similar(name, steam_game):
                print("They are same game")

            index+=1
        start_value += 100

epic_scraper = scrape_epic_page()
print(epic_scraper)
driver.quit()