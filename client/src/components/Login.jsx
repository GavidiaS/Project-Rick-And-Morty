/* eslint-disable react/prop-types */
import style from '../styles/login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../global/userSlice/asyncThunk';

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;

export default function Login({ fnShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  function active(e) {
    e.preventDefault();
    setVisible(!visible);
  }
  function validate(inputs) {
    const error = {};
    if (!inputs.email) error.email = "The email is required";
    if (!inputs.password) error.password = "The password is required";
    if (!regexEmail.test(inputs.email) && inputs.email.length <= 35) error.email = "The email must be valid";
    if (!regexPassword.test(inputs.password)) error.password = "The password must be valid";
    return error;
  }
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    setErrors(
      validate({
        ...user,
        [e.target.name]: e.target.value
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    const aux = Object.keys(errors);
    if (aux.length !== 0) return alert("Invalid data");
    dispatch(login(user));
    setUser({
      email: "",
      password: ""
    });
    setErrors({
      email: "",
      password: ""
    });
    navigate("/");
  }
  return (
    <aside className={style.login}>
      <div className={style.contain}>
        <form onSubmit={handleSubmit}>
          <label>
            <input autoComplete type="email" name="email" onChange={handleChange} placeholder="example@example.com" />
            <span>{errors.email}</span>
          </label>
          <label>
            <input type={visible ? "text" : "password"} name="password" onChange={handleChange} placeholder="********" />
            <span>{errors.password}</span>
            <button onClick={active}>{visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</button>
          </label>
          <button disabled={Object.keys(errors).length === 0 ? false : true}>Enter</button>
        </form>
        <section>
          <h3>New user? <button onClick={fnShow}>Create an acount</button></h3>
        </section>
      </div>
    </aside>
  );
}