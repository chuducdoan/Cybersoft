import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Modal from './HOC/Modal/Modal';
import About from './pages/About/About';
import BaiTapToDoListSaGa from './pages/BTToDoListSaGa/BTToDoListSaGa';
import Contact from './pages/Contact/Contact';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoList from './pages/ToDoList/ToDoList';
import {useNavigate} from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { publicRoutes } from './routes/routes';
import CyberbugsTemplate from './templates/HomeTemplate/CyberbugsTemplate';
import ModalCyberbugs from './components/Cyberbugs/Modal/ModalCyberbugs';
import DrawerCyberbugs from './HOC/CyberbugsHOC/ModalCyberbugs';

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch({
    type: 'ADD_HISTORY',
    history: navigate
   })
  }, []);

  return (
    <>
      <Modal/>
      <LoadingComponent/>
      <DrawerCyberbugs/>
      <Routes>
        {/* <Route path='/home' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/> */}
        {publicRoutes.map((value, index) => {
          let Template = CyberbugsTemplate;
          if(value.template) {
            Template = value.template;
          } else if (value.template === null) {
            Template = Fragment;
          }
          const Page = value.component;
          return <Route key={index} path={value.path} element={
          <Template>
            <Page/>
          </Template>} />
        })}


        <Route path='/profile' element={<Profile/>}/>
        <Route path='/toDoList' element={<ToDoList/>}/>
        <Route path='/todolistsaga' element={<BaiTapToDoListSaGa/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/demohocmodal' element={<DemoHOCModal/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        {/* <Route path='/logincyberbugs' element={<LoginCyberBugs/>}/> */}
      </Routes>
    </>
  );
}

export default App;
