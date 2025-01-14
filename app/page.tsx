import { Button } from "@/components/ui/button";
import { BriefcaseIcon, Users2Icon, ClockIcon, DollarSignIcon } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find the Perfect Freelance Job, Instantly
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect directly with clients through WhatsApp. No middleman, no fees, just opportunities.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/post">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Post a Job
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobSpot?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BriefcaseIcon className="w-8 h-8 text-green-600" />}
              title="Easy Job Posting"
              description="Post your job in minutes with our simple and intuitive interface"
            />
            <FeatureCard
              icon={<Users2Icon className="w-8 h-8 text-green-600" />}
              title="Direct Contact"
              description="Connect directly with clients or freelancers via WhatsApp"
            />
            <FeatureCard
              icon={<ClockIcon className="w-8 h-8 text-green-600" />}
              title="Quick Response"
              description="Get responses within hours, not days"
            />
            <FeatureCard
              icon={<DollarSignIcon className="w-8 h-8 text-green-600" />}
              title="No Hidden Fees"
              description="100% free platform - no commission, no hidden charges"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="10,000+" label="Active Jobs" />
            <StatCard number="50,000+" label="Freelancers" />
            <StatCard number="95%" label="Success Rate" />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}