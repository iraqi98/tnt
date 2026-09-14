// Semicircular gauge track: centered at (60,65), radius 50, sweeping from
// 180deg (10,65) to 0deg (110,65) through the top. `fraction` (0-1) selects
// how far around that sweep the value arc's endpoint sits.
function describeGaugeArc(fraction: number) {
  const cx = 60;
  const cy = 65;
  const r = 50;
  const clamped = Math.min(1, Math.max(0, fraction));
  const angleDeg = 180 - clamped * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = cx + r * Math.cos(angleRad);
  const y = cy - r * Math.sin(angleRad);
  return `M10 65 A50 50 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
}

export function RpmGauge({ fraction = 0.5375 }: { fraction?: number }) {
  return (
    <svg viewBox="0 0 120 70">
      <path
        d="M10 65 A50 50 0 0 1 110 65"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d={describeGaugeArc(fraction)}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <circle cx="60" cy="65" r="3" fill="var(--ink-dim)" />
    </svg>
  );
}

export function TempGauge({ fraction = 0.517 }: { fraction?: number }) {
  return (
    <svg viewBox="0 0 120 70">
      <path
        d="M10 65 A50 50 0 0 1 110 65"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d={describeGaugeArc(fraction)}
        fill="none"
        stroke="var(--amber)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <circle cx="60" cy="65" r="3" fill="var(--ink-dim)" />
    </svg>
  );
}

const WAVEFORM_POINTS =
  "0,30 20,30 28,10 36,46 44,30 70,30 78,18 86,38 94,30 130,30 138,8 146,48 154,30 190,30 198,20 206,36 214,30 250,30 258,12 266,44 274,30 300,30";

export function Waveform({ animated = true }: { animated?: boolean }) {
  const shifted = WAVEFORM_POINTS.split(" ")
    .map((pair) => {
      const [x, y] = pair.split(",").map(Number);
      return `${x + 300},${y}`;
    })
    .join(" ");

  return (
    <div className={`waveform${animated ? " waveform-scroll" : ""}`}>
      <svg viewBox="0 0 600 54" preserveAspectRatio="none">
        <polyline
          points={`${WAVEFORM_POINTS} ${shifted}`}
          fill="none"
          stroke="var(--ok)"
          strokeWidth={1.6}
        />
      </svg>
    </div>
  );
}

export function DynoChart() {
  return (
    <svg viewBox="0 0 360 190">
      <line
        x1="30"
        y1="10"
        x2="30"
        y2="160"
        stroke="var(--line-strong)"
        strokeWidth={1}
      />
      <line
        x1="30"
        y1="160"
        x2="350"
        y2="160"
        stroke="var(--line-strong)"
        strokeWidth={1}
      />
      <path
        d="M30 150 C 90 148, 150 120, 210 95 C 260 75, 300 62, 340 58"
        fill="none"
        stroke="var(--ink-faint)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <path
        d="M30 150 C 90 140, 150 100, 210 65 C 260 42, 300 28, 340 22"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2.5}
      />
      <circle cx="340" cy="22" r="3.5" fill="var(--accent)" />
      <circle cx="340" cy="58" r="3.5" fill="var(--ink-faint)" />
      <text x="34" y="24" fill="var(--accent)" fontSize="10" fontFamily="JetBrains Mono, monospace">
        tuned
      </text>
      <text x="34" y="176" fill="var(--ink-faint)" fontSize="10" fontFamily="JetBrains Mono, monospace">
        stock
      </text>
    </svg>
  );
}
