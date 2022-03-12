import { takeEvery } from "redux-saga/effects";
import { types } from "../constants/action-types";
import { workerAuth } from "./Auth";

export default function* watcherSaga() {
    //yield takeEvery(types.AUTH_SEND, workerAuth);
}