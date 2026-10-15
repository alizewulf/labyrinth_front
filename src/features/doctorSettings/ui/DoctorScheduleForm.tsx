"use client";

import { useEffect, useState } from "react";
import {
  getMySchedule,
  updateMySchedule,
} from "@/entities/doctorSchedule";
import type {
  DoctorSchedule,
  DoctorScheduleEntry,
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
  "rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600";

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
        startTime: "13:00",
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

    if (schedule.length === 0) {
      setError("Select at least one working day.");
      return;
    }

    const sortedSchedule = [...schedule].sort(
      (a, b) =>
        a.dayOfWeek - b.dayOfWeek ||
        a.startTime.localeCompare(b.startTime),
    );

    for (let index = 0; index < sortedSchedule.length; index++) {
      const current = sortedSchedule[index];

      if (current.endTime <= current.startTime) {
        setError("End time must be later than start time.");
        return;
      }

      const previous = sortedSchedule[index - 1];

      if (
        previous &&
        previous.dayOfWeek === current.dayOfWeek &&
        previous.endTime > current.startTime
      ) {
        setError("Working intervals cannot overlap.");
        return;
      }
    }

    setIsSaving(true);

    try {
      const payload: DoctorScheduleEntry[] = sortedSchedule.map(
        ({ dayOfWeek, startTime, endTime }) => ({
          dayOfWeek,
          startTime,
          endTime,
        }),
      );

      const updatedSchedule = await updateMySchedule({
        schedule: payload,
      });

      setSchedule(mapSchedule(updatedSchedule));
      setSuccess("Working schedule updated successfully.");
    } catch (error) {
      console.error("Failed to update doctor schedule:", error);
      setError(
        "Failed to save schedule. Existing appointments may conflict with these hours.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <p>Loading working schedule...</p>;
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
              className="rounded-lg border border-gray-200 p-4"
            >
              <label className="flex items-center gap-3 font-medium">
                <input
                  type="checkbox"
                  checked={isWorking}
                  onChange={(event) =>
                    toggleDay(day.value, event.target.checked)
                  }
                  className="h-4 w-4 accent-blue-600"
                />
                {day.label}
              </label>

              {isWorking && (
                <div className="mt-4 space-y-3">
                  {intervals.map((interval) => (
                    <div
                      key={`${day.value}-${interval.index}`}
                      className="flex flex-wrap items-end gap-3"
                    >
                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">
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

                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">
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

                      <button
                        type="button"
                        onClick={() => removeInterval(interval.index)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addInterval(day.value)}
                    className="text-sm font-medium text-blue-600 hover:underline"
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
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-sm text-green-700">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save Schedule"}
      </button>
    </form>
  );
}