import { wedding } from "./data";
import { Parallax } from "./Parallax";
import { Reveal, Ornament } from "./Reveal";
import { Stethoscope, Heart, Sparkles } from "lucide-react";

function PersonCard({
  person,
  role,
  flip,
}: {
  person: typeof wedding.bride;
  role: string;
  flip?: boolean;
}) {
  return (
    <Reveal className="relative">
      <div className="bg-card/75 border-gold/30 shadow-luxe relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "url('https://media.invitestory.in/kerala-sands/images/mandala-texture.jpg')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative flex flex-col items-center text-center">
          <div className="from-gold/25 relative h-36 w-36 overflow-hidden rounded-full bg-gradient-to-b to-transparent border-2 border-gold/40 shadow-inner">
            <img
              src={person.image}
              alt={person.fullName}
              loading="lazy"
              width={768}
              height={896}
              className={`h-full w-full object-cover object-top ${flip ? "scale-x-[-1]" : ""}`}
            />
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-gold text-[0.65rem] tracking-[0.35em] uppercase font-medium">
            <span>{role}</span>
            <span>•</span>
            <span>{person.title}</span>
          </div>

          <h3 className="text-primary mt-1.5 font-display text-3xl font-light">{person.fullName}</h3>

          <div className="mt-3 space-y-1 text-xs">
            <p className="text-foreground/90 font-medium tracking-wide">{person.parents}</p>
            <p className="text-muted-foreground text-[0.7rem] italic">{person.grandparents}</p>
          </div>

          <span className="rule-gold my-4 w-20" />

          <p className="text-foreground/80 text-sm leading-relaxed italic px-2">
            "{person.note}"
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function Couple() {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <img
        src="https://media.invitestory.in/kerala-sands/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-6 -left-10 w-44 opacity-40"
      />
      <img
        src="https://media.invitestory.in/kerala-sands/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-10 -bottom-6 w-44 rotate-180 opacity-40"
      />

      <div className="relative mx-auto max-w-md">
        {/* Love Story Introduction Section */}
        <Reveal className="text-center mb-12">
          <Ornament label="Introduction" />
          
          <div className="border-gold/30 bg-card/60 mt-6 rounded-2xl border p-5 sm:p-6 backdrop-blur-sm shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <h2 className="text-primary font-display text-2xl sm:text-3xl font-light leading-snug">
              Two doctors. Two personalities. <br />
              <span className="text-gold font-normal">One beautiful love story.</span> ❤️
            </h2>

            <span className="rule-gold my-4 mx-auto w-24 block" />

            <p className="text-foreground/80 text-sm leading-relaxed">
              {wedding.story.bond}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-gold font-medium text-xs tracking-widest uppercase">
              <span>{wedding.story.signature}</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="text-center mb-8">
          <Ornament label="The Bride & Groom" />
          <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-xs tracking-wide">
            With the divine blessings of our ancestors and families
          </p>
        </Reveal>

        <div className="space-y-8">
          {/* Bride first (Dr. Manjula D/o Amrika & Makhan Lal Thakur) */}
          <Parallax speed={24}>
            <PersonCard person={wedding.bride} role="The Bride" flip />
          </Parallax>

          <div className="flex justify-center items-center gap-2">
            <span className="rule-gold w-12" />
            <span className="font-script text-gold animate-float-soft text-4xl">weds</span>
            <span className="rule-gold w-12" />
          </div>

          {/* Groom next (Dr. Rahul S/o Dharma & Suresh Chandra Chaudhary) */}
          <Parallax speed={-24}>
            <PersonCard person={wedding.groom} role="The Groom" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
