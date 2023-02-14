import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className='app bg-base-200 dark:bg-black dark:text-primary-content'>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/resume' element={<Resume />} />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    </div>


);
}

export default App;
