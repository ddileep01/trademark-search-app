import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  // Simulate a search
  const results = query ? [
    { mark: 'Nike', status: 'Live/Registered', details: 'Class 45 - Footwear' },
    { mark: 'Adidas', status: 'Live/Registered', details: 'Class 25 - Apparel' }
  ] : [];

  return NextResponse.json(results);
}
