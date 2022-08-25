import HeaderMain from './../../components/Cyberbugs/Main/HeaderMain';
import InfoMain from './../../components/Cyberbugs/Main/InfoMain';
import ContentMain from './../../components/Cyberbugs/Main/ContentMain';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/constants/Cyberbugs/CyberbugsConst';
import { useEffect } from 'react';

function HomeCyberBug() {

    const {projectId} = useParams();
    console.log(projectId)
    const dispatch = useDispatch();
    const projectDetail = useSelector(state => state.ProjectReducer.projectDetail);
    console.log(projectDetail)

    useEffect(() => {
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: projectId
        })
    }, [])

    return ( 
        <div>
            <HeaderMain/>
            <InfoMain projectDetail={projectDetail}/>
            <ContentMain projectDetail={projectDetail}/>
        </div>
     );
}

export default HomeCyberBug;