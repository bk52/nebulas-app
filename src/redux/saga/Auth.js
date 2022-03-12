import { types } from "../constants/action-types";
import { call, put } from "redux-saga/effects";

export function* workerAuth(action) {
  // try {
  //   const payload = yield call(Login, action.payload);
  //   yield put({ type: types.AUTH_RESPONSE, payload });
  // } catch (e) {
  //   yield put({ type:types.AUTH_ERROR, payload: e });
  // }
}

