import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import undetected_chromedriver as uc 
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options 
import psycopg2
import time

# connecting to the prowler_games database
games_db = psycopg2.connect(
    host="ep-fancy-frost-a715bifg-pooler.ap-southeast-2.aws.neon.tech",
    user="default",
    password="18ObWTweLUqB",
    database="verceldb"
)

mycursor = games_db.cursor()

# dictionary of already existing games in database
steam_names = {}

# sql to retrieve all names and prices
sql = "SELECT game_id, game_name FROM games"
# executing sql statement
mycursor.execute(sql)
results = mycursor.fetchall()
#iterate through each record's price and name and add them to dictionary
for row in results:
    steam_names[row[0]] = row[1]

print(steam_names)

# initialising the undetected selenium page to bypass cloudflare
options = uc.ChromeOptions() 
options.headless = False
driver = uc.Chrome(options=options) 

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
                if price_container.find('div', class_="css-4jky3p"):
                    normal_price = price_container.find('div', class_="css-4jky3p").text.strip()
                    on_sale = True
            else:
                price = "N/A"
            # getting link for game
            link_container = game.find('a', class_="css-g3jcms")
            link = f"https://store.epicgames.com{link_container.get('href')}"
            # printing all game details
            print(f"Index: {index}")
            print(f"Name: {name}")
            print(f"Price: {price}")
            print(f"Link: {link}")

            matches = [index for index, game_name in steam_names.items() if name in game_name]
            if matches:
                print(matches[0])
                print("-------------")
                print()
                print()
                print("Yes")
                print()
                print()
                print("-------------")
                # sql to update epic price
                sql = "UPDATE games SET epic_on_sale = %s, epic_price = %s, epic_normal_price = %s WHERE game_id = %s"
                val = (on_sale, price, normal_price, matches[0])
                mycursor.execute(sql, val)
                games_db.commit()
                print(mycursor.rowcount, "details updated")

            index+=1
        start_value += 100

epic_scraper = scrape_epic_page()
print(epic_scraper)
# quitting selenium driver
driver.quit()