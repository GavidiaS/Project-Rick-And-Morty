import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCharacter } from '../global/charactersSlice/asyncThunk';
import { resetCharacter } from '../global/charactersSlice';
import { useParams } from 'react-router-dom';

export default function GetCharacters() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacter(id));
    return () => {
      dispatch(resetCharacter());
    }
  }, [dispatch, id]);
  return null;
}