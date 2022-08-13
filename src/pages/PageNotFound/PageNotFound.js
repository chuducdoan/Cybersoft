import { useLocation } from "react-router-dom";

function PageNotFound() {
    const {pathname} = useLocation();
    return ( 
        <div>
            Page Not Found {pathname}
        </div>
     );
}

export default PageNotFound;