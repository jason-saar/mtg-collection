import type { MappedCardDetails } from "@/lib/mapCard"
import Link from "next/link"

interface CardItemProps {
    card: MappedCardDetails
}

export default function CardItem({ card }: CardItemProps){
    const imageUri = card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal
    
    return (
        <Link href={`/cards/${card.id}`}>
            {imageUri && (
                <img 
                    src={imageUri}
                    alt={card.name}
                    style={{ borderRadius: "4.75% / 3.5%" }}
                    className="transition-transform duration-150 hover:scale-105 hover:shadow-lg cursor-pointer"
                />
            )}
        </Link>
    )
}