/* eslint-disable react/prop-types */
import style from '../styles/search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { getSearchCharacters } from '../global/charactersSlice/asyncThunk';
import { resetPage } from '../global/charactersSlice';

export default function Searchbar({ searchShow }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function nameChange(e) {
    setName(e.target.value);
  }
  function nameSearch() {
    dispatch(getSearchCharacters(name));
    dispatch(resetPage());
    searchShow();
  }
  return (
    <aside className={style.search}>
      <div className={style.contain}>
        <button className={style.close} onClick={searchShow}><FontAwesomeIcon icon={faX} /></button>
        <section className={style.bar}>
          <input autoFocus type="search" name="search" onChange={nameChange} placeholder='example: Rick' />
          <button onClick={nameSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </section>
      </div>
    </aside>
  );
}