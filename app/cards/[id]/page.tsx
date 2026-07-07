import Scry from '@/lib/scryfall'
import DisplayCard from '@/app/components/DisplayCard';
import CardTable from '@/app/components/CardTable';
import { mapCardDetails } from '@/lib/mapCard';
import Link from 'next/link';

// dynamic route is passed automatically by Next.js from the URL
export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const card = await Scry.Cards.byId(id)
  const set = await Scry.Sets.byCode(card.set)
  const cardData = mapCardDetails(card, set.icon_svg_uri)

  /*
   * Fetch up to 11 prints using scryfall-sdk MagicEmitter listeners
   * Displaying a maximum of 10 prints allows us to both save time on
   * the fetch (e.g. land card have over 900 prints), and display 
   * "View All Prints" link with more than 10 results.
   */
  const prints = await new Promise<Scry.Card[]>((resolve) => {
    const res: Scry.Card[] = []
    const emitter = Scry.Cards.search(
      `oracleid:${card.oracle_id}`,
      { unique: 'prints', order: 'released' }
    )
    emitter.on('data', (c) => {
      res.push(c)
      if (res.length >= 11) {
        emitter.cancel()                      // cancel search at 11 reprints
        resolve(res)
      }
    })
    emitter.on('end', () => resolve(res))     // all results fetched, < 10 prints exist
    emitter.on('error', () => resolve(res))   // resolve on error 
  })

  return (
    <>
      <div>
        <DisplayCard card={cardData} />
        <div className="flex justify-center pt-6">
          <CardTable cards={prints} currentCard={cardData}/>
          {prints.length === 11 && (
            <Link href={`/cards/${cardData.id}/prints`}>View all prints →</Link>
          )}
        </div>
      </div>
    </>
  )
}