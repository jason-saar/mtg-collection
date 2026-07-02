import { parseOracleText } from "@/lib/oracleText";
import { symbolToUrl } from "@/lib/manaSymbols";

export default function OracleText( { oracleText }: { oracleText : string }) {
    // no oracle text to display
    if (!oracleText) return null
    const tokens = parseOracleText(oracleText)

    return (
        <p className="whitespace-pre-wrap">
            {tokens.map((token, i) => {
                if (token.type === "symbol") {
                    return <img
                                key={i}
                                src={symbolToUrl(token.value)}
                                alt={token.value}
                                className="w-4 h-4 inline relative top-[-2px]"
                            />
                }
                // hint can contain symbols, run an inner parse
                if (token.type === "hint") {
                    // strip "(" and ")" before parsing 
                    const inner = token.value.slice(1, -1)
                    const innerTokens = parseOracleText(inner)
                    return <em key={i}>({innerTokens.map((innerToken, j) => {
                        if (innerToken.type === "symbol") {
                            return <img
                                key={j}
                                src={symbolToUrl(innerToken.value)}
                                alt={innerToken.value}
                                className="w-4 h-4 inline relative top-[-1px]"
                            />
                        }
                        return <span key={j}>{innerToken.value}</span> 
                    })})</em>
                }
                return <span key={i}>{token.value}</span>
            })}
        </p>
    )
}