import { type NextRequest, NextResponse } from 'next/server'
import Scry from "@/lib/scryfall"
import { mapCardDetails } from "@/lib/mapCard"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }>}
) {
    const { id } = await params

    if(!id) {
        return NextResponse.json(
            { error: "Missing card ID" },
            { status: 400 }
        )
    }
    try {
        const card = await Scry.Cards.byId(id)
        const prints = await card.getPrints()
        return NextResponse.json(prints.map(card => mapCardDetails(card)))
    } catch (err) {
        return NextResponse.json(
            { error: "Card not found" },
            { status: 404 }
        )
    }
}