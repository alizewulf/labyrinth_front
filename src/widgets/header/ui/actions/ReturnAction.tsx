import Link from "next/link";

export default function ReturnAction() {
  return (
    <Link href="/" className="text-xs text-text-secondary">
      ← Back to home
    </Link>
  );
}
