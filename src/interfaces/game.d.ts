export interface IGame {
    provider: string;
    demo: string;
    title: string;
    real: IReal;
    collections: ICollection;
}

export interface IReal {
    BTC?: {id: number},
    ETH?: {id: number},
    EUR?: {id: number},
    LTC?: {id: number},
    RUB?: {id: number},
    USD?: {id: number},
}

export interface ICollection {
    novelty: number;
    popularity: number;
}

