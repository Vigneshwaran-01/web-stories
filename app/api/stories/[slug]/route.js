import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

// Initialize the Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;  // Your Supabase URL (supabase.co)
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;  // Your Supabase API key (from the .env file)
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request, context) {
  try {
    // Await params before accessing them
    const { slug } = await context.params;  // Await the params to get slug

    // Query to fetch the story and associated pages from Supabase
    const { data: stories, error } = await supabase
      .from('stories')  // The table name is "stories"
      .select(`
        id,
        title,
        slug,
        category,
        author,
        thumbnail,
        created_at,
        pages:story_pages(
          page_number,
          title,
          description,
          media_type,
          media_url
        )
      `)
      .eq('slug', slug);  // Filter by the slug

    // Check for errors
    if (error) {
      throw error;
    }

    // If no stories were found
    if (!stories || stories.length === 0) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const story = stories[0];
    // Return the story with its pages
    return NextResponse.json(story);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
