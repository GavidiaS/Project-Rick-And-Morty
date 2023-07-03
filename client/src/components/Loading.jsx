import style from '../styles/loading.module.css';
import loading from '../assets/loading.png';

export default function Loading() {
  return (
    <aside className={style.carga}>
      <div className={style.contain}>
        <figure>
          <img src={loading} alt="Loading Image" />
        </figure>
        <h2>Loading</h2>
      </div>
    </aside>
  );
}