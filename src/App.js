import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import Construction from "./pages/Construction";


function App() {
  return (
    <div className='app bg-base-200 dark:bg-black dark:text-primary-content'>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<Construction />} />
                <Route path='/resume' element={<Construction />} />
                <Route path='/under-construction' element={<Construction />} />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    </div>


);
}

export default App;
