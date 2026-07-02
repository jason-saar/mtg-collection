/* oracle_text needs to replace symbols with svg images and text in ()'s needs to be italicized
 * this is easiest to do by storing parsed text with its associated type, so the component can
 * easily format token depending on type.
 */
export type OracleToken = 
    { type: 'text', value: string }             // e.g. Bushido 1
    | { type: 'symbol', value: string }         // e.g. {T}
    | { type: 'hint', value: string }           // e.g. (When this blocks or becomes blocked...)

export function parseOracleText(text : string): OracleToken[] {
    // regex for ({anything contained within} OR (anything contained within)) all matches
    const regex = /(\{[^}]+\}|\([^)]+\))/g
    /* split text based on our regex, filter out "" that occurs around strings matching expression
     * e.g. "{T} some text for {R}{W} (hint text)" => ["", "{T}", " some text for ", "{R}", "", "{W}", " ", "(hint text)", ""]
     * filter => ["{T}", " some text for ", "{R}", "{W}", " ", "(hint text)"]
     */
    const tokens = text.split(regex).filter(p => p !== "")

    /*
     * Convert each token into an OracleToken[] object
     * /^...$/ means this token must be entirely this expression
     *  {...} => symbol
     *  (...) => hint
     *  else => text
     * .test() is a regex method that returns true | false whether the pattern matches
     */
    return tokens.map(token => {
        if (/^\{[^}]+\}$/.test(token)) return { type: 'symbol', value: token }
        if (/^\([^)]+\)$/.test(token)) return { type: 'hint', value: token }
        return { type: 'text', value: token }
    })
}