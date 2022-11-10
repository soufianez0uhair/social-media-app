import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getStatusAuth, getErrorAuth, registerUser, initializeError} from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import BluryCircle from './BluryCircle';
import Loader from './Loader';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        fullName: '',
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

    const filled = [credentials.fullName, credentials.email, credentials.password].every(Boolean);

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
            dispatch(registerUser(credentials));
        } else {
            setError('Please fill in all the fields!');
        }
    }

    return authStatus === 'loading' ? <Loader /> : (
        <div className="auth">
            <form onSubmit={(e) => handleSubmit(e)} className="auth__form">
                <h2 className="auth__title">Create your account</h2>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" className="auth__form__input" name="fullName" value={credentials.fullName} onChange={(e) => handleChange(e)} />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" className="auth__form__input" name="email" value={credentials.email} onChange={(e) => handleChange(e)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="auth__form__input" name="password" value={credentials.password} onChange={(e) => handleChange(e)} />
                <button className="btn btn--auth">Register</button>
                {error && <span className="auth__form__error">{error}</span> }
            </form>
            <BluryCircle styles={{top: 0, right: '-15rem'}} />
            <BluryCircle styles={{bottom: "-15rem", left: '-15rem'}} />
        </div>
    )
}

export default Register;