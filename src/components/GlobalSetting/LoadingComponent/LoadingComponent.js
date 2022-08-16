import styleLoading from './LoadingComponent.module.css';
import {useSelector} from 'react-redux';

function LoadingComponent() {

    const {isLoading} = useSelector(state => state.LoadingReducer);

    if (isLoading) {
        return ( 
            <div className={styleLoading.bgLoading}>
                <img src={require('../../../assets/imageLoading/loading.gif')} />
            </div>
         );
    } else {
        return '';
    }
}

export default LoadingComponent;