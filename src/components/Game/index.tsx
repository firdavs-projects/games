import React, {FC, useEffect, useState} from 'react';
import MainLayout from "../MainLayout";
import {useAppDispatch, useAppSelector} from "../../store";
import {useParams} from "react-router";
import {Card} from "react-bootstrap";
import {getImgUrl} from "../../constants";
import {Link} from "react-router-dom";
import {getGames} from "../../store/slices/games";
import {IGame} from "../../interfaces";

const Game: FC = () => {
    let {id} = useParams();
    const dispatch = useAppDispatch();
    const {games} = useAppSelector((state) => state.games)
    const [game, setGame] = useState<[string, IGame]>()

    useEffect(() => {
        dispatch(getGames())
    }, [])

    useEffect(() => {
        const game = games.find(([k]) => k.split('/')[1] === id)
        game && setGame(game)
    }, [games])

    return (
        <MainLayout title="Game">
            <Link to='/'>На главную</Link>
            {game
                ? <Card className="mt-4" style={{maxWidth: 600}}>
                    <Card.Img height="auto" src={getImgUrl(game[0])}/>
                    <Card.Body>
                        <h4>{game[1].title}</h4>
                        <p>Popularity: {game[1].collections.popularity}</p>
                        <p>Novelty: {game[1].collections.novelty}</p>
                    </Card.Body>
                </Card>
                : 'Игра не найдена'}
        </MainLayout>
    );
};

export default Game;
