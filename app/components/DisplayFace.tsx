import ManaCost from '@/app/components/ManaCost';
import OracleText from '@/app/components/OracleText';

interface FaceProps {
    name: string
    mana_cost?: string | null
    type_line?: string | null
    oracle_text?: string | null
    flavor_text?: string | null
    artist?: string | null
    image_uris?: { normal?: string } | null
    power?: string | null
    toughness?: string | null
}

export default function DisplayFace({ face }: { face: FaceProps }) {
    return (
        <>
        <div className="flex gap-8 items-start justify-center max-w-4xl mx-auto">
            <div className="w-80">
            <img src={face.image_uris?.normal} alt={face.name} style={{ borderRadius: "4.75% / 3.5%" }} className="w-75 h-105" />
            </div>
            <div className="flex-1">
            {/* card.mana_cost can be string | null | undefined, if not string we fallback to '' for easier handling*/}
            <h1 className="flex gap-2 items-center">{face.name} <ManaCost cost={face.mana_cost ?? ''}/></h1>
            <p>{face.type_line}</p>
            <OracleText oracleText={face.oracle_text ?? ""} />
            <p className="italic">{face.flavor_text}</p>
            <p>Illustrated by {face.artist}</p>
            </div>
        </div>
        </>
    )

}