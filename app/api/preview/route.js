import { draftMode, cookies } from "next/headers";

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

  // Enable draft mode which sets the initial cookie
  const draft = draftMode();
  draft.enable();

  // Get the cookie store
  const cookieStore = cookies();

  // Get the draft mode cookie that was just set
  const draftCookie = cookieStore.get("__prerender_bypass");

  // If we have the cookie, update it with cross-origin iframe support
  if (draftCookie?.value) {
    cookieStore.set({
      name: "__prerender_bypass",
      value: draftCookie.value,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none", // Allow cookie in cross-origin iframes
    });
  }

  // Redirect to the page
  const redirectUrl = slug === 'home' ? '/' : `/${slug || ''}`;
  
  console.log('Draft mode enabled, redirecting to:', redirectUrl);
  
  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectUrl,
    },
  });
}