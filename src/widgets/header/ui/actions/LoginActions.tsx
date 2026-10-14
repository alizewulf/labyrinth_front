import Link from "next/link";

export default function LoginActions() {
  return (
    <div className="flex gap-3 items-center">
      <Link
        href="/login"
        className="text-text-secondary cursor-pointer select-none"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="py-2.75 px-4.5 bg-status-available text-sm font-semibold font-jakarta text-white rounded-lg"
      >
        Get started
      </Link>
    </div>
  );
}
