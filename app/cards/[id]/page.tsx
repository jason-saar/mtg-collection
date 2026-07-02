import Scry from '@/lib/scryfall'
import DisplayFace from '@/app/components/DisplayFace';
import CardTable from '@/app/components/CardTable';


// dynamic route is passed automatically by Next.js from the URL
export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const card = await Scry.Cards.byId(id)
  
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
        {card.card_faces && card.card_faces.length > 1 ? (
          <div>
            <DisplayFace face={card.card_faces[0]} />
            <DisplayFace face={card.card_faces[1]} />
          </div>
        ) : (
          <DisplayFace face={card} />
        )}
      </div>
      <div className="flex justify-center pt-6">
        <CardTable cards={visiblePrints} />
      </div>
    </>
  )
}