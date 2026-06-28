// https://nextjs.org/docs/app/api-reference/file-conventions/route#url-query-parameters
// https://github.com/ChiriVulpes/scryfall-sdk/blob/main/DOCUMENTATION.md
import { type NextRequest, NextResponse } from 'next/server'
import * as Scry from "scryfall-sdk"

// Scryfall requires all applications provide an agent
Scry.setAgent("mtg-collector", "0.1.0");

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')

    if(!query) {
        return NextResponse.json(
            { error: "Missing query" },
            { status: 400 }
        )
    }
    try {
        const cards = await Scry.Cards.search(query).waitForAll()
        return NextResponse.json(cards)
    } catch (err) {
        return NextResponse.json(
            { error: "No cards found" },
            { status: 404 }
        )
    }
}