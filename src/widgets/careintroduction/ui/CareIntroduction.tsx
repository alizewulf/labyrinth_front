import Image from "next/image"
import HeroBanner from '../assets/Care photograph.png'
import { benefits } from "../benefits/benefits"

function CareIntroduction() {
    return (
        <div className="hidden md:flex p-6 sm:p-8 lg:p-10 bg-[#F0FDFA] font-jakarta! flex-col gap-6 w-full max-w-md lg:max-w-125 rounded-xl border border-teal-100">
            <h1 className="text-text font-bold text-3xl sm:text-4xl">Your care, connected.</h1>

            <p className="text-text-secondary text-sm sm:text-base">
                A healthier tomorrow starts with a simple step today.
                Find a doctor who listens, and manage your care with confidence.
            </p>

            <Image src={HeroBanner} alt="Hero IMG" className="rounded-xl w-full h-auto object-cover"/>

            <div className="space-y-3 mt-2">
              {benefits.map(({ SVG, label }) => (
                  <div key={label} className="flex text-text gap-2.5 items-center text-xs sm:text-sm">
                      <SVG />
                      <span>{label}</span>
                  </div>
              ))}
            </div>
        </div>
    )
}

export default CareIntroduction
