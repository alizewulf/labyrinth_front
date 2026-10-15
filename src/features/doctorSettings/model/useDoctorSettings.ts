
"use client";

import { useEffect, useState } from "react";
import { API } from "@/shared/api/axios";
import { getMyDoctorProfile } from "@/entities/doctor/api/getMyDoctorProfile";
import { getSpecialties } from "@/entities/specialities/api/getSpecialities";
import type { MyDoctorProfile } from "@/entities/doctor/model/doctor.types";
import type { Speciality } from "@/entities/specialities/model/speciality.types";

export interface DoctorSettingsValues {
  name: string;
  surname: string;
  specialization: string;
}

export function useDoctorSettings() {
  const [profile, setProfile] = useState<MyDoctorProfile | null>(null);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function saveProfile(values: DoctorSettingsValues): Promise<void> {
    await Promise.all([
      API.patch("/users/me", {
        name: values.name,
        surname: values.surname,
      }),
      API.patch("/doctors/me", {
        specialization: values.specialization,
      }),
    ]);

    const updatedProfile = await getMyDoctorProfile();
    setProfile(updatedProfile);
  }

  function updateAvatar(avatarUrl: string | null): void {
    setProfile((currentProfile) => {
      if (!currentProfile) return currentProfile;

      return {
        ...currentProfile,
        avatar_url: avatarUrl,
      };
    });
  }

  useEffect(() => {
    async function loadSettings() {
      try {
        const [doctorProfile, specialityList] = await Promise.all([
          getMyDoctorProfile(),
          getSpecialties(),
        ]);

        setProfile(doctorProfile);
        setSpecialities(specialityList);
      } catch (error) {
        console.error("Failed to load doctor settings:", error);
        setError("Failed to load profile settings.");
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  return {
    profile,
    specialities,
    isLoading,
    error,
    saveProfile,
    updateAvatar,
  };
}
