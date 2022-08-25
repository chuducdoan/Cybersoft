import { useParams } from 'react-router-dom';

function ProjectDetail() {

    const {productId} = useParams();
    console.log(productId)

    return ( 
        <div>
            Project detail
        </div>
     );
}

export default ProjectDetail;