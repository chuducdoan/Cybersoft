function InfoMain() {
    return ( 
        <div className="info" style={{display: "flex"}}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search"></i>
            </div>
            <div className="avatar-group" style={{display: "flex"}}>
                <div className="avatar">
                <img src="./assets/img/download (1).jfif" alt="" />
                </div>
                <div className="avatar">
                <img src="./assets/img/download (2).jfif" alt="" />
                </div>
                <div className="avatar">
                <img src="./assets/img/download (3).jfif" alt="" />
                </div>
            </div>
            <div style={{marginLeft: "20px"}} className="text">Only My Issues</div>
            <div style={{marginLeft: "20px"}} className="text">Recently Updated</div>
        </div>
     );
}

export default InfoMain;