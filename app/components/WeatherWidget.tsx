"use client";

import { useState } from "react";

type WeatherData = {
  circuitName: string;
  airTempC: number;
  trackTempC: number;
  humidityPercent: number;
  rainProbabilityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  condition: "Dry & Sunny" | "Overcast" | "Light Rain" | "Torrential";
  gripLevel: "High" | "Medium" | "Low" | "Green Track";
};

const initialWeather: Record<string, WeatherData> = {
  zandvoort: {
    circuitName: "Circuit Zandvoort",
    airTempC: 22,
    trackTempC: 38,
    humidityPercent: 64,
    rainProbabilityPercent: 18,
    windSpeedKmh: 24,
    windDirection: "NW (290°)",
    condition: "Dry & Sunny",
    gripLevel: "Medium",
  },
  monza: {
    circuitName: "Autodromo Nazionale Monza",
    airTempC: 28,
    trackTempC: 44,
    humidityPercent: 52,
    rainProbabilityPercent: 5,
    windSpeedKmh: 11,
    windDirection: "SE (135°)",
    condition: "Dry & Sunny",
    gripLevel: "High",
  },
  spa: {
    circuitName: "Circuit de Spa-Francorchamps",
    airTempC: 18,
    trackTempC: 26,
    humidityPercent: 78,
    rainProbabilityPercent: 55,
    windSpeedKmh: 16,
    windDirection: "SW (215°)",
    condition: "Overcast",
    gripLevel: "Medium",
  },
};

export function WeatherWidget({ circuitSlug = "zandvoort" }: { circuitSlug?: string }) {
  const [data, setData] = useState<WeatherData>(initialWeather[circuitSlug] || initialWeather.zandvoort);
  const [simulatedRain, setSimulatedRain] = useState(false);

  const toggleRainSim = () => {
    setSimulatedRain((prev) => {
      const next = !prev;
      if (next) {
        setData((d) => ({
          ...d,
          condition: "Light Rain",
          trackTempC: Math.max(18, d.trackTempC - 12),
          humidityPercent: 88,
          rainProbabilityPercent: 85,
          gripLevel: "Low",
        }));
      } else {
        setData(initialWeather[circuitSlug] || initialWeather.zandvoort);
      }
      return next;
    });
  };

  return (
    <div className="aa-weather-widget" aria-label="Live track meteorological conditions">
      <div className="aa-weather-head">
        <div className="aa-weather-title">
          <span className="aa-live-pulse" />
          <b>TRACKSIDE METEOROLOGY</b>
        </div>
        <button
          type="button"
          onClick={toggleRainSim}
          className={`aa-sim-button ${simulatedRain ? "active" : ""}`}
          title="Simulate sudden track weather change"
        >
          {simulatedRain ? "🌦️ RAIN CELL ACTIVE" : "☀️ SIMULATE RAIN DROP"}
        </button>
      </div>

      <div className="aa-weather-grid">
        <div className="aa-weather-card">
          <span className="aa-weather-label">AIR TEMP</span>
          <strong className="aa-weather-val">{data.airTempC}°C</strong>
          <small>{(data.airTempC * 1.8 + 32).toFixed(0)}°F</small>
        </div>

        <div className="aa-weather-card highlight">
          <span className="aa-weather-label">TRACK SURFACE</span>
          <strong className="aa-weather-val">{data.trackTempC}°C</strong>
          <small className={data.trackTempC > 40 ? "warm" : ""}>
            {data.trackTempC > 45 ? "High Blistering Risk" : data.trackTempC < 25 ? "Slow Warm-Up" : "Optimal Window"}
          </small>
        </div>

        <div className="aa-weather-card">
          <span className="aa-weather-label">WIND</span>
          <strong className="aa-weather-val">{data.windSpeedKmh} <small>KM/H</small></strong>
          <small>{data.windDirection}</small>
        </div>

        <div className="aa-weather-card">
          <span className="aa-weather-label">RAIN RISK</span>
          <strong className={`aa-weather-val ${data.rainProbabilityPercent > 50 ? "rain-warning" : ""}`}>
            {data.rainProbabilityPercent}%
          </strong>
          <small>{data.condition}</small>
        </div>
      </div>

      <div className="aa-weather-impact">
        <span>STRATEGIC IMPACT:</span>
        <p>
          {simulatedRain
            ? "Track crossover point approaching. Inters window active (+8.5s over dry slicks). Teams watching radar closely."
            : `Track temp at ${data.trackTempC}°C favors starting on Medium C3 compound. Soft C4 tire degradation expected after 14 laps.`}
        </p>
      </div>
    </div>
  );
}
