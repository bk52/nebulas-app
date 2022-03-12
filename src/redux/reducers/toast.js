import { types } from "../constants/action-types";

var initialState = {
    active: false,
    toastType: 'default',
    text: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SHOW_TOAST:
            return Object.assign({}, state, {
                active: true,
                toastType: action.payload.toastType,
                text: action.payload.text
            });
        case types.HIDE_TOAST:
            return Object.assign({}, state, {
                active: false,
                toastType: '',
                text: ''
            });
        default: return state;
    }
}