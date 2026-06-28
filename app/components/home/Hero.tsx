import CopyEmailLink from "@/app/components/ui/CopyEmailLink";

export default function Hero() {
  return (
    <section className="content-grid hero-section">
      <div className="col-measure--10 hero-flow min-w-0 text-text-primary">
        <h1 className="hero-flow__block">
          I&apos;m{" "}
          <span data-cursor="pronounce" className="text-accent">
            Bhanuja
          </span>
          , a multi-disciplinary designer at{" "}
          <a
            href="https://aws.amazon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent"
          >
            Amazon Web Services
          </a>
          , focused on systems and complex experiences. I work across design, strategy, and research to translate
          complexity into clarity and help users realise value faster.
        </h1>
        <p className="hero-flow__block">
          The work that follows showcases the depth and breadth of my
          practice—from designing intuitive experiences to defining the
          frameworks, workflows, and systems that enable them. My approach is
          always intentional, user-centred, and grounded in measurable outcomes.
        </p>
        <p className="hero-flow__block">
          To befriend me or hire me, reach out on{" "}
          <a
            href="https://www.linkedin.com/in/bhanuja/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent"
          >
            LinkedIn
          </a>{" "}
          or by{" "}
          <CopyEmailLink email="bhanuja.design@gmail.com">email</CopyEmailLink>
          . I&apos;d love to hear from you!
        </p>
      </div>
    </section>
  );
}
