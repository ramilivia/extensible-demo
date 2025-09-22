import { cookies } from 'next/headers'

export async function GET(request) {
  // Get the cookie store
  const cookieStore = cookies();
  
  // Remove custom preview cookie
  cookieStore.delete('hygraph_preview_enabled');
  
  console.log('Custom preview mode disabled')
  
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/',
    },
  });
}