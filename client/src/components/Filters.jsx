/* eslint-disable react/prop-types */
import style from '../styles/filter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Filters({ fnFilStatus, fnFilGender, fnOrdName, fnPage, fnReset, fnClose }) {
  const [filter, setFilter] = useState({
    status: "",
    gender: "",
    name: ""
  });
  const dispatch = useDispatch();
  function inputChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  }
  function inputSubmit() {
    if (filter.status) dispatch(fnFilStatus(filter.status));
    if (filter.gender) dispatch(fnFilGender(filter.gender));
    if (filter.name) dispatch(fnOrdName(filter.name));
    dispatch(fnPage(1));
    fnClose();
  }
  return (
    <aside className={style.filter}>
      <div className={style.contain}>
        <button className={style.close} onClick={fnClose}><FontAwesomeIcon icon={faX} /></button>
        <div className={style.filt}>
          <label>
            <span>Filter by status:</span>
            <input list="status" name="status" onChange={inputChange} />
            <datalist id="status">
              <option value="Alive"></option>
              <option value="Dead"></option>
              <option value="unknown"></option>
            </datalist>
          </label>
          <label>
            <span>Filter by gender:</span>
            <input list="gender" name="gender" onChange={inputChange} />
            <datalist id="gender">
              <option value="Female"></option>
              <option value="Male"></option>
              <option value="Genderless"></option>
              <option value="unknown"></option>
            </datalist>
          </label>
          <label>
            <span>Order by name:</span>
            <input list="name" name="name" onChange={inputChange} />
            <datalist id="name">
              <option value="ASC">Ascending</option>
              <option value="DES">Descending</option>
            </datalist>
          </label>
          <button onClick={inputSubmit}>Apply</button>
          <button onClick={() => {dispatch(fnReset()); fnClose(); dispatch(fnPage(1));}}>Reset</button>
        </div>
      </div>
    </aside>
  );
}