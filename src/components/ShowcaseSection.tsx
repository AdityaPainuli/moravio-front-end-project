import React from 'react'
import { useAppSelector } from '../app/hooks'

const ShowCaseSection = () => {
    const SearchedGIFS = useAppSelector(state=>state.gifsState.data);
    // need pagenumber here for rendering out the gifs.
  return (
    <div className="grid grid-cols-1 w-[90%] m-auto gap-4 lg:grid-cols-3 mt-[2rem] sm:grid-cols-2">
    
    {
        SearchedGIFS.map((gifs:any)=> (
            <div key={gifs.id}>
                <img src={gifs.images.downsized_medium.url} alt={gifs.title} />
            </div>
        ))
    }
</div>
  )
}

export default ShowCaseSection