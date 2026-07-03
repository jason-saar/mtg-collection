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
    <table>
      <thead>
        <tr>
          <th>Prints</th>
          <th>USD</th>
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
                    className="hidden group-hover:block absolute right-full bottom-0"
                    style={{ borderRadius: "4.75% / 3.5%" }}
                  />
                )}

              </td>
              <td className="px-2 py-1 text-right">
                {/* fall back through price tiers: regular->foil->etched->none */}
                {prices.usd 
                  ? `$${prices.usd}`
                  : prices.usd_foil
                  ? `F $${prices.usd_foil}`
                  : prices.usd_etched
                  ? `E $${prices.usd_etched}`
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