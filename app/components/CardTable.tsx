// https://tailwindcss.com/docs/table-layout
type PrintInfo = {
    id: string
    set_name: string
    prices: { usd?: string | null}
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
                    <td>{prices.usd ? `$${prices.usd}` : '-'}</td>
                  </tr>  
                ))}
            </tbody>
        </table>
    )
}