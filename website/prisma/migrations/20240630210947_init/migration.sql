-- CreateTable
CREATE TABLE "game_genre" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "game_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "game_id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "reviews" VARCHAR(40),
    "steam_on_sale" VARCHAR(40),
    "steam_price" VARCHAR(40),
    "steam_normal_price" VARCHAR(40),
    "epic_on_sale" VARCHAR(40),
    "epic_price" VARCHAR(40),
    "epic_normal_price" VARCHAR(40),
    "developer" VARCHAR(100),
    "publisher" VARCHAR(100),
    "short_desc" TEXT,
    "long_desc" TEXT,
    "banner" VARCHAR(300),
    "images" VARCHAR(500),
    "specs" VARCHAR(500),

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "genres" (
    "genre_id" SERIAL NOT NULL,
    "genre" VARCHAR(40),

    CONSTRAINT "genres_pkey" PRIMARY KEY ("genre_id")
);

-- AddForeignKey
ALTER TABLE "game_genre" ADD CONSTRAINT "game_genre_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_genre" ADD CONSTRAINT "game_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
