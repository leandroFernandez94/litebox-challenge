import { useEffect, useState } from 'react'
import MoviePoster from './MoviePoster'
import styles from './MoviesSection.module.css'

export default function MoviesSection({name, fetchFunction}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchMovies() {
    const fetchedMovies = await fetchFunction()
    setMovies(fetchedMovies)
    setLoading(false)
  }
  
  useEffect(fetchMovies, [])

  return (
    <div className={styles.appSectionContainer}>
      <div className={styles.appSectionTitle}>{name}</div>
      <div className={styles.sectionItems}>
        {
          loading 
            ? 'Loading...'
            : movies && movies.slice(0, 4).map(movie => (
              <MoviePoster movie={movie} key={movie.id}/>
            ))
        }
      </div>
    </div>
  )
}