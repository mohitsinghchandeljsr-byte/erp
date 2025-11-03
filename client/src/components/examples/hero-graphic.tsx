import { HeroGraphic } from "../hero-graphic";

export default function HeroGraphicExample() {
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-semibold mb-6">Hero Graphic</h2>
      <div className="max-w-3xl mx-auto">
        <HeroGraphic />
      </div>
    </div>
  );
}
