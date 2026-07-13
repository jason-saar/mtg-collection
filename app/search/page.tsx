// https://nextjs.org/docs/app/api-reference/functions/use-search-params
// https://nextjs.org/docs/app/api-reference/functions/use-router
"use client"

import { useState, useEffect } from "react"
import { MappedCardDetails } from "@/lib/mapCard"
import CardGrid from "../components/CardGrid"
import { useSearchParams } from "next/navigation"

export default function Search() {
  const [cards, setCards] = useState<MappedCardDetails[]>([])
  /*
   * useSearchParams reads the query from the URL set by Navbar's SearchBar
   * Navbar lives in layout.tsx and cannot pass state directly to this page
   */
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ""     // null coalesce query for encodeURIComponent
  
  useEffect(() => {
    if (!query) {
      setCards([])    // clear cards when query is empty
      return
    }
    
    async function fetchCards() {
      const res = await fetch(`/api/cards/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setCards(data)
    }
    fetchCards()
  }, [query])

  return (
    <main className="pt-20">
      <CardGrid cards={cards} />
    </main>
  )   
}
