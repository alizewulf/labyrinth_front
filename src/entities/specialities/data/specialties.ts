import {
  ActivitySVG,
  BabySVG,
  BoneSVG,
  BrainSVG,
  EarSVG,
  HearthHandShakeSVG,
  HearthSVG,
  HeartPulseSVG,
  ScanFaceSVG,
  StethoscopeSVG,
} from "@/entities/specialities/icons/Specialties.Icon";

export const specialityIcons: Record<string, React.ElementType> = {
  Cardiology: HeartPulseSVG,
  "General care": StethoscopeSVG,
  Dermatology: ScanFaceSVG,
  Neurology: BrainSVG,
  Pediatrics: BabySVG,
  Orthopedics: BoneSVG,
  Endocrinology: ActivitySVG,
  Gastroenterology: StethoscopeSVG,
  "Women's health": HearthSVG,
  "Mental Health": HearthHandShakeSVG,
  ENT: EarSVG,
};
