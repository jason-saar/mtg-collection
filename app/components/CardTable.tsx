// https://tailwindcss.com/docs/table-layout
type PrintInfo = {
    id: string
    set_name: string
    prices: {
        usd?: string | null
        usd_foil?: string | null
        usd_etched?: string | null
    }
    image_uris?: { small: string } | null
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
                {cards.map(({ id, set_name, prices}) => ( 
                  <tr key={id}>
                    <td>{set_name}</td>
                    <td>
                        {/* fall back through price tiers: regular->foil->etched->none */}
                        {prices.usd 
                            ? `$${prices.usd}`
                            : prices.usd_foil
                            ? `F $${prices.usd_foil}`
                            : prices.usd_etched
                            ? `F $${prices.usd_etched}`
                            : '-'
                        }</td>
                  </tr>  
                ))}
            </tbody>
        </table>
    )
}