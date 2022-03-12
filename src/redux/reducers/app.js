import { types } from "../constants/action-types";
import AppPages from "../../AppPages";

var initialState = {
    activePage: AppPages.INTRO,
    galaxyId: -1,
    planetId: -1,
    nextPage: -1,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_PAGE:
            return Object.assign({}, state, {
                activePage: action.payload.page,
            });
        case types.GO_DETAILS:
            return Object.assign({}, state, {
                activePage: AppPages.GALAXYDETAIL,
                galaxyId: action.payload.id
            });
        case types.GO_LOADING:
            return Object.assign({}, state, {
                activePage: AppPages.LOADING,
                nextPage: action.payload.page,
                galaxyId: action.payload.galaxyId
            });
        case types.GO_LOADING_PLANET:
            return Object.assign({}, state, {
                activePage: AppPages.LOADING,
                nextPage: action.payload.page,
                galaxyId: action.payload.galaxyId,
                planetId: action.payload.planetId
            });
        default: return state;
    }
}