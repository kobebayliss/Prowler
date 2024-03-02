import requests
from bs4 import BeautifulSoup

#defining variables
max_pages = int(input("Please enter number of pages:"))
page_number = 1

for i in range(max_pages):
    def get_top_100_games():
        url = f"https://steamcharts.com/top/p.{page_number}"

        # Send an HTTP request to the URL
        response = requests.get(url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Find the table containing the top games
            table = soup.find('table', {'class': 'common-table'})

            # Extract game information from the table
            games = []
            rows = table.find_all('tr')[1:26]  # Exclude the header row
            for row in rows:
                columns = row.find_all('td')
                rank = columns[0].text.strip()
                name = columns[1].text.strip()
                link = columns[1].find('a')['href'].strip()
                current_players = columns[2].text.strip()
                peak_players = columns[3].text.strip()

                game_info = {
                    'Rank': rank,
                    'Name': name,
                    'Link': link,
                    'Current Players': current_players,
                    'Peak Players': peak_players
                }
                games.append(game_info)

            return games

        else:
            print(f"Failed to retrieve data. Status Code: {response.status_code}")
            return None

    def main():
        top_100_games = get_top_100_games()

        if top_100_games:
            for game in top_100_games:
                #print(f"Rank: {game['Rank']}, Name: {game['Name']}, Link: {game['Link']}")
                url_2 = f"https://store.steampowered.com{game['Link']}"
                page = requests.get(url_2)

                #parse the HTML content using BS
                soup = BeautifulSoup(page.content, "html.parser")

                #assigning elements of the page to variables
                name_element = soup.find(id="appHubAppName")
                print(name_element.text.strip())
                price_element = soup.find(id="game_area_purchase")
                if soup.find(id="gameAreaDLCSection"):
                    removing_dlc = soup.find(id="gameAreaDLCSection").decompose()

                all_prices = price_element.find_all(class_=["discount_final_price", "game_purchase_price price"])

                price_list = []

                for price in all_prices:
                    price_1 = price.text.replace('NZ$', '').replace(' ', '').replace('\r', '').replace('\n', '').replace('\t', '').lower()
                    if price_1 == "freetoplay" or price_1 == "free":
                        price_2 = 0
                    else:
                        price_2 = float(price_1)
                    price_list.append(price_2)

                print(f"${min(price_list)}")

        else:
            print("Failed to fetch top games.")

    if __name__ == "__main__":
        main()
    page_number+=1