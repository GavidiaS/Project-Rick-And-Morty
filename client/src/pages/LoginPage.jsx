import style from '../styles/login.module.css';
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginPage() {
  const [login, setLogin] = useState(true);
  function showLogin() {
    setLogin(!login);
  }
  return (
    <main className={style.log}>
      {
        login
        ? <Login fnShow={showLogin} />
        : <Register fnShow={showLogin} />
      }
    </main>
  );
}