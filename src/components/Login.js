import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStatusAuth, getErrorAuth, loginUser, initializeError } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import BluryCircle from "./BluryCircle";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null);

    function handleChange(e) {
        const {name, value} = e.target;

        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const filled = [credentials.email, credentials.password].every(Boolean);

    const authStatus = useSelector(getStatusAuth);
    const authError = useSelector(getErrorAuth);

    useEffect(() => {
        if(authError) {
            dispatch(initializeError());
        }
    }, []);

    useEffect(() => {
        if(authStatus === 'succeeded') {
            if(authError) {
                dispatch(initializeError());
            }
            navigate('/');
        } else if(authStatus === 'failed') {
            setError(authError);
        }
    }, [authStatus]);

    function handleSubmit(e) {
        e.preventDefault();

        if(filled) {
            dispatch(loginUser(credentials));
        } else {
            setError('Please fill in all the fields!');
        }
    }

    console.log(credentials);

    return (
        <div className="auth">
            <form onSubmit={(e) => handleSubmit(e)} className="auth__form">
                <h2 className="auth__title">Welcome Back!</h2>
                <label htmlFor="email">Email</label>
                <input type="email" id="text" className="auth__form__input" name="email" value={credentials.email} onChange={(e) => handleChange(e)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="auth__form__input" name="password" value={credentials.password} onChange={(e) => handleChange(e)} />
                <button className="btn btn--auth">Login</button>
                {error && <span className="auth__form__error">{error}</span> }
            </form>
            <BluryCircle styles={{top: 0, right: '-15rem'}} />
            <BluryCircle styles={{bottom: "-15rem", left: '-15rem'}} />
        </div>
    )
}

export default Login;