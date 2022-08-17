import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoList from './pages/ToDoList/ToDoList';
import BaiTapToDoListSaGa from './pages/BTToDoListSaGa/BTToDoListSaGa';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Modal/>
      <LoadingComponent/>
      <Routes>
        <Route exact path='/home' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/toDoList' element={<ToDoList/>}/>
        <Route path='/todolistsaga' element={<BaiTapToDoListSaGa/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/demohocmodal' element={<DemoHOCModal/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
