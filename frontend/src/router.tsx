import {Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {IndexPage} from "@/pages/Index";
import Login from "@/pages/Login";
import Join from "@/pages/Join";
import NoteIndexPage from "@/pages/notes/NoteIndex";
import Error from "@/pages/Error";
import NoteDetail from "@/pages/notes/NoteDetail";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index Component={IndexPage} errorElement=<Error/>/>
            <Route path='/login' Component={Login} errorElement=<Error/>/>
            <Route path='/join' Component={Join} errorElement=<Error/>/>
            <Route path='/notes' Component={NoteIndexPage} errorElement=<Error/>>
                <Route path='/notes/:noteId' Component={NoteDetail} errorElement=<Error/>/>
            </Route>
            <Route path='/error' errorElement=<Error/>/>
        </>
    )
);