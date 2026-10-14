import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";

export default function SpecialtiesPage() {
  return (
    <div className="flex flex-col px-16 py-12 gap-7">
      <FormIntroduction
        text={{
          header: "Explore our specialties",
          subtitle:
            "12 specialties · 204 active doctors across our clinic network",
        }}
      />
    </div>
  );
}
