import Logo from '../assets/logo.png';

import {AiOutlineSearch} from 'react-icons/ai';

import { Link } from 'react-router-dom';

import {useSelector} from 'react-redux';
import { selectUser } from '../redux/authSlice';
import AuthLinks from './AuthLinks';

const Header = () => {
    const user = useSelector(selectUser);

    return (
        <header className="header">
            <img src={Logo} alt="twitter purple logo" className="logo" />
            <form className="header__search">
                <input type="text" placeholder="Search.." className="header__search__input" />
                <AiOutlineSearch className="icon icon--search" />
            </form>
            {!user ? <AuthLinks /> : <Link to="/" className="header__link">Home</Link> }
        </header>
    )
}

export default Header;