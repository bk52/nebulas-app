import React from "react";
import { useSelector } from "react-redux";
import AppPages from "../AppPages";
import Bg from "../components/Bg";
import Page from "../components/Page";
import Splash from "./Splash";
import SignIn from "./Login/SignIn";
import SignUp from "./Login/SignUp";
import MainPage from "./Main";
import Loading from "./Common/Loading";
import GalaxyDetail from './Galaxies';
import PlanetView from "./Planet";
import ErrorPage from '../components/ErrorPage'

export default function AppRouter() {
    try {
        const AppState = useSelector(state => state.app);
        let page;

        if (AppState.activePage === AppPages.INTRO) page = <Splash />;
        else if (AppState.activePage === AppPages.SIGNIN) page = <SignIn />;
        else if (AppState.activePage === AppPages.SIGNUP) page = <SignUp />;
        else if (AppState.activePage === AppPages.LOADING) page = <Loading />;
        else if (AppState.activePage === AppPages.MAIN) page = <MainPage />;
        else if (AppState.activePage === AppPages.GALAXYDETAIL) page = <GalaxyDetail />;
        else if (AppState.activePage === AppPages.PLANETDETAIL) page = <PlanetView />;

        return <>
            <Bg type={'star'} />
            <Page>{page}</Page>
        </>
    }
    catch (e) {
        console.error(e);
        return <ErrorPage />
    }
}
