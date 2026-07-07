// https://nextjs.org/docs/app/api-reference/functions/use-search-params
// https://nextjs.org/docs/app/api-reference/functions/use-router
"use client"

import { useState, useEffect } from "react"
import { MappedCardDetails } from "@/lib/mapCard"
import CardGrid from "@/app/components/CardGrid"
import { useParams } from "next/navigation"

export default function Prints() {
  const [cards, setCards] = useState<MappedCardDetails[]>([])
  const params = useParams()
  const id = params.id

  
  useEffect(() => {
    async function fetchPrints() {
      const res = await fetch(`/api/cards/${id}/prints`)
      const data = await res.json()
      setCards(data)
    }
    fetchPrints()
  }, [id])

  return (
    <main>
      <CardGrid cards={cards} />
    </main>
  )   
}
