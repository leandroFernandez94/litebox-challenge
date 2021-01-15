import Head from 'next/head'
import {Fragment} from 'react'
import Header from '../components/Header'
import NowPlayingDetails from '../components/NowPlayingDetails'
import MoviesSection from '../components/MoviesSection'

export default function Home() {
  return (
    <Fragment>
      <div id="app-container">
        <Header/>
        <NowPlayingDetails/>
        <MoviesSection name="Proximamente"/>
        <MoviesSection name="Populares en Liteflix"/>
        {/* <footer></footer> */}
      </div>
      <style jsx>{`
        #app-container {
          padding: 0 20%;
        }
    
        @media (max-width: 700px) {
          #app-container {
            height: 100%;
            padding: 0;
          }
        }
      `}</style>
      <style jsx global>{`
        #app-container * {
          border: 1px solid red;
        }
      `}</style>
    </Fragment>
  )
}
