import React, { useEffect } from 'react';
import SearchBox from './components/searchBox'
import Header from './components/Header';
import ShowcaseSection from './components/ShowcaseSection';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from './app/hooks';
import {  setPageNumber, setTotalPage } from './state/pageNumberState';
import { Route , Routes  } from 'react-router';
import { setQueryState } from './state/queryState';
import { useDispatch } from 'react-redux';
import { addingData } from './state/gifsState';
import {useNavigate} from 'react-router-dom'



function App() {
  
  const dispatch = useDispatch();
  const history = useNavigate();
  const pageNumber = useAppSelector(state => state.pageNumberState.value);
  
  const query = useAppSelector(state=> state.queryState.value);
  const limit = 10;

  
 
  useEffect(()=> {
    const queryParameters = new URLSearchParams(window.location.search)
    const query = queryParameters.get("q")
    const offset = queryParameters.get("offset")
    
  dispatch(setQueryState(query));
  dispatch(setPageNumber(offset));

    
  },[])
 
  useEffect(()=> {
    if(query === '') return;
    dispatch(setQueryState(query));
    fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&offset=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
      dispatch(addingData(data.data));
      dispatch(setTotalPage(data.pagination.total_count))
      history(`?q=${query}&limit=${limit}&offset=${pageNumber}`);
    })
    .catch(error => console.error(error));

  },[query,pageNumber])
  
 
  const totalPage = useAppSelector(state=>state.pageNumberState.totalPage);
  const pageCount = Math.ceil(totalPage/10)
  const PageChange = ({selected}:any) => {
   
    const queryParameters = new URLSearchParams(window.location.search);
    queryParameters.append('off','2');
    dispatch(setPageNumber((selected + 1) * 10));
    
  }
  return (
   <Routes>
    <Route path ='/' element = {
    <div>
      {/* Header component */}
      <Header/>

      {/* Searching component */}
      <SearchBox/>

      {/* Displaying GIFs  - should have pagination feature.*/}
      <ShowcaseSection/>

      {/* Pagination-component */}
      <ReactPaginate previousLabel = {"Previous"} nextLabel = {"Next"} pageCount={pageCount} onPageChange = {PageChange} containerClassName='paginationBttns' activeClassName='paginationActiveButton' />
      
    </div>}/>
    </Routes>
  );
}

export default App;
