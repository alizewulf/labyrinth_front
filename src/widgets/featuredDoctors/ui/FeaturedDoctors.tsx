import Image from "next/image"
import { doctorList } from "../data/doctorData"

function FeaturedDoctors() {
    return (
        <section className="flex flex-col">
            <div className="flex justify-between font-jakarta">
                <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-3xl text-text">Meet your next doctor</h3>
                    <span className="text-text-secondary text-sm">Highly rated specialists, selected for their expertise and compassion.</span>
                </div>
                <a href="#" className="font-jakarta font-bold text-[#2563EB]">View all doctors →</a>
            </div>

            <div className="flex">
                {doctorList.map(doctor => (
                    <div className="flex flex-col" key={doctor.name}>
                        <Image src={doctor.img} loading="eager" alt={doctor.name}/>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedDoctors