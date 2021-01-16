import { useEffect, useState } from "react"
import MoviesSection from "../MoviesSection"

export default function MyList() {
  const [myListItems, setMyListItems] = useState([])

  useEffect(fetchMovies, [])

  async function fetchMovies() {
    const result = await fetch('/api/get-my-list')
    const resultJson = await result.json()
    setMyListItems(resultJson.data)
  }
  
  return myListItems && (
    <MoviesSection name="Mi Lista" items={myListItems} usePoster></MoviesSection>
  )
}