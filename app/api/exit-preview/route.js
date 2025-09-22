import { cookies } from 'next/headers'

export async function GET(request) {
  // Get the cookie store
  const cookieStore = cookies();
  
  // Remove custom preview cookie
  cookieStore.delete('hygraph_preview_enabled');
  
  console.log('Custom preview mode disabled')
  
  // Get the referrer to redirect back to the current page
  const referer = request.headers.get('referer');
  let redirectUrl = referer || '/';
  
  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectUrl,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}