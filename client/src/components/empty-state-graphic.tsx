interface EmptyStateGraphicProps {
  type: "calendar" | "books" | "notes" | "exams";
}

export function EmptyStateGraphic({ type }: EmptyStateGraphicProps) {
  if (type === "calendar") {
    return (
      <svg
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-xs mx-auto"
      >
        <rect x="30" y="30" width="140" height="100" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        <rect x="30" y="30" width="140" height="25" rx="8" fill="hsl(var(--primary))" fillOpacity="0.1" />
        <rect x="30" y="30" width="140" height="8" rx="8" fill="hsl(var(--primary))" />
        
        <circle cx="55" cy="20" r="4" fill="hsl(var(--muted-foreground))" />
        <circle cx="145" cy="20" r="4" fill="hsl(var(--muted-foreground))" />
        <line x1="55" y1="15" x2="55" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        <line x1="145" y1="15" x2="145" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={40 + i * 18} y="65" width="14" height="14" rx="2" fill="hsl(var(--muted))" fillOpacity="0.3" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={40 + i * 18} y="85" width="14" height="14" rx="2" fill="hsl(var(--muted))" fillOpacity="0.3" />
        ))}
        
        <circle cx="100" cy="105" r="20" fill="hsl(var(--primary))" fillOpacity="0.1" />
        <path d="M 90 105 L 97 112 L 110 97" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  if (type === "books") {
    return (
      <svg
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-xs mx-auto"
      >
        <rect x="40" y="60" width="35" height="70" rx="3" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <rect x="75" y="50" width="35" height="80" rx="3" fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <rect x="110" y="55" width="35" height="75" rx="3" fill="hsl(var(--primary))" fillOpacity="0.25" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        
        <line x1="47" y1="70" x2="47" y2="125" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="82" y1="60" x2="82" y2="125" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="117" y1="65" x2="117" y2="125" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
        
        <path d="M 140 35 L 150 25 L 160 35 L 150 45 Z" fill="hsl(var(--primary))" fillOpacity="0.4" />
        <circle cx="30" cy="40" r="8" fill="hsl(var(--primary))" fillOpacity="0.3" />
      </svg>
    );
  }

  if (type === "notes") {
    return (
      <svg
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-xs mx-auto"
      >
        <rect x="50" y="30" width="100" height="90" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        <line x1="65" y1="50" x2="135" y2="50" stroke="hsl(var(--muted))" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="65" x2="120" y2="65" stroke="hsl(var(--muted))" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="80" x2="130" y2="80" stroke="hsl(var(--muted))" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="95" x2="110" y2="95" stroke="hsl(var(--muted))" strokeWidth="2" strokeLinecap="round" />
        
        <circle cx="160" cy="110" r="20" fill="hsl(var(--primary))" />
        <path d="M 155 110 L 160 110 L 160 105 M 160 110 L 165 105" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-xs mx-auto"
    >
      <rect x="40" y="40" width="120" height="80" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
      <circle cx="100" cy="70" r="15" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="2" />
      <path d="M 95 70 L 100 75 L 105 65" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="60" y="95" width="80" height="6" rx="3" fill="hsl(var(--muted))" />
      <rect x="70" y="105" width="60" height="6" rx="3" fill="hsl(var(--muted))" fillOpacity="0.6" />
    </svg>
  );
}
