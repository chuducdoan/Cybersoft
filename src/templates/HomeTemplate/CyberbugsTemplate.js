import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberbugs from "../../components/Cyberbugs/Modal/ModalCyberbugs";
import SidebarSyberbugs from "../../components/Cyberbugs/SidebarSyberbugs";

function CyberbugsTemplate({children}) {
    return ( 
        <div>
            <div className="jira">
                <SidebarSyberbugs/>
                <MenuCyberbugs/>
                
                <div className="main">
                    {children}
                </div>
            </div>
            <ModalCyberbugs/>
        </div>
    );
}

export default CyberbugsTemplate;