import {
  BabySVG,
  BoneSVG,
  BrainSVG,
  HeartPulseSVG,
  ScanFaceSVG,
  StethoscopeSVG,
} from "../ui/Specialities.Icon";

interface Speciality {
  title: string;
  doctorsAmount: number;
  SVG: React.ElementType;
}

export const specialities: Speciality[] = [
  { title: "Cardiology", doctorsAmount: 10, SVG: HeartPulseSVG },
  { title: "General care", doctorsAmount: 8, SVG: StethoscopeSVG },
  { title: "Dermatology", doctorsAmount: 12, SVG: ScanFaceSVG },
  { title: "Neurology", doctorsAmount: 20, SVG: BrainSVG },
  { title: "Pediatrics", doctorsAmount: 15, SVG: BabySVG },
  { title: "Orthopedics", doctorsAmount: 40, SVG: BoneSVG },
];
