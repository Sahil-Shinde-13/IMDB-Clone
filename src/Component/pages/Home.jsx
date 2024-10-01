import React, { useEffect, useState } from 'react';
import './Home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../MovieList';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);  // Track data load

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setPopularMovies(data.results);
                setIsLoaded(true);  // Set isLoaded to true after data is fetched
            });
    }, []);

    return (
        <>
            <div className="poster">
                {isLoaded && (  // Render the carousel only after the data is loaded
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        interval={3000}
                        transitionTime={500}
                        infiniteLoop={true}
                        showStatus={false}
                        stopOnHover={false}
                    >
                        {popularMovies.map((movie, index) => (
                            <Link
                                key={index}
                                style={{ textDecoration: 'none', color: 'white' }}
                                to={`/movie/${movie.id}`}
                            >
                                <div className="posterImage">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                        alt={movie.original_title}
                                    />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie.original_title || ''}</div>
                                    <div className="posterImage__runtime">
                                        {movie.release_date || ''}
                                        <span className="posterImage__rating">
                                            {movie.vote_average || ''}
                                            <i className="fas fa-star" />{' '}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie.overview || ''}</div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                )}
                <MovieList />
            </div>
        </>
    );
};

export default Home;