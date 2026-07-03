// https://tailwindcss.com/docs/table-layout

import Link from "next/link"
import { MappedCardDetails } from "@/lib/mapCard"

type PrintInfo = {
  id: string
  set_name: string
  collector_number: string
  prices: {
    usd?: string | null
    usd_foil?: string | null
    usd_etched?: string | null
  }
  image_uris?: { normal: string } | null
  card_faces?: {
    image_uris?: { normal : string} | null
  }[]
}

interface CardTableProps {
  cards: PrintInfo[]
  currentCard: MappedCardDetails
}

export default function CardTable({ cards, currentCard }: CardTableProps) {
  /*
   * Prints can appear in a set > 1 time, so it's useful to display
   * collector_number when that is the case. (e.g. MOM #203, MOM #204)
   *    reduce() transforms cards into an object of Records where
   *    key="set_name" value=count
   */
  const cardCount = cards.reduce((acc, card) => {
    // if record exists inc by 1, otherwise set to 1
    acc[card.set_name] = (acc[card.set_name] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  /* format current card finishes
   * ['nonfoil', 'foil'] => "N" + "onfoil" + "/" + "F" + "oil" => "Nonfoil/Foil"
   */
  const currFinishes = currentCard.finishes.map(finish =>  
    finish.charAt(0).toUpperCase() + finish.slice(1)).join('/')

  return(
    <div className="min-w-125">
      <div className="bg-[#2B253A] w-full rounded-t text-white">
        <div className="flex items-center gap-3 p-2">
          {currentCard.icon_svg_uri && (
            <img
              src={currentCard.icon_svg_uri}
              alt={currentCard.set}
              className="w-6 h-6 invert"
            />
          )}
          <div className="">
            <p className="text-lg font-semibold">{currentCard.set_name} ({currentCard.set.toUpperCase()})</p>
            <p className="text-xs capitalize font-semibold">#{currentCard.collector_number} · {currentCard.rarity} · {currFinishes}</p>
          </div>
        </div>
      </div>
      <table className="bg-white w-full rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <thead>
          <tr className="bg-[#2B253A] rounded text-white">
            <th className="bg-[#2B253A] text-left pl-2">Prints</th>
            <th className="bg-[#2B253A] text-right pr-2">USD</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(({ id, set_name, collector_number, prices, image_uris, card_faces }) => {
            const imagePreview = image_uris?.normal ?? card_faces?.[0].image_uris?.normal
            return (
              <tr key={id} className={`group relative ${currentCard.id === id ? 'bg-[#2b253a]/15' : ''}`}>
                <td className="px-2 py-1 relative">   
                  <Link href={`/cards/${id}`}>
                    {set_name}
                    {/* display collector_number if > 1 prints in set */}
                    {cardCount[set_name] > 1 && ` #${collector_number}`}
                  </Link>         
                  {imagePreview && (
                    <img 
                      src={imagePreview}
                      alt={set_name}
                      className="hidden group-hover:block absolute right-full bottom-0 w-48"
                      style={{ borderRadius: "4.75% / 3.5%" }}
                    />
                  )}

                </td>
                <td className="px-2 py-1 text-right">
                  {/* fall back through price tiers: regular->foil->etched->none */}
                  {prices.usd 
                    ? `$${prices.usd}`
                    : prices.usd_foil
                    ? `✶ $${prices.usd_foil}`
                    : prices.usd_etched
                    ? `✶ $${prices.usd_etched}`
                    : '-'
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}