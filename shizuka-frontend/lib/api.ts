export const getBackendBaseUrl = () => {
  // Ensure this is set in Vercel env (NEXT_PUBLIC_BACKEND_BASE_URL)
  const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || '';
  if (!url) {
    throw new Error(
      'Missing NEXT_PUBLIC_BACKEND_BASE_URL. Configure it in your environment (Vercel/ .env.local).'
    );
  }
  return url.replace(/\/+$/, '');
};

export async function postEmailReply(request: {
  emailContent: string;
  tone: string;
}) {
  const baseUrl = getBackendBaseUrl();
  const res = await fetch(`${baseUrl}/api/email/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Backend error (${res.status}): ${text}`);
  }

  return (await res.text()).toString();
}

