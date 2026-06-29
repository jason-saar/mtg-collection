import * as Scry from 'scryfall-sdk'

// dynamic route is passed automatically by Next.js from the URL
export default async function CardPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const card = await Scry.Cards.byId(id)
    
    return (
        <div>
            <img src={card.image_uris?.large} alt={card.name} style={{ borderRadius: "4.75% / 3.5%" }} />
            <h1>{card.name}</h1>
        </div>
    )
}