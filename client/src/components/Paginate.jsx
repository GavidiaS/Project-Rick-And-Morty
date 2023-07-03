/* eslint-disable react/prop-types */
import style from '../styles/paginate.module.css';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function Paginate({ totalPage, fnNext, fnPrev, fnPage, page }) {
  const dispatch = useDispatch();
  function next() {
    dispatch(fnNext());
  }
  function prev() {
    dispatch(fnPrev());
  }
  function selectPage(num) {
    dispatch(fnPage(num));
  }
  return (
    <article className={style.paginate}>
      <button disabled={page > 1 ? false : true} onClick={prev}><FontAwesomeIcon icon={faCaretLeft} /></button>
      <button disabled={page === 1 ? true : false} onClick={() => selectPage(1)}>1</button>
      <h3>{page}</h3>
      <button disabled={page === totalPage ? true : false} onClick={() => selectPage(totalPage)}>{totalPage}</button>
      <button disabled={page < totalPage ? false : true} onClick={next}><FontAwesomeIcon icon={faCaretRight} /></button>
    </article>
  );
}