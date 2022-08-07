import axios from "axios";
import React,  { useContext, useState, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import EmailIcon from "../components/icons/EmailIcon";
import KeyIcon from "../components/icons/KeyIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_REQUEST':
            return { ...state, loading: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loading: false };
        case 'UPDATE_FAIL':
            return { ...state, loading: false };
        case 'UPLOAD_AVATAR_REQUEST':
            return { ...state, loadingAvatar: true };
        case 'UPLOAD_AVATAR_SUCCESS':
            return { ...state, loadingAvatar: false };
        case 'UPLOAD_AVATAR_FAIL':
            return { ...state, loadingAvatar: false };
        default:
            return state;
    }
}

export default function ProfileScreen(){
    
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;


    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [imgAuthor, setAvatar] = useState(userInfo.imgAuthor);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{loading, loadingAvatar}, dispatch] = useReducer(reducer, {
        loading: false, 
        loadingAvatar: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword && !loading){
            return toast.warning(<p>Password does not match w/ your confirm password</p>);
        }else{
            try{
                const { data } = await axios.put(
                    '/api/users/profile',
                    {
                        name,
                        email,
                        password,
                        imgAuthor,
                    },
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}`  }
                    }
                );
                dispatch({
                    type: 'UPDATE_SUCCESS',
                });
                ctxDispatch({ type: 'USER_LOGIN', payload: data });
                localStorage.setItem('userInfo', JSON.stringify(data));
                toast.success(<p>Your profile has been updated successfully</p>);
            }catch(err){
                dispatch({
                    type: 'UPDATE_FAIL',
                });
                toast.error(<p>{getError(err)}</p>);
            }
        }
    }

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    }

    const uploadAvatar = async(e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        try{
            dispatch({ type: 'UPLOAD_AVATAR_REQUEST' });
           const  { data }  = await axios.post('/api/avatar', bodyFormData, 
           {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }); 
            console.log(data);
            setAvatar(data);
            dispatch({
                type: 'UPLOAD_AVATAR_SUCCESS',
            });
        }catch(err){
            toast.error(<p>{getError(err)}</p>);
            dispatch({
                type: 'UPLOAD_AVATAR_FAIL'
            });
        } 
    } 

    return(
        <div className="container">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <section className="my-4">
                <h3>Profile</h3>
                <form onSubmit={submitHandler}>
                <div className="form-box">
                    <div className="image-container">
                        <img className="imgAuthor" src={imgAuthor} alt={name} />
                        <div className='image-upload'>  
                            <label className="uploadLabel">
                                <input type="file" className="uploadButton"  onChange={(e) => { uploadAvatar(e) }}/>
                                    Change image
                            </label>
                            { loadingAvatar && <div><h5>Wait till we upload your image...</h5></div> }   
                        </div>
                    </div>
                    <div className="form-group mt-5 pb-md-3">
                        <div className="form-control-box">
                            <label className="form-label" htmlFor="name">Full name</label>
                            <input type="text" name="name" className="form-control-icon" placeholder={name} value={name} required onChange={(e) => setName(e.target.value)} />
                            <span className="form-icon"><ProfileIcon width={24} height={24} /></span>
                        </div>
                        <div className="form-control-box">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control-icon" placeholder={email} value={email} required onChange={(e) => setEmail(e.target.value)} />
                            <span className="form-icon"><EmailIcon width={24} height={24} /></span>
                        </div>
                        <div className="form-control-box">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control-icon" placeholder="Your password" required onChange={(e) => setPassword(e.target.value)} />
                            <span className="form-icon"><KeyIcon width={24} height={24} /></span>
                        </div>
                        <div className="form-control-box">
                            <label className="form-label" htmlFor="password">Confirm password</label>
                            <input type="password" name="password" className="form-control-icon" placeholder="Confirm password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                            <span className="form-icon"><KeyIcon width={24} height={24} /></span>
                        </div>
                    </div>
                    <div className="action-row">
                        <Button buttonSize="btn-medium" type="submit">Update</Button>
                        <Button buttonSize="btn-medium" buttonStyle="btn--outline" onClick={() => signoutHandler()}>Sign-out</Button>
                    </div>
                </div>
                </form>
                
            </section>
        </div>
    )
}