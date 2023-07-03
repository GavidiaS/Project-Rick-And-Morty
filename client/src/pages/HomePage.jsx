import style from '../styles/HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { useState } from "react";
import { filterStatus, filterGender, orderName, resetPage, resetCharacters, nextPage, prevPage, numPage } from "../global/charactersSlice";
import CardCharacter from "../components/CardCharacter";
import GetCharacters from "../components/GetCharacters";
import Filters from "../components/Filters";
import Paginate from "../components/Paginate";
import Loading from '../components/Loading';

export default function HomePage() {
  const [filter, setFilter] = useState(false);
  const { characters, page, loading } = useSelector(state => state.characters);
  let start = (page - 1) * 8;
  let end = page * 8;
  let totalPage = Math.ceil(characters.length / 8);
  let viewCharacters = characters?.slice(start, end);
  function closeFilters() {
    setFilter(!filter);
  }
  return (
    <>
      <GetCharacters />
      <main className={style.home}>
        {
          loading
          ? <Loading />
          : null
        }
        <button className={style.filter} onClick={closeFilters}><FontAwesomeIcon icon={faFilter} /></button>
        <Paginate totalPage={totalPage} fnNext={nextPage} fnPrev={prevPage} fnPage={numPage} page={page} />
        {
          filter
          ? <Filters fnFilStatus={filterStatus} fnFilGender={filterGender} fnOrdName={orderName} fnPage={resetPage} fnClose={closeFilters} fnReset={resetCharacters} />
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