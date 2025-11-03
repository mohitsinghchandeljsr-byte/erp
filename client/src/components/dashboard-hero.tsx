import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeroProps {
  name: string;
  subtitle: string;
  initials: string;
  avatarUrl?: string;
}

export function DashboardHero({ name, subtitle, initials, avatarUrl }: DashboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card">
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="hero-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.03 }} />
            </linearGradient>
            <linearGradient id="hero-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.02 }} />
            </linearGradient>
          </defs>
          
          <circle cx="200" cy="100" r="150" fill="url(#hero-grad1)" className="animate-pulse" style={{ animationDuration: "4s" }} />
          <circle cx="1000" cy="300" r="180" fill="url(#hero-grad2)" className="animate-pulse" style={{ animationDuration: "5s" }} />
          <circle cx="600" cy="50" r="100" fill="url(#hero-grad1)" className="animate-pulse" style={{ animationDuration: "6s" }} />
          
          <path
            d="M 0 250 Q 300 200 600 250 T 1200 250"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.1"
            fill="none"
          />
          <path
            d="M 0 280 Q 300 230 600 280 T 1200 280"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.08"
            fill="none"
          />
          
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1200}
              cy={Math.random() * 400}
              r={Math.random() * 4 + 2}
              fill="hsl(var(--primary))"
              fillOpacity={Math.random() * 0.3}
            />
          ))}
        </svg>
      </div>
      
      <div className="relative p-8">
        <div className="flex items-end gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} />
            ) : (
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="pb-2">
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
