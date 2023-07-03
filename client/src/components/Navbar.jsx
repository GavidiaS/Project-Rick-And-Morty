import style from '../styles/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faHeart, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { resetUser } from '../global/userSlice';
import Searchbar from './Searchbar';

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = useState(false);
  const { id } = useSelector(state => state.user);
  function searchShow() {
    setSearch(!search);
  }
  return (
    <nav className={style.nav}>
      <NavLink to="/"><FontAwesomeIcon icon={faHouse} /></NavLink>
      {
        location.pathname === "/"
        ? <NavLink onClick={searchShow} ><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink>
        : null
      }
      <NavLink to={id !== "" ? "/favorites" : "/login"}><FontAwesomeIcon icon={faHeart} /></NavLink>
      <NavLink to={id === "" ? "/login" : "/"}><FontAwesomeIcon icon={faUser} /></NavLink>
      {
        id !== ""
        ? <NavLink to="/" onClick={() => dispatch(resetUser())}><FontAwesomeIcon icon={faRightFromBracket} /></NavLink>
        : null
      }
      {
        search
        ? <Searchbar searchShow={searchShow} />
        : null
      }
    </nav>
  );
}