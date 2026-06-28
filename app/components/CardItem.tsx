
"use client"

import { useState } from "react"
import type { MappedCard } from "@/lib/mapCard"

interface CardItemProps {
    card: MappedCard
}

export default function CardItem({ card }: CardItemProps){
    return (
        <div>
            {card.imageUri && (
                <img src={card.imageUri} alt={card.name} />
            )}
        </div>
    )
}