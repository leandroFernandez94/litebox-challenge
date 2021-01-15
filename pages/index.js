import Head from 'next/head'
import {Fragment, useState, useEffect} from 'react'
import Header from '../components/Header'
import NowPlayingDetails from '../components/NowPlayingDetails'
import MoviesSection from '../components/MoviesSection'

async function fetchUpcoming() {
  const result = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=6f26fd536dd6192ec8a57e94141f8b20')
  const resultJson = await result.json()
  return resultJson.results
}

async function fetchPopular() {
  const result = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20')
  const resultJson = await result.json()
  return resultJson.results
}

async function fetchNowPlaying() {
  const result = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20')
  const resultJson = await result.json()
  return resultJson.results && resultJson.results[0]
}

export default function Home() {
  const [mainPoster, setMainPoster] = useState(null)
  const [loadingPoster, setLoadingPoster] = useState(true)

  const [nowPlaying, setNowPlaying] = useState(null)

  useEffect(fetchNowPlayingData, [])

  async function handlePosterPath(path) {
    console.log('path', path)
    const data = await fetch(`https://image.tmdb.org/t/p/original${path}`)
    const dataBlob = await data.blob()
    setMainPoster(URL.createObjectURL(dataBlob))
    setLoadingPoster(false)
  }

  async function fetchNowPlayingData() {
    try {
      const data = await fetchNowPlaying()
      console.log(data)
      setNowPlaying(data)
      handlePosterPath(data.backdrop_path)
    } catch(e) {
      console.error('failed to fetch now playing movie')
    }
  }

  return (
    <Fragment>
      <div id="app-container">
        <Header/>
        <div className="now-playing">
          {
            !loadingPoster && 
            mainPoster &&
            <div className="gradient-container">
              <img src={mainPoster} className="bg-poster"/>
              <NowPlayingDetails title={nowPlaying.title}/>
            </div>
          }
        </div>
        <MoviesSection name="Proximamente" fetchFunction={fetchUpcoming}/>
        <MoviesSection name="Populares en Liteflix" fetchFunction={fetchPopular}/>
        {/* <footer></footer> */}
      </div>
      <style jsx>{`
        #app-container {
          padding: 0 20%; 
        }

        .gradient-container {
          position: relative;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.2) 77%, #000000);
        }

        .now-playing {
          height: 30%
        }

        .bg-poster {
          width: 100%;
          z-index:-1;
          display:block;
        }
    
        @media (max-width: 700px) {
          #app-container {
            height: 100%;
            padding: 0;
          }
        }
      `}</style>
      {/* <style jsx global>{`
        #app-container * {
          border: 1px solid red;
        }
      `}</style> */}
    </Fragment>
  )
}
