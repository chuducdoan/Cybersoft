function InfoMain({projectDetail}) {



    return ( 
        <div>
            <h3>{projectDetail.projectName}</h3>
            <div className="info" style={{display: "flex"}}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search"></i>
                </div>
                <div className="avatar-group" style={{display: "flex"}}>
                    {projectDetail.members?.map((user, index) => (
                        <div key={index} className="avatar">
                            <img src={user.avatar} alt="" />
                        </div>
                    ))}
                </div>
                <div style={{marginLeft: "20px"}} className="text">Only My Issues</div>
                <div style={{marginLeft: "20px"}} className="text">Recently Updated</div>
            </div>
        </div>
     );
}

export default InfoMain;