import {CalendarSVG, HealthCareSVG, ShieldSVG} from '../ui/Benefits.Icons'

interface Benefits {
    label: string
    SVG: React.ElementType
}

export const benefits: Benefits[] = [
  {
    label: "Your information stays private",
    SVG: ShieldSVG,
  },
  {
    label: "Your health data is secure",
    SVG: HealthCareSVG,
  },
  {
    label: "Your appointments are protected",
    SVG: CalendarSVG,
  },
];
