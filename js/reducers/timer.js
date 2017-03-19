import * as types from '../actions/actionTypes';

const initialState = {
    endTime: 600
};

export default function timer(state = initialState, action = {}) {
    switch (action.type) {
        case types.RESET_TIME:
            return {
                ...state,
                endTime: state.endTime + 600
            };
        case types.DOWN_TIMER:
            return {
                ...state,
                endTime: state.endTime - 1
            };
        default:
            return state;
    }
}