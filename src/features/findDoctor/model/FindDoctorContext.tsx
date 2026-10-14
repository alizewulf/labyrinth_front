"use client";

import { createContext, useContext } from "react";
import type { Doctor } from "@/entities/doctor/model/doctor.types";
import { DoctorFilters } from "./doctorFilter.types";

export interface FindDoctorContextValue {
  doctors: Doctor[];
  isLoading: boolean;
  error: string;
  search: string;
  setSearch: (search: string) => void;
  appliedFilters: DoctorFilters;
  setAppliedFilters: (filters: DoctorFilters) => void;
}

export const FindDoctorContext = createContext<FindDoctorContextValue | null>(
  null,
);

export function useFindDoctor() {
  const context = useContext(FindDoctorContext);

  if (!context) {
    throw new Error("useFindDoctor must be used within FindDoctorProvider");
  }

  return context;
}
