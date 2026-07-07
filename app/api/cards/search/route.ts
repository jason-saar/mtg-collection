// https://nextjs.org/docs/app/api-reference/file-conventions/route#url-query-parameters
// https://github.com/ChiriVulpes/scryfall-sdk/blob/main/DOCUMENTATION.md
import { type NextRequest, NextResponse } from 'next/server'
import Scry from "@/lib/scryfall"
import { mapCardDetails } from "@/lib/mapCard"

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
        // Limit to first page (175) to prevent long response times
        // TODO: implement pagination to allow browsing beyond first page
        // e.g. ?q=lightning+bolt&page=1, ?q=lightning+bolt&page=2
        const cards = await Scry.Cards.search(query, { page: 1 }).waitForAll()
        // return map using scryfall cardmapping
        return NextResponse.json(cards.map(card => mapCardDetails(card)))
    } catch (err) {
        return NextResponse.json(
            { error: "No cards found" },
            { status: 404 }
        )
    }
}