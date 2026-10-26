"use client";

import { useEffect, useState } from "react";
import {
  getMySchedule,
  updateMySchedule,
} from "@/entities/doctorSchedule";
import type {
  DoctorSchedule,
} from "@/entities/doctorSchedule";

const DAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];

const inputClass =
  "w-full sm:w-auto rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 text-sm";

type ScheduleInterval = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

function toTime(value: string): string {
  return value.slice(0, 5);
}

function mapSchedule(
  schedule: DoctorSchedule[],
): ScheduleInterval[] {
  return schedule.map((item) => ({
    dayOfWeek: item.day_of_week,
    startTime: toTime(item.start_time),
    endTime: toTime(item.end_time),
  }));
}

export default function DoctorScheduleForm() {
  const [schedule, setSchedule] = useState<ScheduleInterval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadSchedule() {
      try {
        const data = await getMySchedule();
        setSchedule(mapSchedule(data));
      } catch {
        setError("Failed to load your working schedule.");
      } finally {
        setIsLoading(false);
      }
    }

    loadSchedule();
  }, []);

  function toggleDay(dayOfWeek: number, checked: boolean) {
    setError("");
    setSuccess("");

    setSchedule((current) => {
      if (checked) {
        return [
          ...current,
          {
            dayOfWeek,
            startTime: "09:00",
            endTime: "17:00",
          },
        ];
      }

      return current.filter((item) => item.dayOfWeek !== dayOfWeek);
    });
  }

  function updateInterval(
    index: number,
    field: "startTime" | "endTime",
    value: string,
  ) {
    setError("");
    setSuccess("");

    setSchedule((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function addInterval(dayOfWeek: number) {
    setError("");
    setSuccess("");

    setSchedule((current) => [
      ...current,
      {
        dayOfWeek,
        startTime: "09:00",
        endTime: "17:00",
      },
    ]);
  }

  function removeInterval(index: number) {
    setError("");
    setSuccess("");

    setSchedule((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    // Validate start and end times
    for (const item of schedule) {
      if (item.startTime >= item.endTime) {
        setError("Start time must be earlier than end time.");
        return;
      }
    }

    setIsSaving(true);
    try {
      await updateMySchedule({
        schedule: schedule.map((item) => ({
          dayOfWeek: item.dayOfWeek,
          startTime: item.startTime,
          endTime: item.endTime,
        })),
      });
      setSuccess("Working schedule saved successfully.");
    } catch {
      setError("Failed to save working schedule. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading working schedule...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm text-gray-600">
        Choose your working days and set your available hours.
      </p>

      <div className="space-y-4">
        {DAYS.map((day) => {
          const intervals = schedule
            .map((item, index) => ({ ...item, index }))
            .filter((item) => item.dayOfWeek === day.value);

          const isWorking = intervals.length > 0;

          return (
            <section
              key={day.value}
              className="rounded-lg border border-gray-200 p-3 sm:p-4 bg-gray-50/50"
            >
              <label className="flex items-center gap-3 font-medium text-text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWorking}
                  onChange={(event) =>
                    toggleDay(day.value, event.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm sm:text-base">{day.label}</span>
              </label>

              {isWorking && (
                <div className="mt-4 space-y-3 pl-0 sm:pl-7">
                  {intervals.map((interval) => (
                    <div
                      key={`${day.value}-${interval.index}`}
                      className="flex flex-col sm:flex-row sm:items-end gap-3 bg-white p-3 rounded-lg border border-gray-100"
                    >
                      <div className="flex flex-col gap-1 w-full sm:w-auto">
                        <label className="text-xs sm:text-sm text-gray-600">
                          Start time
                        </label>
                        <input
                          type="time"
                          required
                          value={interval.startTime}
                          onChange={(event) =>
                            updateInterval(
                              interval.index,
                              "startTime",
                              event.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-full sm:w-auto">
                        <label className="text-xs sm:text-sm text-gray-600">
                          End time
                        </label>
                        <input
                          type="time"
                          required
                          value={interval.endTime}
                          onChange={(event) =>
                            updateInterval(
                              interval.index,
                              "endTime",
                              event.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:ml-auto w-full sm:w-auto flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeInterval(interval.index)}
                          className="w-full sm:w-auto rounded-lg border border-red-200 px-3 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addInterval(day.value)}
                    className="inline-block text-xs sm:text-sm font-medium text-blue-600 hover:underline pt-1"
                  >
                    + Add interval
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 p-3 bg-red-50 rounded-lg border border-red-100">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-sm text-green-700 p-3 bg-green-50 rounded-lg border border-green-100">
          {success}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Schedule"}
        </button>
      </div>
    </form>
  );
}
