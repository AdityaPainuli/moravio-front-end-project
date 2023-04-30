import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addingData } from '../state/gifsState';
import { setTotalPage } from '../state/pageNumberState';
import {useNavigate} from 'react-router-dom'
import { setQueryState } from '../state/queryState';

const SearchBox = () => {
    const history = useNavigate();
    const queryValue = useAppSelector(state=>state.queryState.value);
    const [query,setQuery] = useState('');
    const pageNumber = useAppSelector(state => state.pageNumberState.value);
    // const [gifs, setGifs] = useState([]);
    const limit = 10;
   
    const dispatch = useAppDispatch();
    useEffect(()=> {
      const delaySearching = setTimeout(()=> {
        if(query === '') return;
        dispatch(setQueryState(query));
        fetch(`https://api.giphy.com/v1/gifs/search?q=${queryValue}&api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&offset=${pageNumber}`)
        .then(response => response.json())
        .then(data => {
          dispatch(addingData(data.data));
          dispatch(setTotalPage(data.pagination.total_count))
          history(`?q=${query}&limit=${limit}&offset=${pageNumber}`);
        })
        .catch(error => console.error(error));

      },300);

      return () => clearTimeout(delaySearching);
    },[setQuery,query,pageNumber,queryValue]);

    
  return (
    <div>
        <form onSubmit={(e)=> {
          e.preventDefault();
        }} method="get">
        <input type="text" name="q" id="q" placeholder = "Search Gifs" value = {query} onChange={(e)=>setQuery(e.target.value)} className='border border-gray-300 w-[80vh] m-auto mt-[1rem] rounded-md px-1 py-2 flex justify-center items-center outline-none' />
        </form>
       
    </div>
  )
}

export default SearchBox;