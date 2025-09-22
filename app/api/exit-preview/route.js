import { draftMode } from 'next/headers'

export async function GET(request) {
  // Disable Draft Mode
  draftMode().disable()
  
  console.log('Draft mode disabled')
  
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/',
    },
  });
}