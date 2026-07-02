import { parseMana , symbolToUrl } from "@/lib/manaSymbols"

interface ManaCostProps {
    cost: string
}

export default function ManaCost( { cost } : ManaCostProps) {
    // no cost to display
    if (!cost) return null
    const symbols = parseMana(cost)

    return (
        <span className="inline-flex gap-0.5">
            {symbols.map((symbol, i) => (
                <img
                    key={i}
                    src={symbolToUrl(symbol)}
                    alt={symbol}
                    className="w-4 h-4"
                />
            ))}
        </span>
    )
}