import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import Home from './pages/Home';
import CheeseList from './components/CheeseList';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/cheeseList" element={<CheeseList/>} />
            </Routes>
        </Router>
    );
};

export default App;