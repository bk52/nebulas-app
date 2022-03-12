import { types } from "../constants/action-types";
import AppPages from "../../AppPages";

var initialState = {
    mainPage: -1,
    detailPage: -1
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_DETAIL_PAGE':
            return Object.assign({}, state, {
                activePage: action.payload.main,
                detailPage: action.payload.detail,
            });
        default: return state;
    }
}