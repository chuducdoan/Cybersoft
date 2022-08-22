import { useSelector } from 'react-redux';

function Home(props) {
    
    const userLogin = useSelector(state => state.UserCyberBugReducer.userLogin);
    console.log(userLogin)

    return ( 
        <div>
            {userLogin.email}
        </div>
     );
}

export default Home;