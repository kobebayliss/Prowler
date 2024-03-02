import requests
from bs4 import BeautifulSoup

#input for url
URL = input("Enter URL: ")
page = requests.get(URL)

#parse the HTML content using BS
soup = BeautifulSoup(page.content, "html.parser")

#assigning elements of the page to variables
name_element = soup.find(id="appHubAppName")
price_element = soup.find(id="game_area_purchase")
removing_dlc = soup.find(id="gameAreaDLCSection").decompose()

all_prices = price_element.find_all(class_=["discount_final_price", "game_purchase_price price"])

price_list = []

for price in all_prices:
    price_1 = price.text.strip('\r\n\t\t\t\t\t\t\tNZ$ \t\t\t\t\t\t')
    print(price.text.strip('NZ$ '))
    if price_1 == "Free to Play":
        price_2 = 0
    else:
        price_2 = float(price_1)
    price_list.append(price_2)

print(min(price_list))
print(name_element.text.strip())