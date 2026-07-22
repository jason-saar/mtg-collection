"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Home() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function searchHandler(e: React.SubmitEvent) {
    e.preventDefault()
    if(!query) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }


  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">MTG-Collector</h1>
      <form onSubmit={searchHandler} className="relative">
        <input
          type="text"
          value={query}
          placeholder="Search for a card..."
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded text-white bg-[#3B3550] outline-none w-80"
        />
        <button type="submit" className="px-4 py-2 bg-gray-500 text-white rounded">
          Search
        </button>
      </form>
      <p className="mt-2 text-xs text-gray-500">
        Advanced syntax (e.g. type:dragon, oracle:flying) requires learning{" "}
        <a href="https://scryfall.com/docs/syntax" target="_blank" className="underline decoration-solid hover:text-blue-300">
          Scryfall query language
        </a>
      </p>
    </main>
  )   
}
