import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import Home from './pages/Home';
import CheeseList from './components/CheeseList';
import CheeseAdd from './components/CheeseAdd';
import CheeseDelete from './components/CheeseDelete';
import CheeseUpdate from './components/CheeseEdit';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/cheeseList" element={<CheeseList/>} />
                <Route path="/cheeseAdd" element={<CheeseAdd/>} />
                <Route path="/cheeseUpdate" element={<CheeseUpdate/>} />
                <Route path="/cheeseDelete" element={<CheeseDelete/>} />
            </Routes>
        </Router>
    );
};

export default App;