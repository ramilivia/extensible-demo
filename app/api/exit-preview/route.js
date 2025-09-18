import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request) {
  // Disable Draft Mode
  draftMode().disable()

  return NextResponse.redirect(new URL('/', request.url))
}