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
  const set = await Scry.Sets.byCode(card.set)
  const cardData = mapCardDetails(card, set.icon_svg_uri)
  console.log(cardData.finishes)

  /*
   * Scryfall-sdk MagicEmitter object includes listeners 
   */
  console.time('getPrints')
  const getPrints = await new Promise<Scry.Card[]>((resolve) => {
    const res: Scry.Card[] = []
    const emitter = Scry.Cards.search(
      `oracleid:${card.oracle_id}`,
      { unique: 'prints', order: 'released' }
    )
    emitter.on('data', (c) => {
      res.push(c)
      if (res.length >= 10) {
        emitter.cancel()                      // cancel search at 10 reprints
        resolve(res)
      }
    })
    emitter.on('end', () => resolve(res))     // all results fetched, < 10 prints exist
    emitter.on('error', () => resolve(res))   // resolve on error 
  })
  console.timeEnd('getPrints')

  return (
    <>
      <div>
        <DisplayCard card={cardData} />
        <div className="flex justify-center pt-6">
          <CardTable cards={getPrints} currentCard={cardData}/>
        </div>
      </div>
    </>
  )
}