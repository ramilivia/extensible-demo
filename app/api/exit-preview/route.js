import { redirect } from 'next/navigation'
import { draftMode } from 'next/headers'

export async function GET(request) {
  // Disable Draft Mode
  draftMode().disable()
  
  console.log('Draft mode disabled')
  redirect('/')
}