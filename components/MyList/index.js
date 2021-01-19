import { useEffect, useRef, useState } from "react"
import MoviesSection from "../MoviesSection"

export default function MyList({newMovies}) {
  const [myListItems, setMyListItems] = useState([])
  const initialItems = useRef([])

  useEffect(fetchMovies, [])

  useEffect(() => {
    if(!newMovies) return
    setMyListItems([...initialItems.current, ...newMovies])
  }, [newMovies])

  async function fetchMovies() {
    const result = await fetch('/api/get-my-list')
    const resultJson = await result.json()
    setMyListItems(resultJson.data)
    initialItems.current = resultJson.data
  }
  
  return myListItems && (
    <MoviesSection name="Mi Lista" items={myListItems} usePoster></MoviesSection>
  )
}