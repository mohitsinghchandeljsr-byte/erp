export function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.05 }} />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.4 }} />
        </linearGradient>
      </defs>
      
      {/* Background circles */}
      <circle cx="200" cy="150" r="120" fill="url(#grad1)" className="animate-pulse" style={{ animationDuration: "4s" }} />
      <circle cx="600" cy="400" r="100" fill="url(#grad1)" className="animate-pulse" style={{ animationDuration: "5s" }} />
      
      {/* Abstract shapes representing education */}
      <rect x="150" y="200" width="200" height="250" rx="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
      <rect x="160" y="210" width="180" height="30" rx="4" fill="url(#grad2)" />
      <rect x="160" y="260" width="120" height="8" rx="4" fill="hsl(var(--muted))" />
      <rect x="160" y="280" width="160" height="8" rx="4" fill="hsl(var(--muted))" />
      <rect x="160" y="300" width="140" height="8" rx="4" fill="hsl(var(--muted))" />
      
      {/* Floating elements */}
      <g className="animate-bounce" style={{ animationDuration: "3s" }}>
        <circle cx="450" cy="180" r="40" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path d="M 450 160 L 450 200 M 430 180 L 470 180" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Document stack */}
      <g transform="translate(500, 250)">
        <rect x="0" y="0" width="150" height="180" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        <rect x="10" y="15" width="130" height="6" rx="3" fill="hsl(var(--primary))" fillOpacity="0.3" />
        <rect x="10" y="30" width="100" height="6" rx="3" fill="hsl(var(--muted))" />
        <rect x="10" y="45" width="120" height="6" rx="3" fill="hsl(var(--muted))" />
        <rect x="10" y="60" width="110" height="6" rx="3" fill="hsl(var(--muted))" />
        
        <circle cx="75" cy="120" r="25" fill="hsl(var(--primary))" fillOpacity="0.2" />
        <path d="M 65 120 L 72 127 L 85 112" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      
      {/* Decorative dots */}
      <circle cx="100" cy="450" r="6" fill="hsl(var(--primary))" fillOpacity="0.3" />
      <circle cx="120" cy="470" r="4" fill="hsl(var(--primary))" fillOpacity="0.5" />
      <circle cx="700" cy="100" r="8" fill="hsl(var(--primary))" fillOpacity="0.3" />
      <circle cx="680" cy="120" r="5" fill="hsl(var(--primary))" fillOpacity="0.4" />
    </svg>
  );
}
