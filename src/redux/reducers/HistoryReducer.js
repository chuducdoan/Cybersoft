const historyState = {
    navigate: {}
};

export const HistoryReducer = (state = historyState, action) => {
    switch(action.type) {
        case 'ADD_HISTORY': {
            state.navigate = action.history;
            return {...state};
        }
        default: 
            return {...state};
    }
}