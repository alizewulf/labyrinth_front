import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import BookingFlow from "@/widgets/bookAppointment/BookingFlow";

export default function BookAppointment() {
  return (
    <div className="flex flex-col gap-6 px-12 py-9">
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
