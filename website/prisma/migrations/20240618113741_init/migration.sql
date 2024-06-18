-- CreateTable
CREATE TABLE "Game" (
    "game_id" SERIAL NOT NULL,
    "game_name" TEXT NOT NULL,
    "steam_on_sale" BOOLEAN NOT NULL,
    "steam_price" TEXT NOT NULL,
    "steam_normal_price" TEXT NOT NULL,
    "epic_on_sale" BOOLEAN NOT NULL,
    "epic_price" TEXT NOT NULL,
    "epic_normal_price" TEXT NOT NULL,
    "game_developer" TEXT NOT NULL,
    "game_description" TEXT NOT NULL,
    "game_image" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("game_id")
);
