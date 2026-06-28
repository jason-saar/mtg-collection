import { useState } from "react"
import { MappedCard } from "@/lib/mapCard"

export default function Home() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<MappedCard[]>([])
  return (
    <>
    </>
  )   
}
