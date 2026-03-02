import "./App.css";
import { createBrowserRouter, useOutlet } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Construction from "./pages/Construction";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import Redirect from "./components/Redirect";

function NavFrame() {
  const outlet = useOutlet();
  return (
    <div className="app bg-white-200 dark:bg-black text-black dark:text-white min-h-screen">
      <Navbar />

      <div className="route">{outlet}</div>
    </div>
  );
}

const routes = [
  {
    name: "Under Construction",
    path: "!",
    Component: Construction,
  },
  { name: "Home", path: "/", Component: Home },
  { name: "Resume", path: "/resume", Component: Resume },
  { name: "Not Found", path: "*", Component: NotFound },
  { name: "Contact", path: "/contact", Component: Contact },
  {
    name: "Thanks",
    path: "/contact/thank-you",
    Component: ThankYou,
  },
  {
    name: "Title Notes App",
    path: "/title",
    Component: () => <Redirect to="https://titlenotes.netlify.app/"></Redirect>,
  },
  {
    name: "Title Notes App Home",
    path: "/title/index.html",
    Component: () => <Redirect to="https://titlenotes.netlify.app/"></Redirect>,
  },
];

const router = createBrowserRouter([
  {
    Component: NavFrame,
    children: routes.map((route) => ({
      path: route.path,
      Component: route.Component,
      children: route.children ?? [],
    })),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
