import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/pastes/[slug]/raw - Get raw paste content
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string; }> }
) {
  try {
    const resolvedParams = await context.params;
    const slug = resolvedParams.slug;

    const { data, error } = await supabase
      .from('pastes')
      .select('content')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 })
    }

    return new NextResponse(data.content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
