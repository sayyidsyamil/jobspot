"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Form from 'next/form'


export default function PostJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    timeline: '',
    contactNumber: ''
  });

  const handleSubmit = async (e:any) => {
    // e.preventDefault();
    setLoading(true);

    console.log(formData);

    try {
    

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
        <Form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Title</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Website Development for Small Business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Project Description</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project requirements in detail..."
              className="h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Budget Range</label>
            <Input
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="e.g., $500-1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timeline</label>
            <Input
              required
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              placeholder="e.g., 2-3 weeks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
            <Input
              required
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
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