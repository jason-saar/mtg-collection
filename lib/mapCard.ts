import type {Card as ScryfallCard } from "scryfall-sdk"

// Maps a Scryfall API card response to the Card Schema
// https://scryfall.com/docs/api/cards
export function mapCard(card: ScryfallCard) {
    return {
        id: card.id,
        name: card.name,
        // Double-faced cards store image_uris on card_faces[]
        // TODO: implement double-faced card integration
        imageUri: card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal ?? null,
        setName: card.set_name,
        setCode: card.set,
        collectorNum: card.collector_number,
        manaCost: card.mana_cost ?? null,
        cmc: card.cmc,
        power: card.power ?? null,
        toughness: card.toughness ?? null,
        // Arrays/objects serialized to JSON strings for SQLite compatability
        colors: card.colors ? JSON.stringify(card.colors) : null,
        colorIdentity: JSON.stringify(card.color_identity),
        typeLine: card.type_line,
        rarity: card.rarity,
        prices: JSON.stringify(card.prices),
        keywords: JSON.stringify(card.keywords)
    }
}

// Infer mapCard return type
// https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype
export type MappedCard = ReturnType<typeof mapCard>