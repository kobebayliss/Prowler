import requests
from bs4 import BeautifulSoup

#input for url
URL = input("Enter URL: ")
#send an http request to the URL
page = requests.get(URL)

#parse the HTML content using BS
soup = BeautifulSoup(page.content, "html.parser")

#assigning elements of the page to variables
name_element = soup.find(id="appHubAppName")
price_element = soup.find(id="game_area_purchase")
price_element_1 = price_element.find(class_="game_area_purchase_game_wrapper")
price_element_2 = price_element_1.find(class_="game_purchase_price price")

#print name of game and strip html
print(name_element.text.strip())

#checking if the game has a discount or not
if price_element_1.find(class_="discount_final_price"):
    discount_element = price_element_1.find(class_="discount_final_price")
    print(discount_element.text.strip())
else:
    print(price_element_2.text.strip())