
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
                <img src={card.imageUri} alt={card.name} style={{ borderRadius: "4.75% / 3.5%" }} />
            )}
        </div>
    )
}