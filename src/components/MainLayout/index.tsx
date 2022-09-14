import React, {FC, ReactNode} from 'react';

const MainLayout: FC<{
    children?: ReactNode;
    title?: string;
}> = ({children, title}) => {
    return (
        <>
            <header className="container my-4">
                <h2>{title}</h2>
                {/*<nav>*/}
                {/*    <ul className="d-flex list">*/}
                {/*        <li>*/}
                {/*            <NavLink to="/">Games</NavLink>*/}
                {/*        </li>*/}
                {/*        <li  className="mx-3">*/}
                {/*            <NavLink to="/game/:id">Game</NavLink>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}
            </header>
            <main className="container my-4">
                {children}
            </main>
            <footer className="container"/>
        </>

    );
};

export default MainLayout;
