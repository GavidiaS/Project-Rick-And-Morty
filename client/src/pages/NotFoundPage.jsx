import style from '../styles/notfound.module.css';
import found from '../assets/404.png';

export default function NotFoundPage() {
  return (
    <main className={style.found}>
      <figure>
        <img src={found} alt="Error 404" />
      </figure>
    </main>
  );
}