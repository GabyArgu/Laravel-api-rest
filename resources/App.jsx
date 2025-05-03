import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Cupon from './pages/Cupon';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Cupon/:codigoCupon" element={<Cupon />} />
            </Routes>
        </Router>
    );
}
