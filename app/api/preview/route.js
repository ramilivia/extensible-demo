import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get("slug");

  console.log('HYGRAPH_PREVIEW_SECRET ENV', process.env.HYGRAPH_PREVIEW_SECRET)
  console.log('HYGRAPH_PREVIEW_SECRET REQ', secret)
  console.log('Request URL:', request.url)

  if (secret !== process.env.HYGRAPH_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Get the cookie store
  const cookieStore = cookies();

  // Set custom preview cookie with cross-origin iframe support
  cookieStore.set({
    name: "hygraph_preview_enabled",
    value: "true",
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none", // Allow cookie in cross-origin iframes
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Also set a preview data cookie for additional context if needed
  cookieStore.set({
    name: "hygraph_preview_data",
    value: JSON.stringify({ 
      enabledAt: new Date().toISOString(),
      secret: secret.substring(0, 8) + '...' // Store partial secret for verification
    }),
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  // Redirect to the page
  const redirectUrl = slug === 'home' ? '/' : `/${slug || ''}`;
  
  console.log('Custom preview mode enabled, redirecting to:', redirectUrl);
  
  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectUrl,
    },
  });
}