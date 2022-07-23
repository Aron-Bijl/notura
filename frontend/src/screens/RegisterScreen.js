import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Button } from "../components/Button";
import { Store } from '../Store'
import { toast } from "react-toastify";
import { getError } from '../utils.js';
import EmailIcon from "../components/icons/EmailIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import KeyIcon from "../components/icons/KeyIcon";

export default function RegisterScreen(){
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [formName, setName] = useState('');
    const [formEmail, setEmail] = useState('');
    const [formPassword, setPassword] = useState('');
    const [formConfirmPassword, setConfirmPassword] = useState('');

const { state, dispatch: ctxDisppatch } = useContext(Store);
const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if(formConfirmPassword !== formPassword){
            toast.error('Passwords do not match'); 
            return;
        }
            try{
                const { data } = await axios.post('/api/users/register', {
                    name : formName, 
                    email : formEmail,
                    password: formPassword,
                });
                ctxDisppatch({type: 'USER_LOGIN', payoad: data});
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate(redirect || '/');
            }catch (err) {
            toast.error(getError(err));
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
                <title>Register</title>
            </Helmet>
            <form onSubmit={submitHandler}>
            <div className="form-box">
                <div className="form-group mt-5 pb-md-3">
                <div className="form-control-box">
                        <label className="form-label" htmlFor="name">Your name</label>
                        <input type="text" class="form-control-icon" placeholder="Your name" required onChange={(e) => setName(e.target.value)} />
                        <span className="form-icon"><ProfileIcon width={24} height={24} /></span>
                    </div>
                    <div className="form-control-box">
                        <label className="form-label" htmlFor="email">Your email</label>
                        <input type="email" class="form-control-icon" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                        <span className="form-icon"><EmailIcon width={24} height={24} /></span>
                    </div>
                    <div className="form-control-box">
                        <label className="form-label" htmlFor="password">Your password</label>
                        <input type="password" class="form-control-icon" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                        <span className="form-icon"><KeyIcon width={24} height={24} /></span>
                    </div>
                    <div className="form-control-box">
                        <label className="form-label" htmlFor="password">Your password</label>
                        <input type="password" class="form-control-icon" placeholder="Confirm password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                        <span className="form-icon"><KeyIcon width={24} height={24} /></span>
                    </div>
                </div>
                <Button buttonSize="btn-large" type="submit">Create account</Button>
                 <div className="register">
                    <p>Already have an account?</p><Link to={`/login?redirect=${redirect}`}><p className="register-link">Login</p></Link>
                </div>
            </div>
            </form>
        </div>
       
    )
}