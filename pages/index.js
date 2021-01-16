import {Fragment, useState, useEffect} from 'react'
import Header from '../components/Header'
import NowPlayingDetails from '../components/NowPlayingDetails'
import MoviesSection from '../components/MoviesSection'
import UploadModal from '../components/UploadModal'
import MyList from '../components/MyList'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(fetchNowPlayingData, [])

  async function handlePosterPath(path) {
    const data = await fetch(`https://image.tmdb.org/t/p/original${path}`)
    const dataBlob = await data.blob()
    setMainPoster(URL.createObjectURL(dataBlob))
    setLoadingPoster(false)
  }

  async function fetchNowPlayingData() {
    try {
      const data = await fetchNowPlaying()
      setNowPlaying(data)
      handlePosterPath(data.backdrop_path)
    } catch(e) {
      console.error('failed to fetch now playing movie')
    }
  }

  return (
    <Fragment>
      <div id="app-container">
        <Header openUploadMovieModal={setIsModalOpen}/>
        
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
        <MoviesSection name="Populares en Liteflix" fetchFunction={fetchPopular} usePoster/>
        <MyList />
        <UploadModal isOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)}/>
        {/* <footer></footer> */}
      </div>
      <div id="upload-movie-modal"/>
      <style jsx>{`
        #app-container {
          padding: 0 12%;
          height: 100%;
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
            padding: 0 16px;
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
