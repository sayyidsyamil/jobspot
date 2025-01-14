"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendJobs } from '@/lib/data'; // Import the sendJobs function
import { useUser } from '@clerk/nextjs'; // Import the useUser hook from Clerk
import Form from 'next/form';

export default function PostJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); // Get the current user from Clerk

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    timeline: '',
    contactNumber: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert('User not authenticated');
      setLoading(false);
      return;
    }

    // Construct the job data to match the Jobs type
    const jobData = {
      user_id: user.id, // Get the user_id from Clerk
      title: formData.title,
      description: formData.description,
      price_range: formData.budget,
      timeline: formData.timeline,
      contact_info: formData.contactNumber,
      created_at: new Date()
    };

    try {
      // Call the sendJobs function to insert the job data into the database
      console.log("skibidi before send",jobData );

      const formDataObj = new FormData();
      formDataObj.append('user_id', jobData.user_id);
      formDataObj.append('title', jobData.title);
      formDataObj.append('description', jobData.description);
      formDataObj.append('price_range', jobData.price_range);
      formDataObj.append('timeline', jobData.timeline);
      formDataObj.append('contact_info', jobData.contact_info);
      formDataObj.append('created_at', jobData.created_at.toISOString());

    //   await sendJobs(formDataObj);

    console.log()

      // Redirect to the jobs page after successful submission
      router.push('/jobs');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      alert('Error posting job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
        
        <Form action={sendJobs} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Title</label>
            <Input
              required
              name = "title"
              type = "string"
              placeholder="e.g., Website Development for Small Business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project Description</label>
            <Textarea
              required
              name = "description"
              placeholder="Describe your project requirements in detail..."
              className="h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Budget Range</label>
            <Input
              required
              name = "price_range"
              placeholder="e.g., $500-1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timeline</label>
            <Input
              required
              name = "timeline"
              placeholder="e.g., 2-3 weeks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
            <Input
              required
              type="tel"
              name = "contact_info"
              placeholder="e.g., +1234567890"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
