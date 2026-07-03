// https://tailwindcss.com/docs/table-layout

import Link from "next/link"

type PrintInfo = {
  id: string
  set_name: string
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
}

export default function CardTable({ cards }: CardTableProps) {
  return(
    <table className="bg-white min-w-125 rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
      <thead>
        <tr className="bg-[#2B253A] rounded text-white">
          <th className="bg-[#2B253A] rounded-tl text-left pl-2.5">Prints</th>
          <th className="bg-[#2B253A] rounded-tr text-right pr-2">USD</th>
        </tr>
      </thead>
      <tbody>
        {cards.map(({ id, set_name, prices, image_uris, card_faces }) => {
          const imagePreview = image_uris?.normal ?? card_faces?.[0].image_uris?.normal
          return (
            <tr key={id} className="group relative">
              <td className="px-2 py-1 relative">   
                <Link href={`/cards/${id}`}>{set_name}</Link>         
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
  )
}