import style from '../styles/DetailPage.module.css';
import { useSelector } from 'react-redux';
import GetCharacter from '../components/GetCharacter';

export default function DetailPage() {
  const { character } = useSelector(state => state.characters);
  return (
    <>
      <GetCharacter />
      <aside className={style.detail}>
        <div className={style.contain}>
          <figure>
            <img src={character.image} alt={character.name} />
          </figure>
          <div className={style.data}>
            <h1>{character.name}</h1>
            <h3>Status - Species: <span>{character.status} - {character.species}</span></h3>
            <h3>Gender: <span>{character.gender}</span></h3>
            <h3>Origin: <span>{character.origin}</span></h3>
            <h3>Location: <span>{character.location}</span></h3>
          </div>
        </div>
      </aside>
    </>
  );
}