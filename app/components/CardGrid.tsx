// https://tailwindcss.com/docs/grid-template-columns

"use client"

import type { MappedCard } from "@/lib/mapCard"
import CardItem from "./CardItem"

interface CardGridProps {
    cards: MappedCard[]
}

export default function CardGrid({ cards }: CardGridProps) {
    return(
        <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    )
}