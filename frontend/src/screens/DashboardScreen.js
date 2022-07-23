import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import UserList from "../components/UserList";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                summary: action.payload,
                loading: false,
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "BACKUP_REQUEST":
            return { ...state, loadingBackUp: true};
        case "BACKUP_SUCCESS":
            return { ...state, loadingBackUp: false};
        case "BACKUP_FAIL":
            return { ...state, loadingBackUp: true};
        case "RESTORE_REQUEST":
            return { ...state, loadingRestore: true};
        case "RESTORE_SUCCESS":
            return { ...state, loadingRestore: false};
        case "RESTORE_FAIL":
            return { ...state, loadingRestore: true};
        default:
            return state;
    }
}

export default function DashboardScreen(){

    const [{ loading, loadingBackUp, loadingRestore, summary, error }, dispatch] = useReducer(reducer, {
        loading: true,
        loadingBackUp: false,
        loadingRestore: false,
        error: "",
    });
    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try{
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get('/api/admin/summary', {
                    headers: {Authorization: `Bearer ${userInfo.token}`},
                });
                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: data
                })
            }catch(err){
                dispatch({
                    type: "FETCH_FAIL",
                    payload: getError(err),
                })
            }
        }
        fetchData();
    },[userInfo]);

    function backUp(){
        const backUpData = async () => {
            try{
                dispatch({ type: "BACKUP_REQUEST" });
                await axios.get('/api/admin/backup',
                {
                    headers: {Authorization: `Bearer ${userInfo.token}`},
                });
                dispatch({type: "BACKUP_SUCCESS"});
                toast.success(<p>Backup was successfull</p>);
            }catch(err){
                dispatch({
                    type: "BACKUP_FAIL",
                    payload: getError(err),
                });
            }
        }
        backUpData();
    }

    function restoreBackUp(){
        const restore = async () => {
            try{
                dispatch({ type: "RESTORE_REQUEST" });
                await axios.get('/api/admin/restore',
                {
                    headers: {Authorization: `Bearer ${userInfo.token}`},
                });
                dispatch({type: "RESTORE_SUCCESS"});
                toast.success(<p>Restoring backup was successfull</p>);
            }catch(err){
                dispatch({
                    type: "RESTORE_FAIL",
                    payload: getError(err),
                });
            }
        }
        restore();
    }

    return (
        <div className="container">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <h3>Dashboard</h3>
            {loading ? (<div><h5>Loading all the goodies...</h5></div>) : error ? (<div><h5>{error}</h5></div>) : (<>
                <div className="row dashboard-list">
                    <div className="summary-box">
                        {summary.users && summary.users[0] ? <h3> {summary.users[0].numUsers} </h3> : <h3>0</h3>}
                        <h5>Users</h5>
                    </div>
                    <div className="summary-box">
                        {summary.recipes && summary.recipes[0] ? <h3> {summary.recipes[0].numRecipes} </h3> : <h3>0</h3> }
                        <h5>Recipes</h5>
                    </div>
                    <div className="summary-box dashboard-buttons">
                        {loadingBackUp ? (<>
                            <h5>Backup in process</h5>
                        </>) 
                        : (<>
                         <Button buttonStyle="btn--outline" buttonSize="btn-medium" onClick={() => backUp()}>Backup</Button>
                        </>) }
                        {loadingRestore ? (<>
                            <h5>Restoring in process</h5>
                        </>) 
                        : (<>
                         <Button buttonStyle="btn" buttonSize="btn-medium" onClick={() => restoreBackUp()}>Restore</Button>
                        </>) }
                    </div>
                </div>
            </>) }
            <div className="mt-5 ">
                <UserList />
            </div>
        </div>
    )
}