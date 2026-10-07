import Image from "next/image"
import HeroBanner from '../assets/Care photograph.png'
import { benefits } from "../benefits/benefits"

function CareIntroduction() {
    return (
        <div className="flex p-10 bg-[#F0FDFA] font-jakarta! flex-col gap-6 max-w-125 rounded-lg">
            <h1 className="text-text font-bold text-4xl">Your care, connected.</h1>

            <p className="text-text-secondary text-base">
                A healthier tomorrow starts with a simple step today.
                Find a doctor who listens, and manage your care with confidence.
            </p>

            <Image src={HeroBanner} alt="Hero IMG" className="rounded-xl"/>

            {benefits.map(({ SVG, label }) => (
                <div key={label} className="flex text-text gap-2.5 items-center text-xs">
                    <SVG />
                    <span>{label}</span>
                </div>
            ))}
        </div>
    )
}

export default CareIntroduction