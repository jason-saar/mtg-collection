import Scry from '@/lib/scryfall'
import CardTable from '@/app/components/CardTable';


// dynamic route is passed automatically by Next.js from the URL
export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const card = await Scry.Cards.byId(id)
  const prints = await card.getPrints();

  return (
    <div className="flex gap-8 items-start justify-center max-w-4xl mx-auto">
      <div className="w-80">
        <img src={card.image_uris?.normal} alt={card.name} style={{ borderRadius: "4.75% / 3.5%" }} className="w-75 h-105" />
      </div>
      <div className="flex-1">
        <h1>{card.name} {card.mana_cost}</h1>
        {/* TODO: Manacost mapper for SVG */}
        <p>{card.type_line}</p>
        <p>{card.oracle_text}</p>
        <p className="italic">{card.flavor_text}</p>
        <p>Illustrated by {card.artist}</p>
        <p>{card.prices.usd ? `${card.prices.usd}` : ''}</p>
        {/* TODO: Add reprint list */}
        <CardTable cards={prints} />
      </div>
    </div>
    )
}