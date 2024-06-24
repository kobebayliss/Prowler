"use client"

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface Game {
    game_id: number;
    game_name: string;
    steam_on_sale: string;
    steam_price: string;
    steam_normal_price: string;
    epic_on_sale: string;
    epic_price: string;
    epic_normal_price: string;
    game_developer: string;
    game_description: string;
    game_image: string;
}

export default function GamePageContent() {
    const router = useRouter();
    const [game, setGame] = useState<Game | null>(null);
    const idQuery = useSearchParams();
    const id = idQuery.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api");
                const games = response.data;
                const selectedGame = games.find((g: Game) => g.game_id === parseInt(id as string, 10));
                if (selectedGame) {
                    setGame(selectedGame);
                } else {
                    console.error("game not found");
                }
            } catch (error) {
                console.error("error fetching games:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!game) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="text-offwhite ml-6">
            <h1>{game.game_name}</h1>
            <img src={game.game_image} alt="Game Image" />
            <p>{game.game_description}</p>
            <p>Steam Price: {game.steam_price}</p>
            <p>Steam Normal Price: {game.steam_normal_price}</p>
            <p>Steam On Sale: {game.steam_on_sale}</p>
            <p>Epic Price: {game.epic_price}</p>
            <p>Epic Normal Price: {game.epic_normal_price}</p>
            <p>Epic On Sale: {game.epic_on_sale}</p>
            <p>Game Developer: {game.game_developer}</p>
        </div>
    );
}
