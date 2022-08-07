import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect, useReducer } from "react";
import { Button } from "../components/Button";
import { Store } from '../Store'
import { toast } from "react-toastify";
import { getError } from '../utils.js';
import EmailIcon from "../components/icons/EmailIcon";
import ProfileIcon from "../components/icons/ProfileIcon";

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, recipe: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        case 'UPDATE_REQUEST': 
            return {...state, loadingUpdate: true};
        case 'UPDATE_SUCCESS' : 
            return {...state, loadingUpdate: false};
        case 'UPDATE_FAIL' : 
            return {...state, loadingUpdate: false};
        default: 
            return state;
    }
}


export default function UserEditScreen(){
    const [{loading, error, loadingUpdate}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });


    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: userId } = params;

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            dispatch({ type: "UPDATE_REQUEST" });
            await axios.put(`/api/users/${userId}`, {
                _id: userId, name, email, isAdmin
            },
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({
                type: "UPDATE_SUCCESS",
            })
            toast.success(<p>User has been updated</p>);
            navigate(`/admin/dashboard`);
        }catch (err) {
           toast.error(getError(err));
           dispatch({ type: "UPDATE_FAIL" });
        }
    } 

    useEffect(() => {
        const fetchData = async () => {
            try{
                dispatch({ type: "FETCH_REQUEST"});
                const { data } = await axios.get(`/api/users/${userId}`);
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin);
                dispatch({ type: "FETCH_SUCCESS" });
            } catch(err){
                dispatch({
                    type: "FETCH_FAIL",
                    payload: getError(err)
                });
            }
        }
        fetchData();
      }, [userId, userInfo]);

      function handleCheck(evt){
        setIsAdmin(!isAdmin);
    }

    return(
        <div className="container">
            <Helmet>
                <title>Edit user</title>
            </Helmet>
            <h3>Edit info of {name} </h3>
            {loading ? (<div><h5>Loading user...</h5></div>) : error ? (<div><h5>{error}</h5></div>) : (<>
            <form onSubmit={submitHandler}>
            <div className="form-box">
                <div className="form-group mt-5 pb-md-3">
                    <div className="form-control-box">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input type="text" name="name" className="form-control-icon" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
                        <span className="form-icon"><ProfileIcon width={24} height={24} /></span>
                    </div>
                    <div className="form-control-box">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email"  name="email" className="form-control-icon" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        <span className="form-icon"><EmailIcon width={24} height={24} /></span>
                    </div>
                    <div className="checkbox-container" >
                        <label className="checkbox-label" name="isAdmin"> Admin
                            <input type="checkbox" onChange={e => {handleCheck(e)}} value="isAdmin" checked={isAdmin}/> 
                            <span className={`checkbox ${isAdmin ? "checkbox-active" : ""}`} aria-hidden="true"></span>
                        </label>
                    </div>
                </div>
                {loadingUpdate ?  
                    <Button buttonSize="btn-large" type="submit"> Updating user </Button> 
                :  <Button buttonSize="btn-large" type="submit"> Update </Button>}
               
            </div>
            </form>
            </>) }
        </div>
    )
}