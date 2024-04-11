import { Cards } from '../features/cards';
import { Diagram } from '../features/diagram';
import { Navigate, Route, Routes } from "react-router-dom";

function App() {

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Cards />} />
                <Route path={'/diagram'} element={<Diagram />} />
                <Route path={'404'} element={<h1>404: PAGE IS NOT FOUND </h1>} />
                <Route path={'*'} element={<Navigate to={'404'} />} />
            </Routes>
        </>
    );
}

export default App;
