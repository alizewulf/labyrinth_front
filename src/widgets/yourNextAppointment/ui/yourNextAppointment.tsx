import NextAppointmentCard from "./NextAppointment.Card";

export default function YourNextAppointment() {
  return (
    <section className="flex gap-6">
      <div className="w-4/5 flex flex-col gap-4">
        <h3 className="font-bold text-lg text-text">Your next appointment</h3>
        <NextAppointmentCard />
      </div>
      <div className=""></div>
    </section>
  );
}
