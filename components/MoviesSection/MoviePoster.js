import { useEffect, useState } from "react"
import styles from './MoviesSection.module.css'

export default function MoviePoster({movie}) {
  const [loadingPoster, setLoadingPoster] = useState(true)
  const [poster, setPoster] = useState(null)

  async function downloadPoster() {
    const data = await fetch(`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`)
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