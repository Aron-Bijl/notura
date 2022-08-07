import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Button } from "../components/Button";
import { Store } from '../Store'
import { toast } from "react-toastify";
import { getError } from '../utils.js';
import EmailIcon from "../components/icons/EmailIcon";
import KeyIcon from "../components/icons/KeyIcon";

export default function SigninScreen(){
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [formEmail, setEmail] = useState('');
    const [formPassword, setPassword] = useState('');

const { state, dispatch: ctxDisppatch } = useContext(Store);
const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post('/api/users/login', {
                email : formEmail,
                password: formPassword,
            });
            ctxDisppatch({type: 'USER_LOGIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
        }catch (err) {
           toast.error(<p>{getError(err)}</p>);
        }
    } 

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
      }, [navigate, redirect, userInfo]);

    return(
        <div className="container">
            <Helmet>
                <title>Sign-in</title>
            </Helmet>
            <form onSubmit={submitHandler}>
            <div className="form-box">
                <div className="form-group mt-5 pb-md-3">
                    <div className="form-control-box">
                        <label className="form-label" htmlFor="email">Your email</label>
                        <input type="email" name="email" className="form-control-icon" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                        <span className="form-icon"><EmailIcon width={24} height={24} /></span>
                    </div>
                    <div className="form-control-box">
                        <label className="form-label" htmlFor="password">Your password</label>
                        <input type="password"  name="password" className="form-control-icon" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                        <span className="form-icon"><KeyIcon width={24} height={24} /></span>
                    </div>
                </div>
                <Button buttonSize="btn-large" type="submit">Login</Button>
                 <div className="register">
                    <p>Don’t have an account?</p><Link to={`/register?redirect=${redirect}`}><p className="register-link">Register</p></Link>
                </div>
            </div>
            </form>
        </div>
       
    )
}