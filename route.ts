export async function POST(req: Request) {
  const body = await req.json();
  console.log('Received:', body);

  return new Response(JSON.stringify({ message: 'Plan received!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
