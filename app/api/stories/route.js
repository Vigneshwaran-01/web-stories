import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Replace these with your actual Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);





export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  try {
    // Construct the query with optional category filter
    let query = supabase.from('stories').select('*').order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    // Fetch stories from Supabase
    const { data: stories, error } = await query;

    if (error) {
      throw error;
    }

    // Return the stories as JSON response
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
