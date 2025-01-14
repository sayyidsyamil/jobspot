import { fetchJobs } from "@/lib/data";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"


export default async function Page() {
  const receivedData = await fetchJobs();
  console.log(receivedData);

  return (
    <div className="grid m-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {receivedData?.rows?.map((job) => (
        <Card key={job.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>Posted {job.created_at ? new Date(job.created_at).toLocaleDateString() : "Unknown date"}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-600 mb-4">{job.description}</p>
            <div className="space-y-2">
              <p className="text-sm"><strong>Budget:</strong> {job.price_range}</p>
              <p className="text-sm"><strong>Timeline:</strong> {job.timeline}</p>
            </div>
          </CardContent>
          <CardFooter>
            <a
              href={`https://wa.me/${job.contact_info}?text=Hi! I'm interested in your job posting: ${job.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Contact via WhatsApp
              </Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
