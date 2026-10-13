import {
  BabySVG,
  BoneSVG,
  BrainSVG,
  HeartPulseSVG,
  ScanFaceSVG,
  StethoscopeSVG,
} from "../ui/Specialities.Icon";

export const specialityIcons: Record<string, React.ElementType> = {
  Cardiology: HeartPulseSVG,
  "General care": StethoscopeSVG,
  Dermatology: ScanFaceSVG,
  Neurology: BrainSVG,
  Pediatrics: BabySVG,
  Orthopedics: BoneSVG,
};
