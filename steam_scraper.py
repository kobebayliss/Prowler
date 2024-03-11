import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from fuzzywuzzy import fuzz
import time

games_names = []

#function to stop errors if a certain class doesn't exist
def error_handle(container_1, class_name, variable):
    if container_1.find('div', class_=class_name):
        variable = container_1.find('div', class_=class_name).text.strip()
    else:
        variable = f"Failed to find {variable}"
    return variable

steam_url = "https://store.steampowered.com/search/?sort_by=_ASC&filter=topsellers&os=win&supportedlang=english"

#initialise web driver
driver = webdriver.Chrome()
driver.get(steam_url)

def scrape_steam_page(url):
    #loading page
    response = requests.get(url)

    #checking that the page successfully loaded
    if response.status_code == 200:
        #time between each scroll
        scroll_pause_time = 0.4
        #find screen height
        screen_height = driver.execute_script("return window.screen.height;")
        i = 1
        #while loop to continue scrolling
        while True:
            #scroll down
            driver.execute_script(f"window.scrollTo(0, {screen_height * i});")
            i += 1
            time.sleep(scroll_pause_time)
            driver.execute_script("return document.body.scrollHeight;")
            #if condition for when website should finish scrolling
            if i > 20:
                break
        
        updated_html = driver.page_source

        #parsing website's HTML
        soup = BeautifulSoup(updated_html, 'html.parser')

        #creating a container for all the content
        container = soup.find(id="search_resultsRows")
        index = 1

        #for loop which loops through all the games since they are a links
        for game in container.find_all('a'):
            #finding name of game
            name = game.find('span', class_='title').get_text(strip=True)
            #container for price
            price_tag = game.find('div', class_='col search_price_discount_combined responsive_secondrow')
            #retrieving and error handling price
            price = error_handle(price_tag, "discount_final_price", "price")
            #getting link
            link = game.get('href')

            #getting website for each individual game and parsing it
            game_page = requests.get(link)
            soup2 = BeautifulSoup(game_page.content, 'html.parser')
            #error handling and retrieving description
            description = error_handle(soup2, "game_description_snippet", "description")
            if soup2.find(id="genresAndManufacturer"):
                genre_container = soup2.find(id="genresAndManufacturer")
                genre = genre_container.find('span').text.strip()
                developer = genre_container.find('div', class_="dev_row").find('a').text.strip()
            else:
                genre = "Failed to find genre"
                developer = "Failed to find developer"

            #print out all information about the game
            print(f"Game {index}:")
            print(f"Name: {name}")
            print(f"Price: {price}")
            print(f"Link: {link}")
            print(f"Description: {description}")
            print(f"Genre: {genre}")
            print(f"Developer: {developer}")
            print()
            index+=1
            games_names.append(name)
        driver.quit()

    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")

games_list = scrape_steam_page(steam_url)
print(games_names)