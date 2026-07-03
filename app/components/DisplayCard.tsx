"use client"

import ManaCost from '@/app/components/ManaCost';
import OracleText from '@/app/components/OracleText';
import { MappedCardDetails } from '@/lib/mapCard';
import { useState } from 'react';

export default function DisplayCard({ card }: { card: MappedCardDetails }) {
    const isMultiFace = card.card_faces && card.card_faces.length > 1
    const [faceIndex, setFaceIndex] = useState(0)
    // show all faces, wrap single face card in array to allow use with map() regardless of # of faces
    const faces = isMultiFace ? card.card_faces : [card]
    const activeImage = isMultiFace ? card.card_faces[faceIndex].image_uris?.normal : card.image_uris?.normal

    return (
        <div className="flex gap-8 items-start justify-center max-w-4xl mx-auto ">
            <div className="w-80">
                <img src={activeImage} alt={card.name} className="w-75 h-105 rounded-[4.75%/3.5%] shadow-[1px_1px_8px_rgba(0,0,0,0.5)]" />
                {isMultiFace && (
                    <button onClick={() => setFaceIndex(faceIndex ? 0 : 1)}>Flip</button>
                )}
            </div>
            <div className="flex-1 border border-black/25 rounded bg-white max-w-125 pb-2 pt-1 px-2 shadow-[1px_1px_8px_rgba(0,0,0,0.5)]">
                {faces.map((face, i) => (                    
                    <div key={i}>
                        <div className="flex gap-2 items-center py-2">
                            <p className="text-[17px]">{face.name}</p>
                            {/* card.mana_cost can be string | null | undefined, if not string we fallback to "" to handle it simply*/}
                            <ManaCost cost={face.mana_cost ?? ""}/>
                        </div>
                        <hr className="border-t border-black/10 -mx-2" />
                        <div className="py-1">
                            <p>{face.type_line}</p>
                        </div>
                        <hr className="border-t border-black/10 -mx-2" />
                        <div className="py-1">
                            <OracleText oracleText={face.oracle_text ?? ""} />
                        </div>
                        <hr className="border-t border-black/10 -mx-2" />
                        {face.flavor_text && (
                            <div className="py-1">
                                <p className="italic">{face.flavor_text}</p>
                                <hr className="border-t border-black/10 -mx-2" />   
                            </div>
                        )}  
                        {face.power && face.toughness && (
                            <>
                                <div className="py-1">
                                    <p>{face.power}/{face.toughness}</p>
                                </div>
                                <hr className="border-t border-black/10 -mx-2" />
                            </>
                        )}
                    </div>
                ))}
                <p className="pt-2 text-xs">Illustrated by {card.artist}</p>
            </div>
        </div>
    )
}