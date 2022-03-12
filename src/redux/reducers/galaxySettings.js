import { types } from "../constants/action-types";

var initialState = {
    zoom: 1,
    showProgress: true,
    showLabels: true,
    showConnections: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_ZOOM: {
            return Object.assign({}, state, {
                zoom: action.payload.zoom
            });
        }
        case 'VIEW_TOGGLE_PROGRESS': {
            return Object.assign({}, state, {
                showProgress: !state.showProgress
            });
        }
        case 'VIEW_TOGGLE_LABELS': {
            return Object.assign({}, state, {
                showLabels: !state.showLabels
            });
        }
        case 'VIEW_TOGGLE_CONNECTIONS': {
            return Object.assign({}, state, {
                showConnections: !state.showConnections
            });
        }
        default:
            return state;
    }
}