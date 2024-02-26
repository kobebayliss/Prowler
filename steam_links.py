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
                print(f"Rank: {game['Rank']}, Name: {game['Name']}, Link: {game['Link']}")
        else:
            print("Failed to fetch top games.")

    if __name__ == "__main__":
        main()
    page_number+=1