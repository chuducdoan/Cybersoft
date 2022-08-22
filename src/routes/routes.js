import ModalCyberbugs from "../HOC/CyberbugsHOC/ModalCyberbugs";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import CreateProject from "../pages/CyberBugs/CreateProject/CreateProject";
import LoginCyberBugs from "../pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import ProjectManagement from "../pages/CyberBugs/ProjectManagement/ProjectManagement";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import HomeCyberBug from './../pages/CyberBugs/HomeCyberBug';

export const publicRoutes = [
    {path: '/home', component: Home},
    {path: '/contact', component: Contact},
    {path: '/about', component: About},
    {path: '/createproject', component: CreateProject},
    {path: '/projectmanagement', component: ProjectManagement},
    {path: '/cyberbug', component: HomeCyberBug},
    {path: '/login', component: Login, template: 'abc'},
    {path: '/logincyberbugs', component: LoginCyberBugs, template: 'abc'},
    {path: '/test', component: ModalCyberbugs},
]