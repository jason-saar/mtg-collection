import type { MappedCard } from "@/lib/mapCard"
import Link from "next/link"

interface CardItemProps {
    card: MappedCard
}

export default function CardItem({ card }: CardItemProps){
    
    
    return (
        <Link href={`/cards/${card.id}`}>
            {card.imageUri && (
                <img src={card.imageUri} alt={card.name} style={{ borderRadius: "4.75% / 3.5%" }} />
            )}
        </Link>
    )
}