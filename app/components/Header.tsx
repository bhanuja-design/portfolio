import Link from "next/link";

export default function Header() {
  return (
    <header className="p-md md:p-lg">
      <nav className="flex gap-md">
        <Link href="/" className="no-underline hover:underline">
          Portfolio
        </Link>
        <Link href="/work" className="no-underline hover:underline">
          Work
        </Link>
        <a href="/resume.pdf" className="no-underline hover:underline">
          Resume
        </a>
      </nav>
    </header>
  );
}
