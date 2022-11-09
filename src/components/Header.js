import Logo from '../assets/logo.png';

import {AiOutlineSearch} from 'react-icons/ai';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <img src={Logo} alt="twitter purple logo" className="logo" />
            <form className="header__search">
                <input type="text" placeholder="Search.." className="header__search__input" />
                <AiOutlineSearch className="icon icon--search" />
            </form>
            <div className="header__links">
                <Link className="header__link header__link--login" to="/login">Login</Link>
                <Link className="header__link header__link--register" to="/register">Register</Link>
            </div>
        </header>
    )
}

export default Header;