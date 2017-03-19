import * as types from './actionTypes';
export function downTimer() {
    return {
        type: types.DOWN_TIMER,
    };
}
export function resetTimerAction() {
    return {
        type: types.RESET_TIME
    };
}