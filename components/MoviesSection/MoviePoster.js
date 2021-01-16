import { useEffect, useState } from "react"
import classNames from 'classnames'
import styles from './MoviesSection.module.css'

export default function MoviePoster({movie, usePoster}) {
  const [loadingPoster, setLoadingPoster] = useState(true)
  const [poster, setPoster] = useState(null)

  async function downloadPoster() {
    const posterUrl = movie.posterUrl || `https://image.tmdb.org/t/p/w500${usePoster ? movie.poster_path : movie.backdrop_path}`
    const data = await fetch(posterUrl)
    const dataBlob = await data.blob()
    setPoster(URL.createObjectURL(dataBlob))
    setLoadingPoster(false)
  }

  useEffect(downloadPoster, [])
  
  return loadingPoster 
    ? 'Loading poster'
    : (
      <div className={styles.posterContainer}>
        <img src={poster} className={styles.posterImg}/>
      </div>
    ) 
}