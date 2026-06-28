"use client"

import { useState } from "react"
import type { MappedCard } from "@/lib/mapCard"

// SearchBarProps defines what parent must pass
interface SearchBarProps {
    onSearch: (cards: MappedCard[]) => void // callback to send results up to parent
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("")

    async function searchHandler(e: React.SubmitEvent) {
        e.preventDefault()          // Prevent reload on submit
        if (!query) return          // do nothing if query is empty
        
        const res = await fetch(`/api/cards/search?q=${encodeURIComponent(query)}`)
        const cards = await res.json()
        onSearch(cards)
    }

    return (
        <form onSubmit={searchHandler}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}