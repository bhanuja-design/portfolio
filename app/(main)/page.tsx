import Hero from "@/app/components/home/Hero";
import SelectedWork from "@/app/components/home/SelectedWork";
import Shell from "@/app/components/layout/Shell";

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-hidden">
      <Shell>
        <div className="home-sections">
          <Hero />
          <SelectedWork />
        </div>
      </Shell>
    </main>
  );
}
