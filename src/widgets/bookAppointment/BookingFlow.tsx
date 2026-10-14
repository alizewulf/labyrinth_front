"use client";

import { useCallback, useState } from "react";
import type { Doctor } from "@/entities/doctor/model/doctor.types";
import type { AvailableSlot } from "@/entities/doctorSchedule/api/getAvailableSlots";
import ChooseDate from "./ui/ChooseDate";
import ChooseDoctor from "./ui/ChooseDoctor";
import StepProgress from "./ui/ProgressBar";
import ChooseTime from "./ui/ChooseTime";
import BookingReview from "./ui/BookingReview";
import BookingConfirmation from "./ui/BookingConfirmation";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/entities/appointment/api/createAppointments";

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const handleSelectDoctor = useCallback((doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setAvailableSlots([]);
    setSelectedTime(null);
  }, []);

  const handleAvailableSlotsChange = useCallback((slots: AvailableSlot[]) => {
    setAvailableSlots(slots);
  }, []);
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleConfirmAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createAppointment({
        doctorId: selectedDoctor.id,
        startsAt: `${selectedDate}T${selectedTime}:00+04:00`,
      });

      setCurrentStep(5);
      router.refresh();
    } catch (error) {
      console.error("Failed to create appointment:", error);

      setSubmitError(
        error instanceof Error ? error.message : "Failed to create appointment",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <StepProgress currentStep={currentStep} />
      {currentStep === 1 && (
        <ChooseDoctor
          selectedDoctor={selectedDoctor}
          onSelectDoctor={handleSelectDoctor}
          onContinue={() => setCurrentStep(2)}
          onCancel={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 2 && selectedDoctor && (
        <ChooseDate
          doctor={selectedDoctor}
          selectedDate={selectedDate}
          availableSlots={availableSlots}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
          onAvailableSlotsChange={handleAvailableSlotsChange}
          onBack={() => setCurrentStep(1)}
          onContinue={() => setCurrentStep(3)}
        />
      )}
      {currentStep === 3 && selectedDoctor && selectedDate && (
        <ChooseTime
          doctor={selectedDoctor}
          selectedDate={selectedDate}
          availableSlots={availableSlots}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onBack={() => setCurrentStep(2)}
          onContinue={() => setCurrentStep(4)}
        />
      )}
      {currentStep === 4 && selectedDoctor && selectedDate && selectedTime && (
        <BookingReview
          doctor={selectedDoctor}
          date={selectedDate}
          time={selectedTime}
          onBack={() => setCurrentStep(3)}
          onConfirm={handleConfirmAppointment}
          isSubmitting={isSubmitting}
          error={submitError}
        />
      )}

      {currentStep === 5 && selectedDoctor && selectedDate && selectedTime && (
        <BookingConfirmation
          doctor={selectedDoctor}
          date={selectedDate}
          time={selectedTime}
        />
      )}
    </div>
  );
}
