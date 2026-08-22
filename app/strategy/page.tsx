import { StrategyLab } from "../ApexExperience";
import { AtlasShell } from "../components/AtlasShell";

export default function StrategyPage() {
  return <AtlasShell><section className="atlas-hero strategy-hero"><p className="section-kicker"><span>04</span> STRATEGY STUDIO</p><h1>Think in<br /><em>race distance.</em></h1><p>The pass is only the visible part of strategy. The real decision begins with tyre life, traffic, pit loss and the number of laps still available to make a move pay.</p></section><section className="strategy-workspace"><StrategyLab /><div className="strategy-explainer"><article><span>01</span><h2>CREATE AN OPTION</h2><p>A good first stint protects choices. Stay close enough to cover a rival, but avoid spending the tyre too early.</p></article><article><span>02</span><h2>FIND CLEAN AIR</h2><p>Fresh tyres only work when they can breathe. The out-lap must have enough space to turn potential pace into real time.</p></article><article><span>03</span><h2>CONVERT THE WINDOW</h2><p>Once the rival responds, the decision is measured in the total pit cycle—not the moment either car stops.</p></article></div></section></AtlasShell>;
}
