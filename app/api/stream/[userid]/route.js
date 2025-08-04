import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

export async function GET(request, { params }) {
  try {
  const { userid } = await params;

  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  const client = StreamChat.getInstance(apiKey, apiSecret);

  const user = await client.queryUsers({ id: userid });

  if (user.users.length === 0) {
    const newUser = {
      id: userid,
      name: `User ${userid}`,
      image: `https://getstream.io/random_png/?name=User+${userid}`,
    };

    const token = client.createToken(newUser.id);
    return NextResponse.json({ token }, { status: 201 });
  }
  return NextResponse.json({
    user: user.users[0],
    token: client.createToken(user.users[0].id),
  });
} catch (error) {
  console.error('Error in GET /api/stream/[userid]:', error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
}


