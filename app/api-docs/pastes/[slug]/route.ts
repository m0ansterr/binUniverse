import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/pastes/[slug] - Get a specific paste by slug
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string; }> }
) {
  try {
    const resolvedParams = await context.params;
    const slug = resolvedParams.slug;

    const { data, error } = await supabase
      .from('pastes')
      .select('*') // Select all fields for a full paste object
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/pastes/[slug] - Update an existing paste
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string; }> }
) {
  try {
    const resolvedParams = await context.params;
    const slug = resolvedParams.slug;
    const body = await request.json();
    const { content, language, title } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('pastes')
      .update({ content: content.trim(), language, title: title || null })
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON or server error' }, { status: 400 });
  }
}

// DELETE /api/pastes/[slug] - Delete a paste
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string; }> }
) {
  try {
    const resolvedParams = await context.params;
    const slug = resolvedParams.slug;

    const { error, count } = await supabase
      .from('pastes')
      .delete()
      .eq('slug', slug)
      .select(); // Use select() to get data back and check if a row was deleted

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If count is 0, no row was deleted, meaning the paste was not found
    if (count === 0) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Paste deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
