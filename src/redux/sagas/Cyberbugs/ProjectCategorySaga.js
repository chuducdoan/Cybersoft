import { takeLatest, call, put } from 'redux-saga/effects';
import cyberbugsService from '../../../services/CyberbugsService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PROJECT_CATEGORY_API } from '../../constants/Cyberbugs/CyberbugsConst';

function * getAllProjectCategorySaga(action) {
    try {
        const {data, status} = yield call(() => cyberbugsService.getAllProjectCategory());
       if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_ALL_PROJECT_CATEGORY',
                payload: data.content
            })
       }
    } catch(err) {
        console.log(err);
    }
}

export function * theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_API, getAllProjectCategorySaga);
}

