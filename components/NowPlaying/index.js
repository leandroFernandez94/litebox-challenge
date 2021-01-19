import { useEffect, useState } from 'react'
import useMobileMedia from '../../hooks/useMobileMedia'
import styles from './NowPlaying.module.css'
import NowPlayingDetails from './NowPlayingDetails'

async function fetchNowPlaying() {
  const result = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
  const resultJson = await result.json()
  return resultJson.results && resultJson.results[0]
}

export default function NowPlaying({setPoster}) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const isMobile = useMobileMedia()
  
  useEffect(fetchNowPlayingData, [])
  
  useEffect(fetchPoster, [isMobile, data])
  
  async function fetchPoster() {
    if(!data) return
    const path = isMobile ? data.poster_path : data.backdrop_path
    const response = await fetch(`https://image.tmdb.org/t/p/original${path}`)
    const dataBlob = await response.blob()
    setPoster(URL.createObjectURL(dataBlob))
    setLoading(false)
  }

  async function fetchNowPlayingData() {
    try {
      const data = await fetchNowPlaying()
      setData(data)
      setLoading(false)
    } catch(e) {
      console.error('failed to fetch now playing movie')
    }
  }


  return (
    <div className={styles.nowPlaying}>
      {
        !loading &&
        <div className={styles.gradientContainer}>
          <NowPlayingDetails title={data.title} description={data.overview}/>
        </div>
      }
    </div>
  )
}