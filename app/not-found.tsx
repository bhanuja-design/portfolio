import Link from "next/link";
import Shell from "@/app/components/layout/Shell";

export default function NotFound() {
  return (
    <main className="min-w-0">
      <Shell>
        <section className="content-grid hero-section">
          <div className="col-measure--10 min-w-0">
            <p className="font-mono text-sm uppercase tracking-wide text-text-secondary">
              404
            </p>
            <h1 className="pt-4 text-3xl text-text-primary">Page not found</h1>
            <p className="pt-4 text-base leading-relaxed text-text-body">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <p className="pt-6">
              <Link href="/" className="text-text-primary hover:text-accent">
                Back to home
              </Link>
            </p>
          </div>
        </section>
      </Shell>
    </main>
  );
}
