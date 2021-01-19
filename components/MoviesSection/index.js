import { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import MoviePoster from './MoviePoster'
import styles from './MoviesSection.module.css'

export default function MoviesSection({name, fetchFunction, usePoster = false, items}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchMovies() {
    if(items) {
      setMovies(items)
    } else {
      const fetchedMovies = await fetchFunction()
      setMovies(fetchedMovies)
    }
    setLoading(false)
  }
  
  useEffect(fetchMovies, [items])


  if(!movies || !movies.length) return null

  return (
    <div className={styles.appSectionContainer}>
      <div className={styles.appSectionTitle}>{name}</div>
      <div className={classNames(styles.sectionItems, {[styles.verticalItems]: usePoster})}>
        {
          loading 
            ? 'Loading...'
            : movies && movies.slice(0, 4).map(movie => (
              <MoviePoster movie={movie} key={movie.id} usePoster={usePoster}/>
            ))
        }
      </div>
    </div>
  )
}