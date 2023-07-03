/* eslint-disable react/prop-types */
import style from '../styles/login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { register } from "../global/userSlice/asyncThunk";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
const regexName = /^[A-Z][a-zA-Z]*\s[A-Z][a-zA-Z]*$/;

export default function Register({ fnShow }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });
  function active(e) {
    e.preventDefault();
    setVisible(!visible);
  }
  function validate(inputs) {
    const error = {};
    if (!inputs.name) error.name = "The name is required";
    if (!inputs.email) error.email = "The email is required";
    if (!inputs.password) error.password = "The password is required";
    if (!regexName.test(inputs.name) && inputs.name.length <= 25) error.name = "The name must be valid";
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
    dispatch(register(user));
    setUser({
      name: "",
      email: "",
      password: ""
    });
    setErrors({
      name: "",
      email: "",
      password: ""
    });
    fnShow();
  }
  return (
    <aside className={style.register}>
      <div className={style.contain}>
        <form onSubmit={handleSubmit}>
          <label>
            <input autoComplete type="text" name='name' onChange={handleChange} placeholder="example: Alvin Yakitory" />
            <span>{errors.name}</span>
          </label>
          <label>
            <input autoComplete type="email" name='email' onChange={handleChange} placeholder="example@example.com" />
            <span>{errors.email}</span>
          </label>
          <label>
            <input type={visible ? "text" : "password"} name='password' onChange={handleChange} placeholder="********" />
            <span>{errors.password}</span>
            <button onClick={active}>{visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</button>
          </label>
          <button disabled={Object.keys(errors).length === 0 ? false : true}>Sign up</button>
        </form>
        <section>
          <h3>Do you already have an account? <button onClick={fnShow}>Sign in</button></h3>
        </section>
      </div>
    </aside>
  );
}