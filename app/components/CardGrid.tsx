// https://tailwindcss.com/docs/grid-template-columns

"use client"

// TODO: decouple MappedCard and CardGrid? only need id and imageUri
import type { MappedCard } from "@/lib/mapCard"
import CardItem from "./CardItem"

interface CardGridProps {
    cards: MappedCard[]
}

export default function CardGrid({ cards }: CardGridProps) {
    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gird-cols-5 xl:grid-cols-6 gap-4">
            {cards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    )
}