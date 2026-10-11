import { StaticImageData } from "next/image";
import Sarah from "../assets/SarahChen.png";
import James from "../assets/JamesWilson.png";
import Amara from "../assets/AmaraOkfor.png";
import Daniel from "../assets/DanielKim.png";

interface Doctor {
  name: string;
  specialization: string;
  experience: number;
  experienceType: "month" | "year";
  visitType: "online" | "inperson";
  availableDate: string;
  price: number;
  reviews: number;
  img: StaticImageData;
}

export const doctorList: Doctor[] = [
  {
    name: "Sarah Chen",
    specialization: "Cardiologist",
    experienceType: "year",
    experience: 10,
    visitType: "inperson",
    availableDate: "15 Octomber",
    reviews: 15,
    price: 85,
    img: Sarah,
  },
  {
    name: "James Wilson",
    specialization: "General practitioner",
    experienceType: "year",
    experience: 15,
    visitType: "inperson",
    availableDate: "15 Octomber",
    reviews: 51,
    price: 150,
    img: James,
  },
  {
    name: "Amara Okfor",
    specialization: "Dermatolog",
    experienceType: "year",
    experience: 15,
    visitType: "inperson",
    availableDate: "20 Octomber",
    reviews: 61,
    price: 150,
    img: Amara,
  },
  {
    name: "Daniel Kim",
    specialization: "Neurologist",
    experienceType: "year",
    experience: 15,
    visitType: "inperson",
    availableDate: "25 Octomber",
    reviews: 75,
    price: 175,
    img: Daniel,
  },
];
