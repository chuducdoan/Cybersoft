import { useDispatch } from 'react-redux';
import Login from './../Login/Login';
import Register from './../Register/Register';

function DemoHOCModal() {

    const dispatch = useDispatch();

    return ( 
        <div>
            <button onClick={() => {dispatch({
                type: 'OPEN_FORM',
                Component: <Login/>
            })}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Sign in
            </button>
            <button onClick={() => {dispatch({
                type: 'OPEN_FORM',
                Component: <Register/>
            })}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Sign up
            </button>
        </div>
     );
}

export default DemoHOCModal;