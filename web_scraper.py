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

discount_prices = []
normal_prices = []

if price_element.find(class_="discount_final_price"):
    discount_prices = price_element.find_all(class_="discount_final_price")
if price_element.find(class_="game_purchase_price price"):
    normal_prices = price_element.find_all(class_="game_purchase_price price")

all_prices = discount_prices + normal_prices
price_list = []

for price in all_prices:
    print(price.text.strip('NZ$ '))
    price_1 = float(price.text.strip('\r\n\t\t\t\t\t\t\tNZ$ \t\t\t\t\t\t'))
    price_list.append(price_1)

price_list.sort()

if soup.find(id="dlc_purchase_action"):
    dlc_element = soup.find(id="dlc_purchase_action")
    if dlc_element.find(class_="game_purchase_price price"):
        dlc_price = dlc_element.find(class_="game_purchase_price price")
        dlc_price_1 = float(dlc_price.text.strip('\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tNZ$ \t\t\t\t\t\t\t\t\t\t\t\t'))
        if price_list[0] == dlc_price_1:
            del price_list[0]

print(price_list[0])
print(name_element.text.strip())