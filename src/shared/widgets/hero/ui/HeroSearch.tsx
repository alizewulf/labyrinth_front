"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownSVG, SearchSVG } from "./HeroIcons";

export default function HeroSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("San Francisco, CA");
  const [visitType, setVisitType] = useState("In-person visit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (location.trim()) params.set("location", location.trim());
    if (visitType.trim()) params.set("visitType", visitType.trim());

    const query = params.toString();
    router.push(query ? `/find-a-doctor?${query}` : "/find-a-doctor");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 w-full rounded-2xl border border-border bg-[#F8FAFC]/70 p-4 lg:p-5 font-jakarta"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        {/* Doctor or specialty */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label htmlFor="hero-search" className="text-xs font-semibold text-text">
            Doctor or specialty
          </label>
          <input
            id="hero-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty"
            className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label htmlFor="hero-location" className="text-xs font-semibold text-text">
            Location
          </label>
          <div className="relative">
            <select
              id="hero-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-white px-3.5 py-2.5 pr-8 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
            >
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="New York, NY">New York, NY</option>
              <option value="Los Angeles, CA">Los Angeles, CA</option>
              <option value="Chicago, IL">Chicago, IL</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <ChevronDownSVG />
            </div>
          </div>
        </div>

        {/* Visit type */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <label htmlFor="hero-visit-type" className="text-xs font-semibold text-text">
            Visit type
          </label>
          <div className="relative">
            <select
              id="hero-visit-type"
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-white px-3.5 py-2.5 pr-8 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
            >
              <option value="In-person visit">In-person visit</option>
              <option value="Video visit">Video visit</option>
              <option value="Phone consultation">Phone consultation</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <ChevronDownSVG />
            </div>
          </div>
        </div>

        {/* Search button */}
        <div className="lg:col-span-1">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[#1d4ed8] px-6 py-2.5 text-sm font-semibold text-white transition-colors h-[42px]"
          >
            <SearchSVG className="w-4 h-4 text-white" />
            <span>Search doctors</span>
          </button>
        </div>
      </div>
    </form>
  );
}
