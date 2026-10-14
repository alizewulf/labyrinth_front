"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getDoctors } from "@/entities/doctor/api/getDoctors";
import type { Doctor } from "@/entities/doctor/model/doctor.types";

import { FindDoctorContext } from "./FindDoctorContext";
import { DEFAULT_DOCTOR_FILTERS, DoctorFilters } from "./doctorFilter.types";

interface FindDoctorProviderProps {
  children: ReactNode;
}

export default function FindDoctorProvider({
  children,
}: FindDoctorProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useMemo(() => new URLSearchParams(queryString), [queryString]);

  const search = params.get("search") ?? "";

  const appliedFilters = useMemo<DoctorFilters>(() => {
    const visitType = params.get("visitType");

    return {
      specialty: params.get("specialty") ?? "",
      visitType: visitType
        ? visitType.split(",")
        : DEFAULT_DOCTOR_FILTERS.visitType,
      availability:
        params.get("availability") ?? DEFAULT_DOCTOR_FILTERS.availability,
      experience: params.get("experience") ?? "",
      rating: params.get("rating") ?? DEFAULT_DOCTOR_FILTERS.rating,
      minFee: Number(params.get("minFee") ?? DEFAULT_DOCTOR_FILTERS.minFee),
      maxFee: Number(params.get("maxFee") ?? DEFAULT_DOCTOR_FILTERS.maxFee),
    };
  }, [params]);

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const nextParams = new URLSearchParams(queryString);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          nextParams.delete(key);
        } else {
          nextParams.set(key, value);
        }
      });

      const query = nextParams.toString();
      router.push(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, queryString, router],
  );

  const setSearch = useCallback(
    (value: string) => {
      updateUrl({ search: value.trim() || null });
    },
    [updateUrl],
  );

  const setAppliedFilters = useCallback(
    (filters: DoctorFilters) => {
      updateUrl({
        specialty: filters.specialty || null,
        visitType:
          filters.visitType.length > 0 ? filters.visitType.join(",") : null,
        availability: filters.availability || null,
        experience: filters.experience || null,
        rating: filters.rating || null,
        minFee:
          filters.minFee !== DEFAULT_DOCTOR_FILTERS.minFee
            ? String(filters.minFee)
            : null,
        maxFee:
          filters.maxFee !== DEFAULT_DOCTOR_FILTERS.maxFee
            ? String(filters.maxFee)
            : null,
      });
    },
    [updateUrl],
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchDoctors() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getDoctors(search);

        if (!cancelled) {
          setDoctors(data);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load doctors. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchDoctors();

    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <FindDoctorContext.Provider
      value={{
        doctors,
        isLoading,
        error,
        search,
        setSearch,
        appliedFilters,
        setAppliedFilters,
      }}
    >
      {children}
    </FindDoctorContext.Provider>
  );
}
