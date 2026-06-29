import Scry from '@/lib/scryfall'


// dynamic route is passed automatically by Next.js from the URL
export default async function CardPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    Scry.setAgent("mtg-collector", "0.1.0");
    const card = await Scry.Cards.byId(id)
    
    return (
        <div>
            <img src={card.image_uris?.normal} alt={card.name} style={{ borderRadius: "4.75% / 3.5%" }} />
            <h1>{card.name}</h1>
        </div>
    )
}