import React from 'react'
import './MovieList.css'
import { useParams } from 'react-router-dom'
import Card from './Card'
import { useState, useEffect } from 'react'

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map((movie,index) => (
                        
                         <div key={index}> <Card  movie={movie} /></div>
                        
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList