import style from '../styles/FavoritePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPageFav, prevPageFav, numPageFav, filterFavStatus, filterFavGender, orderFavName, resetFavorites } from '../global/userSlice';
import { getCharacters } from '../global/charactersSlice/asyncThunk';
import { useNavigate } from "react-router-dom";
import CardCharacter from "../components/CardCharacter";
import Filters from "../components/Filters";
import Paginate from "../components/Paginate";
import Loading from '../components/Loading';

export default function FavoritePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const { favorites, page, id, loading } = useSelector(state => state.user);
  let start = (page - 1) * 8;
  let end = page * 8;
  let totalPage = Math.ceil(favorites.length / 8);
  let viewCharacters = favorites?.slice(start, end);
  function closeFilters() {
    setFilter(!filter);
  }
  useEffect(() => {
    function access() {
      if (id === "") {
        navigate("/");
        dispatch(getCharacters());
        alert("Requires access with your account");
      }
    }
    access();
  }, [dispatch, navigate, id]);
  return (
    <>
      <main className={style.favorite}>
        {
          loading
          ? <Loading />
          : null
        }
        <button className={style.filter} onClick={closeFilters}><FontAwesomeIcon icon={faFilter} /></button>
        <Paginate totalPage={totalPage} fnNext={nextPageFav} fnPrev={prevPageFav} fnPage={numPageFav} page={page} />
        {
          filter
          ? <Filters fnFilStatus={filterFavStatus} fnFilGender={filterFavGender} fnOrdName={orderFavName} fnPage={numPageFav} fnClose={closeFilters} fnReset={resetFavorites} />
          : null
        }
        {
          viewCharacters && viewCharacters.map(ch => {
            return (
              <CardCharacter key={ch.id} character={ch} />
            );
          })
        }
      </main>
    </>
  );
}