/* eslint-disable react/prop-types */
import style from '../styles/card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { postFav, deleteFav } from '../global/userSlice/asyncThunk';
import { deleteCharacter } from '../global/charactersSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function CardCharacter({ character }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, id } = useSelector(state => state.user);
  const [fav, setFav] = useState(false);
  const characterFav = {
    ...character,
    userId: id
  };
  function handleFavorite() {
    if (!id) return navigate("/login");
    if (fav) {
      setFav(false);
      dispatch(deleteFav({ id: character.id, userId: id }));
    } else {
      setFav(true);
      dispatch(postFav(characterFav));
    }
  }
  useEffect(() => {
    favorites.forEach(fv => {
      if (fv.id === character.id) setFav(true);
    });
  }, [favorites, character.id]);
  return (
    <article className={style.card}>
      <section className={style.btn}>
        <button onClick={handleFavorite}>{fav ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={regHeart} />}</button>
        {
          location.pathname === "/"
          ? <button onClick={() => dispatch(deleteCharacter(character.id))}><FontAwesomeIcon icon={faX} /></button>
          : null
        }
      </section>
      <figure className={style.fig}>
        <img src={character.image} alt={character.name} />
      </figure>
      <div className={style.data}>
        <h2><NavLink to={`/detail/${character.id}`}>{character.name}</NavLink></h2>
        <h4>{character.status} - {character.species}</h4>
      </div>
    </article>
  );
}