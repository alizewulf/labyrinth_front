import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import BookingFlow from "@/widgets/bookAppointment/BookingFlow";

export default function BookAppointment() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-8 md:px-12 md:py-9 max-w-7xl mx-auto w-full">
      <FormIntroduction
        message={{
          header: "Book an appointment",
          subtitle: "A few simple steps to the care you need",
        }}
      />
      <BookingFlow />
    </div>
  );
}
