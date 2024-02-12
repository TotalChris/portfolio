import { createRoot, hydrateRoot } from 'react-dom/client';
import {Analytics} from "@vercel/analytics/react";
import './index.css';
import App from './App';
import "./firebase.config";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js").then();
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

if(rootElement.hasChildNodes()) {
    hydrateRoot(
        rootElement,
        <>
            <App />
            <Analytics />
        </>
    )
} else {
    root.render(
        <>
            <App />
            <Analytics />
        </>
    );
}
