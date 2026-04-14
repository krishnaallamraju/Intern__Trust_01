import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Globe, CheckCircle } from "lucide-react";

const portals = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/jobs/",
    description: "The world's largest professional network for jobs and internships.",
  },
  {
    name: "Indeed",
    url: "https://www.indeed.com/",
    description: "Comprehensive job search engine with millions of listings.",
  },
  {
    name: "Glassdoor",
    url: "https://www.glassdoor.com/",
    description: "Job search with company reviews and salary insights.",
  },
  {
    name: "Internshala",
    url: "https://internshala.com/",
    description: "Popular platform specifically for internships and trainings.",
  },
  {
    name: "Handshake",
    url: "https://joinhandshake.com/",
    description: "The #1 way for college students to find jobs and internships.",
  },
];

export default function TrustedPortals() {
  return (
    <Card className="w-full max-w-4xl mx-auto border-blue-100 shadow-sm bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Globe className="h-5 w-5 text-blue-600" />
          Trusted Internship Portals
        </CardTitle>
        <CardDescription>
          Always use verified platforms to search for legitimate internship opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portals.map((portal) => (
            <a
              key={portal.name}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-blue-900 flex items-center gap-1">
                  {portal.name}
                  <CheckCircle className="h-3 w-3 text-blue-500" />
                </h4>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-xs text-slate-600 leading-tight">
                {portal.description}
              </p>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
