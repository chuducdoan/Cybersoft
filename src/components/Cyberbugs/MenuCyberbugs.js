import { NavLink } from "react-router-dom";

function MenuCyberbugs() {
    return ( 
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src="./assets/img/download.jfif" alt="" />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <NavLink to={'/cyberbug'}>
                    <i className="fa fa-credit-card"></i>
                    <span>Cyber Board</span>
                </NavLink>
                <NavLink to={'/projectmanagement'}>
                    <i className="fa fa-cog"></i>
                    <span>Project Management</span>
                </NavLink>
                <NavLink to={'/createproject'}>
                    <i className="fa fa-cog"></i>
                    <span>Create Project</span>
                </NavLink>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck"></i>
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals"></i>
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste"></i>
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow"></i>
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box"></i>
                    <span>Components</span>
                </div>
            </div>
        </div>
     );
}

export default MenuCyberbugs;