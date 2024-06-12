import psycopg2

games_db = psycopg2.connect(
    host="ep-hidden-night-a7qy5ttw-pooler.ap-southeast-2.aws.neon.tech",
    user="default",
    password="7vnKeSWk3yog",
    database="verceldb"
)

mycursor = games_db.cursor()

sql = "SELECT * FROM games"
mycursor.execute(sql)
results = mycursor.fetchall()

for row in results:
    print(row)

mycursor.close()
games_db.close()