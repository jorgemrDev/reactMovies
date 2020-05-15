import React, { useState } from 'react';
import Grid from './elements/Grid';
import HeroImage from './elements/HeroImage';
import LoadMoreBtn from './elements/LoadMoreBtn';
import MovieThumb from './elements/MovieThumb';
import SearchBar from './elements/SearchBar';
import Spinner from './elements/Spinner';
import NoImage from './images/no_image.jpg';


import { useHomeFetch } from './hooks/useHomeFetch';
import {     
    POSTER_SIZE, 
    BACKDROP_SIZE, 
    IMAGE_BASE_URL,
    POPULAR_BASE_URL,
    SEARCH_BASE_URL
} from '../config';


const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
   const [{ state: {movies, heroImage, currentPage, totalPages},
    loading,    
    error 
}, fetchMovies] = useHomeFetch(searchTerm);
   
   const searchMovies = search => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
    setSearchTerm(search);
    fetchMovies(endpoint);
   }

   const loadMoreMovies = () => {
       const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
       const popularMovies = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;
       const endpoint = searchTerm ? searchEndpoint : popularMovies;
       fetchMovies(endpoint);
   }

//    if(error) return <div> Something went wrong </div>
   if(!movies[0]) return <Spinner />;
    return (
        <React.Fragment>            
            { !searchTerm && (
                <HeroImage 
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                />
            )}
            <SearchBar callback={searchMovies}/>
            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies' }>
                {
                    movies.map((movie, index) => (
                        <MovieThumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path ? 
                            `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                             : NoImage 
                            }
                        movieId = {movie.id}
                        movieName = {movie.original_title}
                        />
                    ))
                }
            </Grid>
           {loading && <Spinner />}
           {currentPage < totalPages && !loading &&(
            <LoadMoreBtn text="Load more" callback={loadMoreMovies} /> 
            )}
        </React.Fragment>
    )    
}

export default Home;