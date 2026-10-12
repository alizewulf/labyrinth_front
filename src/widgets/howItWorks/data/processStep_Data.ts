export interface ProcessStep {
  step: number;
  label: string;
  caption: string;
}

export const processStep_Data: ProcessStep[] = [
  {
    step: 1,
    label: "Find your doctor",
    caption:
      "Search by specialty, location, or availability. Every provider is verified.",
  },
  {
    step: 2,
    label: "Choose your time",
    caption:
      "Pick a date and time that works for you. No calls, no waiting on hold.",
  },
  {
    step: 3,
    label: "Get the care you need",
    caption:
      "Receive your confirmation and visit your doctor. We’ll handle the reminders.",
  },
];
