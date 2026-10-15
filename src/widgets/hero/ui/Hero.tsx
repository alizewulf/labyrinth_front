import Image from "next/image";
import Link from "next/link";
import { ArrowRightSVG, DiamondSVG } from "./HeroIcons";
import HeroSearch from "./HeroSearch";

interface HeroProps {
  showSearch?: boolean;
}

export default function Hero({ showSearch = true }: HeroProps) {
  return (
    <section className="font-jakarta w-full">
      {/* Top Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-bold text-text leading-[1.15] tracking-tight">
            Better health starts with <br className="hidden sm:inline" />
            the right doctor.
          </h1>

          <p className="mt-4 text-text-secondary text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-xl">
            Find trusted specialists, book on your schedule, and feel confident about your next step.
            Thoughtful care is closer than you think.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 mt-7">
            <Link
              href="/find-a-doctor"
              className="inline-flex justify-center items-center gap-2 rounded-lg bg-primary hover:bg-[#1d4ed8] px-5 py-3 text-sm font-semibold text-white transition-colors shadow-xs"
            >
              <ArrowRightSVG className="w-4 h-4 text-white" />
              <span>Find your doctor</span>
            </Link>

            <Link
              href="/specialties"
              className="inline-flex justify-center items-center rounded-lg border border-border bg-white hover:bg-slate-50 px-5 py-3 text-sm font-semibold text-text transition-colors shadow-xs"
            >
              Explore specialties
            </Link>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-12 mt-8 pt-2">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-text">200+</p>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">Verified doctors</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-text">4.9/5</p>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">Patient satisfaction</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-text">12k+</p>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">Appointments booked</p>
            </div>
          </div>
        </div>

        {/* Right Column: Photograph & Floating Badge */}
        <div className="lg:col-span-5 w-full">
          <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm bg-slate-100">
            <Image
              src="/hero-banner.png"
              alt="Doctor consulting with a patient"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />

            {/* Floating Card */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl border border-border/70 bg-white/95 p-3.5 sm:p-4 shadow-lg backdrop-blur-sm flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                <DiamondSVG className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-text">
                  Expert care. Human connection.
                </h4>
                <p className="text-[11px] sm:text-xs text-text-secondary mt-0.5">
                  Doctors who prioritize who you are, not just your symptoms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Search Bar */}
      {showSearch && <HeroSearch />}
    </section>
  );
}
