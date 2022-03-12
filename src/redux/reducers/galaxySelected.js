import { types } from "../constants/action-types";

var initialState = {
    selected: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_GALAXY: {
            return Object.assign({}, state, {
                selected: action.payload.id
            });
        }
        default:
            return state;
    }
}