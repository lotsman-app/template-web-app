// Answers 200 with a small JSON body. Reads no environment variable and needs no database.
export const dynamic = 'force-dynamic';

export function GET(): Response {
  return Response.json({ status: 'ok' });
}
