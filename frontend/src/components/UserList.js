import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { getError } from "../utils";
import { Button } from "./Button";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "DELETE_REQUEST":
                return { ...state, loadingDelete: true, successDelete: false };
        case "DELETE_SUCCESS":
                return { ...state, loadingDelete: false, successDelete: true };
        case "DELETE_FAIL":
                return { ...state, loadingDelete: false, successDelete: false };
        case "DELETE_RESET":
                    return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
}


export default function UserList(){

    const navigate = useNavigate();

    const [{ loading, users, error, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
        loading: true,
        error: "",
    });

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await axios.get('/api/users')
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
        if(successDelete){
            dispatch({ type: "DELETE_RESET" });
        }else{
            fetchData();
        }
    }, [userInfo, successDelete])

    const deleteHandler = async (user) => {
        if(window.confirm("Hey hey, are you sure that you want to DELETE this user?")){
            try{
                dispatch({ type: "DELETE_REQUEST" });
                 await axios.delete(`/api/users/${user._id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                toast.success(<p>"User deleted successfully"</p>);
                dispatch({ type: "DELETE_SUCCESS" })
            }catch (err){
                toast.error(<p>{getError(err)}</p>);
                dispatch({
                    type: "DELETE_FAIL",
                });
            }
        }
    }

    return(<>
        <h3>Users</h3>
        {loadingDelete && <div><h5>Loading to delete...</h5></div>}
        {loading ? (<div><h5>Loading all the goodies...</h5></div>) : error ? (<div><h5>{error}</h5></div>) : (<>
            <table className="table">
                <thead>
                        <tr>
                            <th>Name</th>
                            <th className="email-list">Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                </thead>
                <tbody>
            {users.data.map((user, index) => {
                return <React.Fragment key={user._id}>
                        <tr>
                            <td>{user.name}</td>
                            <td className="email-list">{user.email}</td>
                            {user.isAdmin ? <td className="">Yes</td> : <td className="">No</td>}
                            <td className="action">
                                <Button type="button"  buttonStyle="btn--outline" buttonSize="btn-medium"  onClick={() =>  navigate(`/admin/user/${user._id}`)}>Edit</Button>&nbsp;
                                <Button type="button"  buttonStyle="btn" buttonSize="btn-medium"  onClick={() => deleteHandler(user)}>Delete</Button>
                            </td>
                        </tr>
                </React.Fragment>
            })}
            </tbody>
            </table>
        </>) }
    </>)
}