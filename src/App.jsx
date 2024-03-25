import './App.css';
import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
    useOutlet,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Construction from "./pages/Construction";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import PostForm from "./pages/PostForm";
import PrivateRoute from "./components/PrivateRoute";
import Post from "./pages/Post";
import Redirect from "./components/Redirect";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import TitleNotes from "./pages/TitleNotes";
import {createRef} from "react";
import { AuthProvider } from './context/AuthProvider';

function NavFrame() {
    const location = useLocation();
    const outlet = useOutlet();
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}
    return (
        <div className='app bg-white-200 dark:bg-black text-black dark:text-white min-h-screen'>
            <AuthProvider>
                <Navbar />
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        timeout={500}
                        classNames="route"
                        unmountOnExit
                        >
                        {(state) => (
                            <div ref={nodeRef} className="route">
                                {outlet}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </AuthProvider>
        </div>
        )
}

const routes = [
    {name: 'Under Construction', ref: createRef(), path: '!', Component: Construction},
    {name: 'Home', ref: createRef(), path: '/', Component: Home},
    {name: 'Resume', ref: createRef(), path: '/resume', Component: Resume},
    {name: 'Not Found', ref: createRef(), path: '*', Component: NotFound},
    {name: 'Contact', ref: createRef(), path: '/contact', Component: Contact},
    {name: 'Thanks', ref: createRef(), path: '/contact/thank-you', Component: ThankYou},
    {name: 'Log In', ref: createRef(), path: '/log-in', Component: LogIn},
    {name: 'Log Out', ref: createRef(), path: '/log-out', Component: PrivateRoute, children: [{path: '/log-out', Component: LogOut}]},
    {name: 'Profile', ref: createRef(), path: '/profile/:userId', Component: PrivateRoute, children: [{path: '/profile/:userId', Component: Profile}]},
    {name: 'New Post', ref: createRef(), path: '/new-post', Component: PrivateRoute, children: [{ path: '/new-post', Component: PostForm }]},
    {name: 'Posts', ref: createRef(), path: '/posts', Component: Posts },
    {name: 'Post', ref: createRef(), path: '/posts/:postId', Component: Post},
    {name: 'Title Notes', ref: createRef(), path: '/title-notes', Component: TitleNotes},
    {name: 'Title Notes App', ref: createRef(), path: '/title', Component: () => <Redirect to='https://titlenotes.netlify.app/'></Redirect>},
    {name: 'Title Notes App Home', ref: createRef(), path: '/title/index.html', Component: () => <Redirect to='https://titlenotes.netlify.app/'></Redirect>},

]

const router = createBrowserRouter([
    {Component: NavFrame, children: routes.map((route) => ({
        path: route.path,
        Component: route.Component,
        children: route.children ?? [],
    }))}
]);

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}
