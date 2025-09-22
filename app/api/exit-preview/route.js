import { cookies } from 'next/headers'

export async function GET(request) {
  // Get the cookie store
  const cookieStore = cookies();
  
  // Remove custom preview cookies
  cookieStore.delete('hygraph_preview_enabled');
  cookieStore.delete('hygraph_preview_data');
  
  console.log('Custom preview mode disabled')
  
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/',
    },
  });
}