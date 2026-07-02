import Scry from '@/lib/scryfall'
import DisplayCard from '@/app/components/DisplayCard';
import CardTable from '@/app/components/CardTable';
import { mapCardDetails } from '@/lib/mapCard';

// dynamic route is passed automatically by Next.js from the URL
export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const card = await Scry.Cards.byId(id)
  const cardData = mapCardDetails(card)


  // TODO: cap fetch size using card.search()
  const prints = await card.getPrints()
  // sort by release date, newest first
  const sortedPrints = prints.sort((a, b) =>
    new Date(b.released_at).getTime() - new Date(a.released_at).getTime()
  )
  const visiblePrints = sortedPrints.slice(0, 10)

  return (
    <>
      <div>
        {/* Detect multi-face cards vs single-faced 
          * TODO: Implement click & flip image  
        */}
        <DisplayCard card={cardData} />
        <div className="flex justify-center pt-6">
          <CardTable cards={visiblePrints} />
        </div>
      </div>
    </>
  )
}