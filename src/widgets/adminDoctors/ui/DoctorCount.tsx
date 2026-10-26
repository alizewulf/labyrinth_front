interface DoctorsCountProps {
  count: number;
}

export default function DoctorsCount({ count }: DoctorsCountProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">Total doctor accounts</p>
      <p className="mt-2 text-3xl font-semibold">{count}</p>
    </div>
  );
}