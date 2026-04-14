import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-1.5">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-blue-900">InternTrust</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <span className="text-muted-foreground">Recruitment Fraud Detection</span>
        </nav>
      </div>
    </header>
  );
}
