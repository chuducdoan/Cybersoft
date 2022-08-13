import { Navigate } from "react-router-dom";

function Profile() {

    if(localStorage.getItem('userLogin')) {

    return ( 
        <div>
            Profile
        </div>
     );
    } else {
        alert('Ban chua dang nhap');
        return <Navigate to="/login"/>
    }
}

export default Profile;