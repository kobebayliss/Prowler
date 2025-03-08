import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import psycopg2
import time
import truststore
truststore.inject_into_ssl()

# connecting to the prowler-db database
games_db = psycopg2.connect(
    host="ep-damp-bush-a7sbzyn1-pooler.ap-southeast-2.aws.neon.tech",
    user="default",
    password="ZN1HlubFpS2j",
    database="verceldb"
)
mycursor = games_db.cursor()

genre_id = {}

# get genre information to produce my dictionary
sql = "SELECT genre_id, genre FROM genres"
mycursor.execute(sql)
results = mycursor.fetchall()
for row in results:
    # assigning the genre to its id in my dictionary
    genre_id[row[1]] = row[0]

# making a dictionary for already existing games and their prices
games_prices = {}

# sql to retrieve all names and prices
sql = "SELECT name, steam_price FROM games"
# executing sql statement
mycursor.execute(sql)
results = mycursor.fetchall()
# iterate through each record's price and name and add them to dictionary
for row in results:
    games_prices[row[0]] = row[1]

steam_url = "https://store.steampowered.com/search/?sort_by=Name_ASC&os=win&supportedlang=english&filter=topsellers&ndl=1"

# initialise web driver
driver = webdriver.Chrome()
driver.get(steam_url)

def scrape_steam_page(url):
    # loading page
    response = requests.get(url)

    # checking that the page successfully loaded
    if response.status_code == 200:
        # time between each scroll
        scroll_pause_time = 0.3
        # find screen height
        screen_height = driver.execute_script("return window.screen.height;")
        i = 1
        # while loop to continue scrolling
        while i <= 140:
            # scroll down
            driver.execute_script(f"window.scrollTo(0, {screen_height * i});")
            i += 1
            time.sleep(scroll_pause_time)
            driver.execute_script("return document.body.scrollHeight;")
            # if condition for when website should finish scrolling
        
        updated_html = driver.page_source

        # parsing website's HTML
        soup = BeautifulSoup(updated_html, 'html.parser')

        # creating a container for all the content
        container = soup.find(id="search_resultsRows")
        index = 1

        # for loop which loops through all the games since they are links
        for game in container.find_all('a'):
            failed = False
            # finding name of game
            name = game.find('span', class_='title').get_text(strip=True)
            # container for price
            price_tag = game.find('div', class_='col search_price_discount_combined responsive_secondrow')
            if price_tag.find('div', class_="discount_original_price"):
                normal_price = price_tag.find('div', class_="discount_original_price").text.strip()
                normal_price = normal_price.replace("NZ$", "$").strip()
                normal_price = normal_price.replace("$ ", "")
                on_sale = "1"
            else:
                normal_price = "N/A"
                on_sale = "0"
            # retrieving and error handling price
            if price_tag.find('div', class_="discount_final_price"):
                price = price_tag.find('div', class_="discount_final_price").text.strip()
                if "$" in price:
                    price = price.replace("NZ$", "$").strip()
                    price = price.replace("$ ", "")
                elif price == "Free To Play" or price == "Free":
                    price = 0
                else:
                    price = "Failed"
                    failed = True
                print(price)
            else:
                failed = True
                price = "Failed to find price"
            # getting link
            link = game.get('href')

            if name not in games_prices:
                # getting website for each individual game and parsing it
                game_page = requests.get(link)
                soup2 = BeautifulSoup(game_page.content, 'html.parser')

                # error handling for if the game is actually a DLC
                if soup2.find('div', class_="game_area_bubble game_area_dlc_bubble"):
                    dlc_container = soup2.find('div', class_="game_area_bubble game_area_dlc_bubble")
                    dlc_text = dlc_container.find('h1').text.strip()
                    if dlc_text == "Downloadable Content":
                        failed = True

                # error handling and scraping game's image
                if soup2.find(id="gameHeaderImageCtn"):
                    banner_container = soup2.find(id="gameHeaderImageCtn")
                    banner_image_tag = banner_container.find('img')
                    banner_image = banner_image_tag.get('src')
                else:
                    failed = True

                # error handling and scraping reviews
                if soup2.find('div', class_='user_reviews'):
                    reviews_container = soup2.find('div', class_='user_reviews')
                    review_container = reviews_container.find('div', class_='summary column')
                    if review_container.find('span', class_='game_review_summary positive'):
                        reviews_text = review_container.find('span', class_='game_review_summary positive').get_text(strip=True)
                    elif review_container.find('span', class_='game_review_summary mixed'):
                        reviews_text = review_container.find('span', class_='game_review_summary mixed').get_text(strip=True)
                    elif review_container.find('span', class_='game_review_summary '):
                        reviews_text = review_container.find('span', class_='game_review_summary ').get_text(strip=True)
                    else:
                        reviews = "No user reviews"
                    if review_container.find('span', class_='responsive_hidden'):
                        reviews_number = review_container.find('span', class_='responsive_hidden').get_text(strip=True)
                        reviews = reviews_text + " " + reviews_number
                else:
                    failed = True

                # error handling and retrieving short description
                if soup2.find('div', class_='game_description_snippet'):
                    short_description = soup2.find('div', class_='game_description_snippet').text.strip()
                else:
                    failed = True

                # error handling and retrieving long description
                if soup2.find(id="aboutThisGame"):
                    description_container = soup2.find(id="aboutThisGame")
                    long_description = description_container.find(class_="game_area_description").text.strip()
                else:
                    failed = True

                # error handling for finding genre and developer
                if soup2.find(id="genresAndManufacturer"):
                    genre_container = soup2.find(id="genresAndManufacturer")
                    if genre_container.find('span'):
                        genres = genre_container.find('span').text.strip()
                        genres_list = genres.split(', ')
                        count = 1
                        publishers = []
                        for detail in genre_container.find_all('div'):
                            if count == 1:
                                developer = detail.find('a').text.strip()
                            elif count == 2:
                                for publisher in detail.find_all('a'):
                                    publishers.append(publisher.text.strip())
                            count += 1
                else:
                    failed = True
                
                # error handling and scraping the game's needed specifications
                if soup2.find('div', class_='game_area_sys_req_leftCol'):
                    specs_container = soup2.find('div', class_='game_area_sys_req_leftCol')
                    skip = 0
                    specs = []
                    for li in specs_container.find_all('li'):
                        if skip != 0:
                            specs.append(li.text.strip())
                        skip +=1
                else:
                    failed = True

                # error handling and scraping the game's images
                if soup2.find(id="highlight_player_area"):
                    images = []
                    images_container = soup2.find(id="highlight_player_area")
                    for div in images_container.find_all('div'):
                        if div.find('a'):
                            image_tag = div.find('a')
                            image = image_tag.get('href')
                            images.append(image)
                else:
                    failed = True

            # checking if game already in database
            if name in games_prices:
                # checking if price has changed
                if str(round(float(price), 2)).strip() != str(round(float(games_prices[name]), 2)).strip():
                    print(f"{price} vs {games_prices[name]}")
                    # sql to update price
                    sql = "UPDATE games SET (steam_price, steam_on_sale, steam_normal_price) = (%s, %s, %s) WHERE name = (%s)"
                    val = (price, on_sale, normal_price, name)
                    mycursor.execute(sql, val)
                    games_db.commit()
                    print(mycursor.rowcount, "details updated")
            else:
                if not failed:
                    # here, the game isn't in the database so we insert a new record for it
                    # SQL statement to insert the game's information into the prowler_games database
                    sql = """INSERT INTO games (name, reviews, steam_on_sale, steam_price, steam_normal_price, epic_on_sale, epic_price, 
                    epic_normal_price, developer, publisher, short_desc, long_desc, banner, images, specs, steam_link, epic_link) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                    # values to insert
                    val = (name, reviews, on_sale, price, normal_price, -1, -1, -1, developer, publishers, short_description, 
                           long_description, banner_image, images, specs, link, -1)
                    # adding values and saving them
                    mycursor.execute(sql, val)
                    games_db.commit()
                    print(mycursor.rowcount, "details inserted")
                    if genres != "Failed to find genre":
                        sql = "SELECT game_id FROM games WHERE name = (%s)"
                        val = (name,)
                        mycursor.execute(sql, val)
                        game_id = mycursor.fetchone()
                        genres_id_list = []

                        # iterate through the genres
                        for a in range(len(genres_list)):
                            # add the id for the genre by searching for the genre in the dictionary
                            genres_id_list.append(genre_id[genres_list[a]])

                        # iterate through the values of genre id list            
                        for a in range(len(genres_id_list)):
                            # insert into the linkin table the values for the index of the game and the genre id
                            sql = "INSERT INTO game_genre (game_id, genre_id) VALUES (%s, %s)"
                            val = (game_id[0], genres_id_list[a])
                            mycursor.execute(sql, val)
                            games_db.commit()
    
            # print out all information about the game
            print(f"Game {index}:")
            print(f"Name: {name}")
            print()
            # increasing index for game by 1 each time
            index += 1
        # quitting the selenium driver
        driver.quit()
    else:
        # error handling
        print(f"Failed to retrieve the page. Status code: {response.status_code}")

games_list = scrape_steam_page(steam_url)
# closing connection to DB
games_db.close()
