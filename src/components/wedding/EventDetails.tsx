import {
  CalendarPlus,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  CalendarDays,
  Flame,
  Music,
  PartyPopper,
  HeartHandshake,
} from "lucide-react";
import { motion } from "framer-motion";
import { wedding, type DaySchedule } from "./data";
import { Reveal, Ornament } from "./Reveal";

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function addToCalendar() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp(wedding.dateISO)}`,
    `DTEND:${icsStamp(wedding.endISO)}`,
    `SUMMARY:Wedding: ${wedding.bride.name} & ${wedding.groom.name}`,
    `LOCATION:Wedding Celebration`,
    `DESCRIPTION:We cordially invite you to the wedding of ${wedding.bride.fullName} & ${wedding.groom.fullName}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "dr-manjula-weds-dr-rahul.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function getEventIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("mehendi")) return Sparkles;
  if (t.includes("haldi")) return Sparkles;
  if (t.includes("sangeet")) return Music;
  if (t.includes("baarat")) return PartyPopper;
  if (t.includes("phere")) return Flame;
  if (t.includes("reception")) return Sparkles;
  if (t.includes("vidaai")) return HeartHandshake;
  return Clock;
}

export function EventDetails() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="Celebration Itinerary" />
          <h2 className="text-primary font-display mt-5 text-4xl font-light">Wedding Festivities</h2>
          <p className="text-muted-foreground mt-2 text-xs tracking-wider uppercase">
            Join us as we celebrate love across three blessed days
          </p>
        </Reveal>

        {/* Multi-Day Schedule Itinerary */}
        <div className="mt-8 space-y-6">
          {wedding.schedule.map((day: DaySchedule, dayIdx: number) => (
            <Reveal key={day.date} delay={dayIdx * 0.1}>
              <div className="border-gold/30 bg-card shadow-luxe overflow-hidden rounded-[2rem] border">
                {/* Day Header */}
                <div className="from-primary to-emerald-ink bg-gradient-to-r px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-gold/20 text-gold-soft border border-gold/30 grid h-9 w-9 shrink-0 place-items-center rounded-full">
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-ivory font-display text-lg font-normal leading-tight">
                        {day.date}
                      </p>
                      <p className="text-gold-soft text-[0.65rem] tracking-[0.25em] uppercase">
                        {day.dayName}
                      </p>
                    </div>
                  </div>
                  <span className="text-[0.6rem] uppercase tracking-wider text-ivory/75 bg-emerald-ink/50 px-2.5 py-1 rounded-full border border-gold/20">
                    Day 0{dayIdx + 1}
                  </span>
                </div>

                {/* Day Events */}
                <div className="divide-gold/15 divide-y">
                  {day.events.map((evt) => {
                    const Icon = getEventIcon(evt.title);
                    return (
                      <div key={evt.title} className="p-5">
                        <div className="flex items-start gap-4">
                          <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full mt-0.5 shadow-sm">
                            <Icon className="h-4 w-4 text-gold" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-1.5">
                              <h4 className="text-foreground font-display text-xl font-medium">
                                {evt.title}
                              </h4>
                              {evt.badge && (
                                <span className="bg-gold/15 text-primary border border-gold/30 rounded-full px-2.5 py-0.5 text-[0.6rem] font-medium tracking-wide">
                                  {evt.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-gold mt-1 flex items-center gap-1.5 text-xs font-medium tracking-wider">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{evt.time}</span>
                            </p>
                            {evt.note && (
                              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                                {evt.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Add To Calendar Button */}
        <Reveal delay={0.2} className="mt-6">
          <div className="border-gold/30 bg-card shadow-sm rounded-2xl border p-4 text-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={addToCalendar}
              className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-3.5 text-xs tracking-[0.25em] uppercase font-medium"
            >
              <CalendarPlus className="h-4 w-4" />
              Add Celebrations to Calendar
            </motion.button>
          </div>
        </Reveal>

        {/* RSVP Section */}
        <Reveal delay={0.25} className="mt-8">
          <div className="border-gold/30 bg-card shadow-luxe overflow-hidden rounded-[2rem] border">
            <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-6 text-center text-ivory">
              <span className="text-gold-soft text-[0.65rem] tracking-[0.45em] uppercase font-medium">
                Warm Greetings &amp; RSVP
              </span>
              <h3 className="font-display text-2xl font-light mt-1.5">
                {wedding.rsvp.families}
              </h3>
              <p className="text-ivory/70 text-xs mt-2 max-w-xs mx-auto">
                We look forward to celebrating this joyous occasion in your gracious presence.
              </p>
            </div>

            <div className="p-6 space-y-4">
              {wedding.rsvp.contacts.map((contact) => (
                <div
                  key={contact.phoneClean}
                  className="bg-secondary/40 border-gold/25 flex items-center justify-between gap-3 rounded-2xl border p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-medium tracking-wide">
                      {contact.name}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs font-mono">
                      {contact.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${contact.phoneClean}`}
                      className="bg-primary text-ivory hover:bg-emerald-ink grid h-9 w-9 place-items-center rounded-full shadow-sm transition-colors"
                      title={`Call ${contact.name}`}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
