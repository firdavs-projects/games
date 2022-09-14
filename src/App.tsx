import React from "react";
import { Routes, Route } from "react-router-dom";

import Games from "./components/Games";
import Game from "./components/Game";

function App() {
    return (
    <Routes>
        <Route index element={<Games />} />
        <Route path="catalog/:id" element={<Game />} />

        <Route path="*" element={<Games />} />
    </Routes>
    );
}

export default App;
