"use client"

import { useState } from "react"
import { MappedCard } from "@/lib/mapCard"
import SearchBar from "./components/SearchBar"
import CardGrid from "./components/CardGrid"

export default function Home() {
  const [cards, setCards] = useState<MappedCard[]>([])
  return (
    <main>
      <SearchBar onSearch={setCards} />
      <CardGrid cards={cards} />
    </main>
  )   
}
