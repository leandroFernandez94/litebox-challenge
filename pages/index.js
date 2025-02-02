import {Fragment, useState} from 'react'
import Header from '../components/Header'
import MoviesSection from '../components/MoviesSection'
import UploadModal from '../components/UploadModal'
import MyList from '../components/MyList'
import NowPlaying from '../components/NowPlaying'
import MobileMenu from '../components/MobileMenu'
import useMobileMedia from '../hooks/useMobileMedia'

async function fetchUpcoming() {
  const result = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
  const resultJson = await result.json()
  return resultJson.results
}

async function fetchPopular() {
  const result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
  const resultJson = await result.json()
  return resultJson.results
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useMobileMedia()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [poster, setPoster] = useState(null)
  const [newMovies, setNewMovies] = useState([])

  function addMovie(movie) {
    setNewMovies(oldMovies => [...oldMovies, movie])
  }

  return (
    <Fragment>
      <div id="app-container">
        {!isMobileMenuOpen && <Header openUploadMovieModal={setIsModalOpen} />}
        {isMobile && (
          <MobileMenu 
            addMovieHandler={() => setIsModalOpen(true)}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        )}
        {poster && <div className='gradient-container'><img src={poster} className='background-poster'/></div>}
        <div className="content-container">
          <NowPlaying setPoster={setPoster}/>
          <MoviesSection name="Proximamente" fetchFunction={fetchUpcoming}/>
          <MoviesSection name="Populares en Liteflix" fetchFunction={fetchPopular} usePoster />
          <MyList newMovies={newMovies}/>
        </div>
        <UploadModal isOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} onAddMovie={addMovie}/>
      </div>
      <div id="upload-movie-modal"/>
      <div id="mobile-sidebar"/>
      <style jsx>{`
        #app-container {
          height: 100%;
        }

        .content-container {
          position: absolute;
          padding: 0 12%;
          top: 20%
        }

        .background-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gradient-container {
          position: relative;
          display: inline-block;
          height: 100%;
        }

        .gradient-container:after {
          position: absolute;
          content: "";
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to top, rgba(0, 0, 0, 0.2) 77%, #000000), linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 77%, #000000)
        }
    
        @media (max-width: 500px) {
          .content-container {
            top: 30%;
            padding: 5%;
          }

        }
      `}</style>
    </Fragment>
  )
}
