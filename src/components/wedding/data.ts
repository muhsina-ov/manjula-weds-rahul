export interface ScheduleEvent {
  title: string;
  time: string;
  badge?: string;
  note?: string;
  dressCode?: string;
}

export interface DaySchedule {
  date: string; // e.g. "23 Nov 2026"
  dayName: string; // e.g. "Monday"
  events: ScheduleEvent[];
}

export interface ContactRSVP {
  name: string;
  phone: string;
  phoneClean: string;
}

export const wedding = {
  groom: {
    name: "Dr. Rahul",
    title: "Ophthalmologist",
    fullName: "Dr. Rahul",
    parents: "S/o Dharma & Suresh Chandra Chaudhary",
    grandparents: "Grand son of Smt. Chandkor & Lt. Lachhu Ram",
    note: "A calm, optimistic ophthalmologist who loves to travel, sweets, sports, & PS5, and has mastered the art of calming his overthinking bride.",
    image: "/images/groom.jpg",
  },
  bride: {
    name: "Dr. Manjula",
    title: "Dermatologist",
    fullName: "Dr. Manjula",
    parents: "D/o Amrika & Makhan Lal Thakur",
    grandparents: "Grand daughter of Lt. Sato bai & Lt. Itwari Ram",
    note: "A cheerful, extroverted dermatologist who loves to travel, hit the gym, explorer, enjoys Asian food, and lovingly annoy her groom. 🤭",
    image: "/images/bride.jpg",
  },
  story: {
    tagline: "Two doctors. Two personalities. One beautiful love story. ❤️",
    bond: "They bonded over their shared love for travel, music & food — and now, they’re ready to explore the greatest journey of all: life together. ✨",
    signature: "Dr. Rahul ♡ Dr. Manjula",
  },
  // Main wedding ceremony: 25 November 2026, Phere at 3:00 PM IST
  dateISO: "2026-11-25T15:00:00+05:30",
  endISO: "2026-11-25T23:30:00+05:30",
  dateLabel: "23 · 24 · 25 November 2026",
  mainDateLabel: "Wednesday, 25 November 2026",
  timeLabel: "Phere at 3:00 PM",
  muhurthamLabel: "Phere · 3:00 PM",
  schedule: [
    {
      date: "23 Nov 2026",
      dayName: "Monday",
      events: [
        {
          title: "Mehendi Ceremony",
          time: "1:00 PM onwards",
          badge: "Colors & Henna",
          note: "Beginning the celebrations with joy, fragrance of fresh henna, and musical rhythms.",
          dressCode: "Sage Green",
        },
      ],
    },
    {
      date: "24 Nov 2026",
      dayName: "Tuesday",
      events: [
        {
          title: "Haldi Carnival",
          time: "12:00 PM onwards",
          badge: "Yellow Splashes",
          note: "A sun-kissed celebration of love, turmeric blessings, and playful carnival vibes.",
          dressCode: "Yellow",
        },
        {
          title: "Sangeet Gala Night",
          time: "7:30 PM onwards",
          badge: "Music & Dance",
          note: "An electrifying evening of performances, melodies, dance, and joyous cheers.",
          dressCode: "Indo-Western",
        },
      ],
    },
    {
      date: "25 Nov 2026",
      dayName: "Wednesday",
      events: [
        {
          title: "Baarat Aagman",
          time: "1:00 PM onwards",
          badge: "Royal Welcome",
          note: "Welcoming the groom and the celebratory procession with dhol and pomp.",
          dressCode: "Traditional",
        },
        {
          title: "Phere",
          time: "3:00 PM onwards",
          badge: "Sacred Vows",
          note: "The sacred seven steps around the holy fire, uniting two souls forever.",
          dressCode: "Traditional",
        },
        {
          title: "Reception",
          time: "7:00 PM onwards",
          badge: "Celebration Dinner",
          note: "An evening of royal dining, heartfelt blessings, and memorable portraits.",
          dressCode: "Traditional",
        },
        {
          title: "Vidaai",
          time: "11:00 PM",
          badge: "Blessings & Farewell",
          note: "Sending off the newlyweds with tearful blessings and endless love.",
          dressCode: "Traditional",
        },
      ],
    },
  ] as DaySchedule[],
  rsvp: {
    families: "Chaudhary & Thakur Family",
    contacts: [
      {
        name: "Mr. Suresh Chandra Chaudhary",
        phone: "+91 79906 50712",
        phoneClean: "7990650712",
      },
      {
        name: "Mr. Makhan Lal Thakur",
        phone: "+91 98936 33282",
        phoneClean: "9893633282",
      },
      {
        name: "Mr. Rupesh Kumar Thakur",
        phone: "+91 89668 88436",
        phoneClean: "8966888436",
      },
      {
        name: "Mr. Rajat Chaudhary",
        phone: "+91 88665 82285",
        phoneClean: "8866582285",
      },
    ] as ContactRSVP[],
  },
  venue: {
    name: "Terapanth Bhavan",
    area: "Udhna, Surat, Gujarat",
    address: "Terapanth Bhavan, Udhna, Surat, Gujarat",
    mapsUrl: "https://share.google/MuknIQ9mJxqA9zH63",
    embedUrl:
      "https://maps.google.com/maps?q=Terapanth%20Bhavan%20Udhna%20Surat%20Gujarat&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  music: {
    src: "/audio/wedding-song.mp3",
    youtubeId: "FUlKPK9jPzM",
    shortsUrl: "https://youtube.com/shorts/FUlKPK9jPzM",
  },
};
