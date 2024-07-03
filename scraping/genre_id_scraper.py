import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from fuzzywuzzy import fuzz
import psycopg2
import time

games_db = psycopg2.connect(
    host="ep-damp-bush-a7sbzyn1-pooler.ap-southeast-2.aws.neon.tech",
    user="default",
    password="ZN1HlubFpS2j",
    database="verceldb"
)

mycursor = games_db.cursor()

url1 = "https://store.steampowered.com/tag/browse/#global_492"
r = requests.get(url1)
soup2 = BeautifulSoup(r.content, 'html.parser')
genres_container = soup2.find(id="tag_browse_global")
index = 1
for genre1 in genres_container.find_all('div', class_="tag_browse_tag"):
    genre = genre1.text.strip()
    index += 1
    sql = "INSERT INTO genres (genre) VALUES (%s)"
    val = (genre,)
    mycursor.execute(sql, val)
    games_db.commit()
print(mycursor.rowcount, "details inserted")
games_db.close()