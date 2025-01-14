'use server';

import { sql } from '@vercel/postgres';
import { Jobs } from '@/lib/definition';
import {z} from 'zod';
import { currentUser } from '@clerk/nextjs/server';


const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    price_range: z.string(),
    timeline: z.string(),
    contact_info: z.string(),
})


export async function fetchJobs() {
  try {
    const data = await sql<Jobs>`
  SELECT * FROM Jobs
  ORDER BY created_at DESC;
`;
    console.log("data", data);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest jobs.');
  }
}

export async function sendJobs(formData: FormData) {

  console.log("data before",formData);
  const user = await currentUser();
  const {title, description, price_range, timeline,contact_info} = formSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    price_range: formData.get('price_range'),
    timeline: formData.get('timeline'),
    contact_info: formData.get('contact_info'),
  })

  console.log("data after",title,timeline);

    sql`
      INSERT INTO Jobs (user_id, title, description, price_range, timeline, contact_info)
      VALUES (${user?.id}, ${title}, ${description}, ${price_range}, 
              ${timeline}, ${contact_info});
    `;
}
