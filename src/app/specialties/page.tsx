import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import SpecialtiesCatalog from "@/widgets/specialtiesCatalog";
import { getSpecialties } from "@/entities/specialities/api/getSpecialities";
import FeaturedDoctorsProvider from "@/widgets/featuredDoctorsProvider";
import Notice from "@/shared/widgets/notice";
import CareCallout from "@/shared/widgets/careCallout";

export default async function SpecialtiesPage() {
  const specialties = await getSpecialties();

  const specialtiesAmount = specialties.length;
  const doctorsAmount = specialties.reduce(
    (total, speciality) => total + speciality.doctorsAmount,
    0,
  );

  return (
    <div className="flex flex-col px-4 py-6 sm:px-8 md:px-16 md:py-12 gap-7 max-w-7xl mx-auto w-full">
      <FormIntroduction
        message={{
          header: "Explore our specialties",
          subtitle: `${specialtiesAmount} specialties · ${doctorsAmount} active doctors across our clinic network`,
        }}
      />

      <SpecialtiesCatalog />

      <FeaturedDoctorsProvider />

      <Notice
        notification="information"
        message={{
          title: "Not sure where to start?",
          description:
            "Our general care doctors can help you understand your concerns and connect you with the right specialist. For guidance, call +(995) 555-123-456.",
        }}
      />

      <CareCallout
        link={{
          showArrow: false,
          textContent: "Find your doctor",
          href: "/specialties",
        }}
        message={{
          header: "A simpler path to the right care",
          subtitle:
            "Find a trusted doctor and book a visit that fits your life",
        }}
      />
    </div>
  );
}
