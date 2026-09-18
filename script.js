/**
 * ROYAL INDIAN TEMPLE WEDDING INVITATION - SCRIPT
 * Dr. Manjula & Dr. Rahul | 23 - 25 Nov 2026
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. ROYAL ENVELOPE OPENING
     ========================================================================== */
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const waxSealBtn = document.getElementById('waxSealBtn');
  const openInviteButton = document.getElementById('openInviteButton');

  function openEnvelope() {
    if (!envelopeOverlay) return;
    envelopeOverlay.classList.add('unfolded');
    // Start music on user interaction if not already playing
    if (!isPlaying) {
      toggleMusic();
    }
    // Launch celebratory petal burst
    triggerPetalBurst();
  }

  if (waxSealBtn) waxSealBtn.addEventListener('click', openEnvelope);
  if (openInviteButton) openInviteButton.addEventListener('click', openEnvelope);

  /* ==========================================================================
     2. LIVE COUNTDOWN TIMER TO 23 NOVEMBER 2026
     ========================================================================== */
  const targetWeddingDate = new Date('November 23, 2026 13:00:00').getTime();

  const daysElem = document.getElementById('days');
  const hoursElem = document.getElementById('hours');
  const minutesElem = document.getElementById('minutes');
  const secondsElem = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetWeddingDate - now;

    if (distance <= 0) {
      if (daysElem) daysElem.innerText = '00';
      if (hoursElem) hoursElem.innerText = '00';
      if (minutesElem) minutesElem.innerText = '00';
      if (secondsElem) secondsElem.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysElem) daysElem.innerText = String(days).padStart(2, '0');
    if (hoursElem) hoursElem.innerText = String(hours).padStart(2, '0');
    if (minutesElem) minutesElem.innerText = String(minutes).padStart(2, '0');
    if (secondsElem) secondsElem.innerText = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================================================
     3. WEBAUDIO SYNTHESIZER: TRADITIONAL SHEHNAI / TANPURA AMBIENT RAGA
     ========================================================================== */
  let audioCtx = null;
  let isPlaying = false;
  let synthInterval = null;
  let droneGain = null;
  let masterGain = null;

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const soundWave = document.getElementById('soundWave');

  // Traditional Raga Yaman / Bilawal notes in Hz (Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa')
  const scale = [
    261.63, // C4 (Sa)
    293.66, // D4 (Re)
    329.63, // E4 (Ga)
    369.99, // F#4 (Teevra Ma)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    493.88, // B4 (Ni)
    523.25, // C5 (Sa')
    587.33, // D5 (Re')
    659.25  // E5 (Ga')
  ];

  // Joyful traditional wedding melody sequence
  const melodyNotes = [
    { note: 4, dur: 0.5 }, { note: 2, dur: 0.5 }, { note: 3, dur: 0.7 }, { note: 4, dur: 0.9 },
    { note: 7, dur: 0.7 }, { note: 6, dur: 0.5 }, { note: 4, dur: 0.6 }, { note: 2, dur: 0.8 },
    { note: 0, dur: 0.6 }, { note: 2, dur: 0.5 }, { note: 4, dur: 0.7 }, { note: 2, dur: 0.5 },
    { note: 0, dur: 1.2 }, { note: 4, dur: 0.5 }, { note: 7, dur: 0.8 }, { note: 9, dur: 1.2 }
  ];

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playShehnaiNote(freq, duration) {
    if (!audioCtx || !isPlaying) return;
    
    // Create rich harmonic sound characteristic of double-reed Shehnai/Nadaswaram
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const oscFilter = audioCtx.createBiquadFilter();
    const noteGain = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc2.frequency.setValueAtTime(freq * 1.003, audioCtx.currentTime); // Subtle vibrato chorus

    // Formant filter to mimic woodwind resonance
    oscFilter.type = 'bandpass';
    oscFilter.frequency.setValueAtTime(1400, audioCtx.currentTime);
    oscFilter.Q.setValueAtTime(2.5, audioCtx.currentTime);

    const now = audioCtx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.08); // Gentle attack
    noteGain.gain.exponentialRampToValueAtTime(0.04, now + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(oscFilter);
    osc2.connect(oscFilter);
    oscFilter.connect(noteGain);
    noteGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  function startIndianWeddingMusic() {
    initAudio();
    if (!masterGain) {
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }

    // Tanpura Root Drone (C3 + G3)
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    droneGain = audioCtx.createGain();
    drone1.type = 'sawtooth';
    drone2.type = 'sine';
    drone1.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3
    drone2.frequency.setValueAtTime(196.00, audioCtx.currentTime); // G3

    const droneFilter = audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(450, audioCtx.currentTime);

    droneGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    drone1.connect(droneFilter);
    drone2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    drone1.start();
    drone2.start();

    // Melody Player loop
    let step = 0;
    function scheduleNextNote() {
      if (!isPlaying) return;
      const current = melodyNotes[step % melodyNotes.length];
      const freq = scale[current.note];
      playShehnaiNote(freq, current.dur);
      step++;
      synthInterval = setTimeout(scheduleNextNote, current.dur * 1000 + 120);
    }
    scheduleNextNote();
  }

  function stopIndianWeddingMusic() {
    isPlaying = false;
    if (synthInterval) clearTimeout(synthInterval);
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
    }
  }

  function toggleMusic() {
    if (!isPlaying) {
      isPlaying = true;
      startIndianWeddingMusic();
      if (audioToggleBtn) audioToggleBtn.classList.add('playing');
    } else {
      stopIndianWeddingMusic();
      if (audioToggleBtn) audioToggleBtn.classList.remove('playing');
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', toggleMusic);
  }

  /* ==========================================================================
     4. FLOATING PETALS & MARIGOLD CANVAS ANIMATION
     ========================================================================== */
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');
  let petalsEnabled = true;
  let particles = [];
  const petalToggleBtn = document.getElementById('petalToggleBtn');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const colors = [
    { fill: '#ff9a00', stroke: '#d97706' }, // Marigold Orange
    { fill: '#ffc107', stroke: '#f59e0b' }, // Marigold Golden Yellow
    { fill: '#e63946', stroke: '#9b111e' }, // Rose Crimson Red
    { fill: '#ffb703', stroke: '#e85d04' }, // Auspicious Haldi Gold
    { fill: '#ffd166', stroke: '#c99732' }  // Golden Sparkle
  ];

  class Petal {
    constructor(x, y, isBurst = false) {
      this.x = x ?? Math.random() * canvas.width;
      this.y = y ?? (isBurst ? canvas.height / 2 : Math.random() * -canvas.height);
      this.size = Math.random() * 9 + 7;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedY = isBurst ? (Math.random() * -6 + 2) : (Math.random() * 1.5 + 0.8);
      this.speedX = isBurst ? (Math.random() * 8 - 4) : (Math.random() * 1.5 - 0.75);
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.03 - 0.015;
      this.tilt = Math.random() * 10;
      this.tiltSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.angle) * 0.5;
      this.angle += this.angleSpeed;
      this.tilt += this.tiltSpeed;

      if (this.y > canvas.height + 20) {
        this.y = -20;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // Draw curved flower petal shape
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.55 + Math.sin(this.tilt) * 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.color.fill;
      ctx.globalAlpha = 0.82;
      ctx.fill();
      ctx.strokeStyle = this.color.stroke;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < 45; i++) {
    particles.push(new Petal());
  }

  function triggerPetalBurst() {
    for (let i = 0; i < 35; i++) {
      particles.push(new Petal(canvas.width / 2, canvas.height * 0.4, true));
    }
  }

  function animatePetals() {
    if (petalsEnabled) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
    }
    requestAnimationFrame(animatePetals);
  }
  animatePetals();

  if (petalToggleBtn) {
    petalToggleBtn.addEventListener('click', () => {
      petalsEnabled = !petalsEnabled;
      if (!petalsEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petalToggleBtn.style.opacity = '0.6';
      } else {
        petalToggleBtn.style.opacity = '1';
      }
    });
  }

  /* ==========================================================================
     5. TOAST NOTIFICATIONS & COPY ADDRESS
     ========================================================================== */
  const toastNotice = document.getElementById('toastNotice');
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.innerText = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = "Terapanth Bhawan, Udhna, Surat, Gujarat - 394210";
      navigator.clipboard.writeText(addressText).then(() => {
        showToast("✓ Venue address copied to clipboard!");
      }).catch(() => {
        showToast("Terapanth Bhawan, Udhna, Surat");
      });
    });
  }

  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("✓ Wedding invitation link copied!");
      }).catch(() => {
        showToast("Link ready to share!");
      });
    });
  }

  const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
  if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener('click', () => {
      const text = encodeURIComponent(
        `🌿 Auspicious Wedding Invitation 🌿\n\n` +
        `We cordially invite you to celebrate the wedding of:\n` +
        `💐 Dr. Manjula & Dr. Rahul 💐\n\n` +
        `📅 23 - 25 November 2026\n` +
        `📍 Terapanth Bhawan, Udhna, Surat\n` +
        `🗺️ Location: https://share.google/MuknIQ9mJxqA9zH63\n\n` +
        `RSVP:\n` +
        `Mr. Suresh Chandra Chaudhary: +91 7990650712\n` +
        `Mr. Makhan Lal Thakur: +91 9893633282\n\n` +
        `Please join us and confer your warmest blessings!\n` +
        window.location.href
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });
  }

  /* ==========================================================================
     6. INTERACTIVE BLESSINGS GUESTBOOK (LOCAL STORAGE)
     ========================================================================== */
  const blessingForm = document.getElementById('blessingForm');
  const blessingList = document.getElementById('blessingList');

  const defaultBlessings = [
    {
      name: "Chaudhary & Thakur Elders",
      attendance: "Joyfully Attending All Ceremonies",
      message: "May Lord Ganesha bestow boundless peace, eternal companionship, and infinite happiness upon Dr. Manjula and Dr. Rahul."
    },
    {
      name: "Dr. Ananya & Friends",
      attendance: "Joyfully Attending All Ceremonies",
      message: "Thrilled to celebrate both of our amazing doctors! Can't wait for Sangeet night and the Phere!"
    }
  ];

  function getStoredBlessings() {
    const saved = localStorage.getItem('wedding_blessings_manjula_rahul');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultBlessings;
      }
    }
    return defaultBlessings;
  }

  function renderBlessings() {
    if (!blessingList) return;
    const blessings = getStoredBlessings();
    blessingList.innerHTML = blessings.map(b => `
      <div class="blessing-item">
        <div class="b-guest-info">
          <span class="b-name"><i class="fa-solid fa-feather"></i> ${escapeHtml(b.name)}</span>
          <span class="b-attending">${escapeHtml(b.attendance)}</span>
        </div>
        <p class="b-text">"${escapeHtml(b.message)}"</p>
      </div>
    `).join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  if (blessingForm) {
    blessingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName').value.trim();
      const attendance = document.getElementById('guestAttendance').value;
      const message = document.getElementById('guestMessage').value.trim();

      if (!name || !message) return;

      const current = getStoredBlessings();
      current.unshift({ name, attendance, message });
      localStorage.setItem('wedding_blessings_manjula_rahul', JSON.stringify(current));

      renderBlessings();
      blessingForm.reset();
      showToast("🙏 Thank you! Your blessings have been warmly received.");
      triggerPetalBurst();
    });
  }

  renderBlessings();

});

/* ==========================================================================
   7. ADD TO CALENDAR (.ICS GENERATORS)
   ========================================================================== */
window.addToCalendar = function(title, startIso, endIso, location, description) {
  function formatIcsDate(isoStr) {
    const d = new Date(isoStr);
    return d.toISOString().replace(/-|:|\.\d+/g, '');
  }

  const startFormatted = formatIcsDate(startIso);
  const endFormatted = formatIcsDate(endIso);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr Manjula and Dr Rahul Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:Wedding: ${title} - Dr. Manjula & Dr. Rahul`,
    `DESCRIPTION:${description} | Venue: ${location}`,
    `LOCATION:${location}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  downloadIcsFile(icsContent, `${title.replace(/\s+/g, '_')}_Dr_Manjula_Weds_Dr_Rahul.ics`);
};

window.addFullWeddingToCalendar = function() {
  const events = [
    {
      title: 'Mehendi Ceremony',
      start: '20261123T130000Z',
      end: '20261123T180000Z',
      desc: 'Mehendi Ceremony of Dr. Manjula & Dr. Rahul'
    },
    {
      title: 'Haldi Carnival',
      start: '20261124T120000Z',
      end: '20261124T160000Z',
      desc: 'Haldi Carnival celebration'
    },
    {
      title: 'Sangeet Gala Night',
      start: '20261124T193000Z',
      end: '20261124T233000Z',
      desc: 'Sangeet Gala Night & Feast'
    },
    {
      title: 'Baarat & Sacred Phere (Wedding Ceremony)',
      start: '20261125T130000Z',
      end: '20261125T173000Z',
      desc: 'Baarat Aagman (1 PM) & Sacred Phere (3 PM)'
    },
    {
      title: 'Grand Wedding Reception & Vidaai',
      start: '20261125T190000Z',
      end: '20261125T230000Z',
      desc: 'Reception Dinner & Vidaai at Terapanth Bhawan'
    }
  ];

  let icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr Manjula and Dr Rahul Wedding//EN',
    'CALSCALE:GREGORIAN'
  ];

  events.forEach(ev => {
    icsLines.push('BEGIN:VEVENT');
    icsLines.push(`SUMMARY:${ev.title} - Dr. Manjula & Dr. Rahul Wedding`);
    icsLines.push(`DESCRIPTION:${ev.desc}`);
    icsLines.push(`LOCATION:Terapanth Bhawan, Udhna, Surat, Gujarat`);
    icsLines.push(`DTSTART:${ev.start}`);
    icsLines.push(`DTEND:${ev.end}`);
    icsLines.push('STATUS:CONFIRMED');
    icsLines.push('END:VEVENT');
  });

  icsLines.push('END:VCALENDAR');

  downloadIcsFile(icsLines.join('\r\n'), 'Dr_Manjula_and_Dr_Rahul_Full_Wedding_Calendar.ics');
};

function downloadIcsFile(content, filename) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
