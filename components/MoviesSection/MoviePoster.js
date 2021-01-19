import { useEffect, useRef, useState } from "react"
import classNames from 'classnames'
import styles from './MoviesSection.module.css'

export default function MoviePoster({movie, usePoster}) {
  const [loadingPoster, setLoadingPoster] = useState(true)
  const [poster, setPoster] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef()

  useEffect(downloadPoster, [])

  
  useEffect(() => {
    if(loadingPoster) return
    containerRef.current.addEventListener('mouseenter', () => {
      setIsHovered(true)
    })
    containerRef.current.addEventListener('mouseleave', () => {
      setIsHovered(false)
    })
  }, [loadingPoster])


  async function downloadPoster() {
    const posterUrl = movie.posterUrl || `https://image.tmdb.org/t/p/w500${usePoster ? movie.poster_path : movie.backdrop_path}`
    const data = await fetch(posterUrl)
    const dataBlob = await data.blob()
    setPoster(URL.createObjectURL(dataBlob))
    setLoadingPoster(false)
  }

  
  return loadingPoster 
    ? 'Loading poster'
    : (
      <div ref={containerRef} className={styles.posterContainer}>
        <div className={styles.imageContainer}>
          <img src={poster} className={styles.posterImg}/>
        </div>
        <div className={styles.arrowContainer}>
          <img className={styles.posterHoverArrow} src="/arrow-poster-hover.svg"></img>
        </div>
        <div className={styles.playButton}>
          <img src="/play.svg"/>
        </div>
      </div>
    ) 
}