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
        typeLine: card.type_line,
        rarity: card.rarity,
        // Arrays/objects serialized to JSON strings for SQLite compatability
        colors: card.colors ? JSON.stringify(card.colors) : null,
        colorIdentity: JSON.stringify(card.color_identity),
        legalities: JSON.stringify(card.legalities),
        finishes: JSON.stringify(card.finishes),
        prices: JSON.stringify(card.prices),
        keywords: JSON.stringify(card.keywords)
    }
}

// Maps ScryfallCard for client component props
export function mapCardDetails(card: ScryfallCard, iconSvgUri?: string){
    return {
        id: card.id,
        name: card.name,
        set: card.set,
        set_name: card.set_name,
        icon_svg_uri: iconSvgUri,
        collector_number: card.collector_number,
        rarity: card.rarity,
        finishes: card.finishes,
        mana_cost: card.mana_cost,
        type_line: card.type_line,
        oracle_text: card.oracle_text,
        flavor_text: card.flavor_text,
        power: card.power,
        toughness: card.toughness,
        artist: card.artist,
        image_uris: card.image_uris,
        card_faces: card.card_faces?.map(face => ({
            name: face.name,
            mana_cost: face.mana_cost,
            type_line: face.type_line,
            oracle_text: face.oracle_text,
            flavor_text: face.flavor_text,
            power: face.power,
            toughness: face.toughness,
            artist: face.artist,
            image_uris: face.image_uris
        }))
    }
}

// https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype
export type MappedCard = ReturnType<typeof mapCard>
export type MappedCardDetails = ReturnType<typeof mapCardDetails>