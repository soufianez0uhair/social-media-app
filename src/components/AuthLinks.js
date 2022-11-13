import { Link } from "react-router-dom";

const AuthLinks = () => {
    return (
        <div className="header__links">
            <Link className="header__link header__link--login" to="/login">Login</Link>
            <Link className="header__link header__link--register" to="/register">Register</Link>
        </div>
    )
}

export default AuthLinks;