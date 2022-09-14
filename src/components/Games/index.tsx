import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import MainLayout from "../MainLayout";
import {getGames} from "../../store/slices/games";
import {useAppDispatch, useAppSelector} from "../../store";
import {Button, Card, Form} from 'react-bootstrap';
import {usePagination} from "../../hooks/usePagination";
import {getImgUrl, LIMIT} from "../../constants";
import {IReal} from "../../interfaces";

const Games: FC = () => {
    const dispatch = useAppDispatch();
    const {games} = useAppSelector((state) => state.games)
    const [filtered, setFiltered] = useState(games)
    const [
        page,
        pages,
        paginated,
        nextPage,
    ] = usePagination(filtered, LIMIT)

    const [providers, setProviders] = useState<string[]>([])
    const [provider, setProvider] = useState<string>('Providers')
    const [reals, setReals] = useState<{ name: string, id: number }[]>([])
    const [real, setReal] = useState<string>('Reals')

    useEffect(() => {
        dispatch(getGames())
    }, [dispatch])

    useEffect(() => {
        setFiltered(games)
        const p = new Set<string>();
        const r: { [key: string]: { id: number } } = {};

        if (providers.length === 0) {
            games.forEach(([, g]) => p.add(g.provider))
            setProviders(Array.from(p.values()))
        }
        if (reals.length === 0) {
            games.forEach(([, g]) => Object.entries(g.real).forEach(([k, v]) => {
                r[k] = v
            }))
            setReals(Object.entries(r).map(([k, v]) => ({name: k, id: v.id})))
        }
    }, [games])

    const setRealHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const r: string = ev.target.value
        setReal(r)
        let f = games
        f = r !== 'Reals' ? f.filter(([, g]) => !!g.real[r as keyof IReal]) : f
        f = provider !== 'Providers' ? f.filter(([, i]) => i.provider === provider) : f
        setFiltered(f)
    }

    const setProviderHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const p = ev.target.value
        setProvider(p)
        let f = games
        f = p !== 'Providers' ? f.filter(([, i]) => i.provider === p) : f
        f = real !== 'Reals' ? f.filter(([, g]) => !!g.real[real as keyof IReal]) : f
        setFiltered(f)
    }

    return (
        <MainLayout title="Games">
            <section className="d-flex justify-content-between flex-lg-shrink-1">
                <Form.Select aria-label="Default select example" className="mx-2" onChange={setRealHandler}>
                    <option>Reals</option>
                    {reals.map((r, i) => (
                        <option key={i} value={r.name}>{r.name}</option>
                    ))}
                </Form.Select>
                <Form.Select aria-label="Default select example" className="mx-2" onChange={setProviderHandler}>
                    <option>Providers</option>
                    {providers.map((p, i) => (<option key={i} value={p}>{p}</option>))}
                </Form.Select>
            </section>

            <section className="my-4 d-flex justify-content-between flex-wrap">
                {paginated.map(([key, game]) => (
                    <Card key={key + Date.now()} className="w-23 m-2">
                        <Card.Img height={130} src={getImgUrl(key)}/>
                        <Card.Body>
                            <Link to={`catalog/${key.split('/')[1]}`}><h4>{game.title}</h4></Link>
                            <p>Popularity: {game.collections.popularity}</p>
                            <p>Novelty: {game.collections.novelty}</p>
                        </Card.Body>
                    </Card>
                ))}
                {paginated.length === 0 ? "Ничего не найдено" : ""}
            </section>

            <section className="d-flex justify-content-center">
                {page !== pages && paginated.length !== 0
                    ? (<Button onClick={() => nextPage()}>Show more</Button>) : ''}
            </section>

        </MainLayout>
    );
};

export default Games;
