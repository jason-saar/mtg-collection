import type { MappedCardDetails } from "@/lib/mapCard"
import Link from "next/link"

interface CardItemProps {
    card: MappedCardDetails
}

export default function CardItem({ card }: CardItemProps){
    
    
    return (
        <Link href={`/cards/${card.id}`}>
            {card.image_uris?.normal && (
                <img 
                    src={card.image_uris.normal}
                    alt={card.name}
                    style={{ borderRadius: "4.75% / 3.5%" }}
                    className="transition-transform duration-150 hover:scale-105 hover:shadow-lg cursor-pointer"
                />
            )}
        </Link>
    )
}