import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Construction from "./pages/Construction";
import OneHundredMornings from "./pages/OneHundredMornings";


function App() {
  return (
    <div className='app bg-base-200 dark:bg-black dark:text-primary-content min-h-screen'>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<Construction />} />
                <Route path='/resume' element={<Construction />} />
                <Route path='/under-construction' element={<Construction />} />
                <Route path='/9549026547173040731159' element={<OneHundredMornings />} />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    </div>


);
}

export default App;
