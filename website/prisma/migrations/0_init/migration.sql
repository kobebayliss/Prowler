CREATE TABLE "game_genre" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "game_genre_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "games" (
    "game_id" SERIAL NOT NULL,
    "game_name" VARCHAR(100),
    "steam_on_sale" VARCHAR(40),
    "steam_price" VARCHAR(40),
    "steam_normal_price" VARCHAR(40),
    "epic_on_sale" VARCHAR(40),
    "epic_price" VARCHAR(40),
    "epic_normal_price" VARCHAR(40),
    "game_developer" VARCHAR(100),
    "game_description" TEXT,
    "game_image" VARCHAR(300),

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);

CREATE TABLE "genres" (
    "genre_id" SERIAL NOT NULL,
    "genre" VARCHAR(40) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("genre_id")
);