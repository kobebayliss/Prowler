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

price_element_1 = price_element.find_all(class_="discount_final_price")
for price in price_element_1:
    print(price.text.strip('$'))
    #make each individual value an integer and add to a different list
    #then find lowest value of list and assign to variable


print(name_element.text.strip())