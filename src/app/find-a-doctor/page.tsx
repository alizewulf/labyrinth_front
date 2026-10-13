import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import DoctorSearch from "@/widgets/doctorSearch";

export default function FindADoctorPage() {
  return (
    <div className="flex flex-col px-16 py-10">
      <FormIntroduction
        text={{
          header: "Find the right doctor for you",
          subtitle:
            "Expert care, on your terms. Browse trusted providers near you.",
        }}
      />
      <DoctorSearch />

    </div>
  );
}
