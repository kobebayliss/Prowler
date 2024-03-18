import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import undetected_chromedriver as uc 
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options 
import mysql.connector
from fuzzywuzzy import fuzz
import time

# initialising the undetected selenium page to bypass cloudflare
options = uc.ChromeOptions() 
options.headless = False
driver = uc.Chrome(options=options) 

#function to determine if steam game matches epic game
def is_similar(epicgame, steamgame, threshold=80):
    similarity = fuzz.ratio(epicgame.lower(), steamgame.lower())
    return similarity >= threshold

def scrape_epic_page():
    start_value = 0
    index = 1
    # determining how many games to scrape
    max_games = int(input("Enter number of games : "))
    while start_value < max_games:
        # dynamic link to go to next page when done
        epic_url = f"https://store.epicgames.com/en-US/browse?sortBy=title&sortDir=ASC&category=Game&count=100&start={start_value}"
        driver.get(epic_url)
        time.sleep(1)
        # getting HTML content from page and parsing it
        updated_html = driver.page_source
        soup = BeautifulSoup(updated_html, 'html.parser')
        # container for all games
        container = soup.find('ul', class_="css-cnqlhg")
        # finding each individual game
        for game in container.find_all('li'):
            # error handling for name since there are two name type classes
            if game.find('div', class_="css-rgqwpc"):
                name = game.find('div', class_="css-rgqwpc").text.strip()
            else:
                name = game.find('div', class_="css-8uhtka").text.strip()
            # error handling for price to see if its available
            if game.find('div', class_="css-l24hbj"):
                price_container = game.find('div', class_="css-1a6kj04")
                price_container_2 = price_container.find('div', class_="css-o1hbmr")
                price = price_container_2.find('span', class_="css-119zqif").text.strip()
            else:
                price = "N/A"
            # getting link for game
            link_container = game.find('a', class_="css-g3jcms")
            link = f"https://store.epicgames.com/{link_container.get('href')}"
            # printing all game details
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
# quitting selenium driver
driver.quit()