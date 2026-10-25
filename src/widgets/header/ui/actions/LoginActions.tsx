import Link from "next/link";

export default function LoginActions() {
  return (
    <div className="hidden sm:flex gap-3 items-center">
      <Link
        href="/login"
        className="text-text-secondary cursor-pointer select-none hover:text-text-primary transition-colors text-sm"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="py-2.5 px-4 bg-status-available text-sm font-semibold font-jakarta text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get started
      </Link>
    </div>
  );
}
