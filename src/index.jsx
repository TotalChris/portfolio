import ReactDOM from 'react-dom/client';
import {Analytics} from "@vercel/analytics/react";
import './index.css';
import App from './App';
import "./firebase.config";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js").then();
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App />
        <Analytics />
    </>
);
