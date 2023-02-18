import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Construction from "./pages/Construction";
import OneHundredMornings from "./pages/OneHundredMornings";
import Login from "./pages/Login";
import Signout from "./pages/Signout";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

function App() {

  return (
    <div className='app bg-base-200 dark:bg-black dark:text-primary-content min-h-screen'>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/resume' element={<Resume />} />
                <Route path='/under-construction' element={<Construction />} />
                <Route path='/9549026547173040731159' element={<OneHundredMornings />} />
                <Route path='/log-in' element={<Login />} />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='/log-out' element={<Signout />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    </div>


);
}

export default App;
