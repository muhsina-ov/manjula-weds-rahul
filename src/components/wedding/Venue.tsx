import { Copy, Diamond, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

export function Venue() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(wedding.venue.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="Sacred Destination" />
          <h2 className="text-primary font-display mt-5 text-4xl font-light">
            Venue &amp; Location
          </h2>
          <p className="text-muted-foreground mt-2 text-xs tracking-wider uppercase">
            We await your gracious presence with open hearts
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="border-gold/30 bg-card shadow-luxe overflow-hidden rounded-[2rem] border">
            <div className="p-6 text-center">
              <span className="bg-secondary text-primary mx-auto grid h-12 w-12 place-items-center rounded-full">
                <MapPin className="h-5 w-5 text-gold" />
              </span>
              <h3 className="text-foreground font-display mt-3 text-2xl font-medium">
                {wedding.venue.name}
              </h3>
              <p className="text-gold mt-1 text-sm font-medium tracking-wide">
                {wedding.venue.area}
              </p>
              <p className="text-muted-foreground mt-2 text-xs">
                Guest reception on 25th November from 4:00 PM onwards
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={wedding.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="from-primary to-emerald-ink text-ivory flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-3 text-xs tracking-[0.2em] uppercase font-medium"
                >
                  <Navigation className="h-4 w-4" />
                  Open in Google Maps
                </a>
                <button
                  onClick={copyAddress}
                  className="border-gold/40 text-primary flex w-full items-center justify-center gap-2 rounded-full border py-3 text-xs tracking-[0.2em] uppercase font-medium"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Address Copied!" : "Copy Address"}
                </button>
              </div>
            </div>

            <div className="border-gold/20 border-t">
              <iframe
                title={`${wedding.venue.name} Location Map - Udhna Surat`}
                src={wedding.venue.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-64 w-full border-0"
              />
              <a
                href={wedding.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-ink text-ivory flex items-center justify-between px-5 py-3.5"
              >
                <span className="flex items-center gap-2 text-xs">
                  <Diamond className="text-gold h-3.5 w-3.5" />
                  Tap for navigation route
                </span>
                <span className="text-gold-soft text-[0.65rem]">
                  Google Maps
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
