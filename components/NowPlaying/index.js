import { useEffect, useState } from 'react'
import useMedia from '../../hooks/useMedia'
import styles from './NowPlaying.module.css'
import NowPlayingDetails from './NowPlayingDetails'

async function fetchNowPlaying() {
  const result = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20')
  const resultJson = await result.json()
  return resultJson.results && resultJson.results[0]
}

export default function NowPlaying() {
  const [mainPoster, setMainPoster] = useState(null)
  const [loadingPoster, setLoadingPoster] = useState(true)
  const [data, setData] = useState(null)
  const isMobile = useMedia('(max-width: 700px)')
  
  useEffect(fetchNowPlayingData, [])
  
  useEffect(fetchPoster, [isMobile, data])
  
  async function fetchPoster() {
    if(!data) return
    const path = isMobile ? data.poster_path : data.backdrop_path
    const response = await fetch(`https://image.tmdb.org/t/p/original${path}`)
    const dataBlob = await response.blob()
    setMainPoster(URL.createObjectURL(dataBlob))
    setLoadingPoster(false)
  }

  async function fetchNowPlayingData() {
    try {
      const data = await fetchNowPlaying()
      console.log('data', data)
      setData(data)
    } catch(e) {
      console.error('failed to fetch now playing movie')
    }
  }


  return (
    <div className={styles.nowPlaying}>
      {
        !loadingPoster && 
        mainPoster &&
        <div className={styles.gradientContainer}>
          <img src={mainPoster} className={styles.bgPoster}/>
          <NowPlayingDetails title={data.title}/>
        </div>
      }
    </div>
  )
}