import PartyImg from '../assets/pexels-wendy-wei-1540406.jpg';
import BluryCircle from './BluryCircle';

const Register = () => {
    return (
        <div className="auth">
            <form className="auth__form">
                <h2 className="auth__title">Create your account</h2>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" className="auth__form__input" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="auth__form__input" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="auth__form__input" />
            </form>
            <BluryCircle styles={{top: 0, right: '-15rem'}} />
            <BluryCircle styles={{bottom: "-15rem", left: '-15rem'}} />
        </div>
    )
}

export default Register;