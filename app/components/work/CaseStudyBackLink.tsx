import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CaseStudyBackLink() {
  return (
    <Link
      href="/"
      className="case-study-back text-text-secondary transition-colors hover:text-accent focus-visible:text-accent"
    >
      <ArrowLeft size={16} strokeWidth={2} absoluteStrokeWidth className="text-current" />
      <span className="case-study-back__label">Back</span>
    </Link>
  );
}
