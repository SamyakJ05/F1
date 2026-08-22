import { AtlasShell } from "../components/AtlasShell";

const systems = [
  ["01", "FRONT WING", "The first device to meet the air. It sets up the flow that every downstream surface receives."],
  ["02", "FLOOR", "The principal source of load. Its shape manages pressure beneath the car while its edges defend that flow."],
  ["03", "SUSPENSION", "Not just a mechanical link. It controls how consistently the aero platform meets the road."],
  ["04", "REAR WING", "A final lever for balance: useful for stabilising the rear axle, costly when drag starts to dominate."],
];

export default function CarLabPage() {
  return <AtlasShell><section className="car-lab-hero"><div><p className="section-kicker"><span>02</span> AA–01 CONCEPT MACHINE</p><h1>Every surface<br /><em>has a job.</em></h1><p>A fictional open-wheel machine built to expose the relationships between airflow, balance and driver confidence.</p><small>ORIGINAL 3D ILLUSTRATION</small></div><div className="car-lab-stage"><img src="/media/apex-racecar-hero.png" alt="Apex Atlas open-wheel concept car on a wet circuit" /></div></section><section className="systems-section"><p className="section-kicker"><span>03</span> MACHINE SYSTEMS</p><div className="systems-list">{systems.map(([number, title, text]) => <article key={title}><span>{number}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section><section className="car-lab-note"><span>AA–01 PRINCIPLE</span><h2>Performance is not a part.<br /><em>It is a conversation.</em></h2><p>A change at the front wing affects the floor; a change in ride height affects both. The quickest setup is the one whose systems agree.</p></section></AtlasShell>;
}
