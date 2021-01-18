import {Fragment, useState} from 'react'
import Header from '../components/Header'
import MoviesSection from '../components/MoviesSection'
import UploadModal from '../components/UploadModal'
import MyList from '../components/MyList'
import NowPlaying from '../components/NowPlaying'
import MobileMenu from '../components/MobileMenu'
import useMobileMedia from '../hooks/useMobileMedia'

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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useMobileMedia()

  return (
    <Fragment>
      <div id="app-container">
        {isMobile && <MobileMenu addMovieHandler={() => setIsModalOpen(true)}/>}
        <Header openUploadMovieModal={setIsModalOpen} />
        <NowPlaying />
        <div className="lists-container">
          <MoviesSection name="Proximamente" fetchFunction={fetchUpcoming}/>
          <MoviesSection name="Populares en Liteflix" fetchFunction={fetchPopular} usePoster />
          <MyList />
        </div>
        <UploadModal isOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />
      </div>
      <div id="upload-movie-modal"/>
      <div id="mobile-sidebar"/>
      <style jsx>{`
        #app-container {
          height: 100%;
        }

        .lists-container {
          position: relative;
          padding: 0 12%;
          top: -56px;
        }
    
        @media (max-width: 700px) {
        }
      `}</style>
    </Fragment>
  )
}
