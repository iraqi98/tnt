"use client";

import { useEffect, useRef, useState } from "react";
import { RpmGauge, TempGauge, Waveform } from "@/components/icons/Gauges";

const RPM_DEFAULT = 2150;
const RPM_MIN = 780;
const RPM_MAX = 3200;
const RPM_DOMAIN_MIN = 0;
const RPM_DOMAIN_MAX = 4000;

const TEMP_DEFAULT = 91;
const TEMP_MIN = 88;
const TEMP_MAX = 94;
const TEMP_DOMAIN_MIN = 60;
const TEMP_DOMAIN_MAX = 120;

const RETARGET_MS_MIN = 2000;
const RETARGET_MS_MAX = 3000;
const TWEEN_MS = 800;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function toFraction(value: number, domainMin: number, domainMax: number) {
  return (value - domainMin) / (domainMax - domainMin);
}

function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function DiagnosticPanel({ lang }: { lang: "ar" | "en" }) {
  const [reducedMotion, setReducedMotion] = useState(getPrefersReducedMotion);
  const [rpm, setRpm] = useState(RPM_DEFAULT);
  const [temp, setTemp] = useState(TEMP_DEFAULT);

  const rpmCurrentRef = useRef(RPM_DEFAULT);
  const rpmStartRef = useRef(RPM_DEFAULT);
  const rpmTargetRef = useRef(RPM_DEFAULT);

  const tempCurrentRef = useRef(TEMP_DEFAULT);
  const tempStartRef = useRef(TEMP_DEFAULT);
  const tempTargetRef = useRef(TEMP_DEFAULT);

  const tweenStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const retargetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    function tick(now: number) {
      if (tweenStartRef.current === null) tweenStartRef.current = now;
      const elapsed = now - tweenStartRef.current;
      const t = Math.min(1, elapsed / TWEEN_MS);
      const eased = easeInOutCubic(t);

      const nextRpm =
        rpmStartRef.current + (rpmTargetRef.current - rpmStartRef.current) * eased;
      const nextTemp =
        tempStartRef.current +
        (tempTargetRef.current - tempStartRef.current) * eased;

      rpmCurrentRef.current = nextRpm;
      tempCurrentRef.current = nextTemp;
      setRpm(nextRpm);
      setTemp(nextTemp);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    }

    function startTween() {
      tweenStartRef.current = null;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function pickNewTargets() {
      rpmStartRef.current = rpmCurrentRef.current;
      rpmTargetRef.current = randomBetween(RPM_MIN, RPM_MAX);
      tempStartRef.current = tempCurrentRef.current;
      tempTargetRef.current = randomBetween(TEMP_MIN, TEMP_MAX);
      startTween();
    }

    function scheduleNext() {
      const delay = randomBetween(RETARGET_MS_MIN, RETARGET_MS_MAX);
      retargetTimeoutRef.current = setTimeout(() => {
        pickNewTargets();
        scheduleNext();
      }, delay);
    }

    function stop() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (retargetTimeoutRef.current !== null) {
        clearTimeout(retargetTimeoutRef.current);
        retargetTimeoutRef.current = null;
      }
    }

    function handleVisibility() {
      if (document.visibilityState === "hidden") {
        stop();
      } else {
        scheduleNext();
      }
    }

    if (document.visibilityState === "visible") {
      scheduleNext();
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  const displayRpm = Math.round(reducedMotion ? RPM_DEFAULT : rpm).toLocaleString(
    "en-US",
  );
  const displayTemp = Math.round(reducedMotion ? TEMP_DEFAULT : temp);

  const rpmFraction = toFraction(
    reducedMotion ? RPM_DEFAULT : rpm,
    RPM_DOMAIN_MIN,
    RPM_DOMAIN_MAX,
  );
  const tempFraction = toFraction(
    reducedMotion ? TEMP_DEFAULT : temp,
    TEMP_DOMAIN_MIN,
    TEMP_DOMAIN_MAX,
  );

  return (
    <div className="panel" aria-hidden="true">
      <div className="panel-head">
        <span>OBD-II · LIVE SCAN</span>
        <div className="panel-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="gauges">
        <div className="gauge">
          <RpmGauge fraction={rpmFraction} />
          <div className="gauge-value">{displayRpm}</div>
          <div className="gauge-label">RPM</div>
        </div>
        <div className="gauge">
          <TempGauge fraction={tempFraction} />
          <div className="gauge-value">{displayTemp}°C</div>
          <div className="gauge-label">
            {lang === "ar" ? "حرارة المحرك" : "coolant temp"}
          </div>
        </div>
      </div>
      <Waveform animated={!reducedMotion} />
    </div>
  );
}
