"use client"

import ManaCost from '@/app/components/ManaCost';
import OracleText from '@/app/components/OracleText';
import { MappedCardDetails } from '@/lib/mapCard';
import { useState } from 'react';

export default function DisplayCard({ card }: { card: MappedCardDetails }) {
    const isMultiFace = card.card_faces && card.card_faces.length > 1
    const [faceIndex, setFaceIndex] = useState(0)
    const face = isMultiFace ? card.card_faces[faceIndex] : card

    // TODO: IMPLEMENT LOGIC TO FLIP AND DISPLAY BOTH FACES
    return (
        
        <div className="flex gap-8 items-start justify-center max-w-4xl mx-auto ">
            <div className="w-80">
                <img src={face.image_uris?.normal} alt={face.name} style={{ borderRadius: "4.75% / 3.5%" }} className="w-75 h-105 shadow-[1px_1px_8px_rgba(0,0,0,0.5)]" />
            </div>
            <div className="flex-1 border border-black/25 rounded bg-white max-w-125 pb-4 pt-1 px-2 shadow-[1px_1px_8px_rgba(0,0,0,0.5)]">
                {/* card.mana_cost can be string | null | undefined, if not string we fallback to '' for easier handling*/}
                <h1 className="flex gap-2 items-center py-2">{face.name} <ManaCost cost={face.mana_cost ?? ''}/></h1>
                <p className="py-1">{face.type_line}</p>
                <OracleText oracleText={face.oracle_text ?? ""} />
                {face.flavor_text && (
                    <p className="italic py-3">{face.flavor_text}</p>
                )}  
                {face.power && face.toughness && (
                    <p>{face.power}/{face.toughness}</p>
                )}
                <p>Illustrated by {face.artist}</p>
            </div>
        </div>
    )
}