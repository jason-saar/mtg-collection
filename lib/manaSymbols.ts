// https://scryfall.com/docs/api/card-symbols/all
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

// parse all symbols within card.mana_cost (e.g. {2}{R}{W}{B}
export function parseMana(manaCost: string) : string[] {
    const regex = /\{[^}]+\}/g
    const matches = manaCost.match(regex)
    return matches ?? []
}

// remove {} and all / in symbol name (e.g. B/G/P-> BGP)
export function stripSymbol(symbol: string) : string {
    const regex = /[{}\/]/g
    return symbol.replace(regex, '')
}

// return mana symbol url after stripping
export function symbolToUrl(symbol: string) : string {
    return `https://svgs.scryfall.io/card-symbols/${stripSymbol(symbol)}.svg`
}

