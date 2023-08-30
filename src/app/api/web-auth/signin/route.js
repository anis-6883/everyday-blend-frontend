// import { serialize } from 'cookie';
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24; // 1 Day;

export async function POST(request, context) {
  const { email, password, provider } = await request.json();
  let serialized = null;

  return NextResponse.json({ status: true, email: email, provider: provider });

  // const { data } = await qrCodeUrl.post('/api/v1/user/signin', {
  //     email,
  //     password,
  //     provider
  // });

  // if (data.status) {
  //     serialized = serialize('_token', data.accessToken, {
  //         httpOnly: true,
  //         secure: true,
  //         sameSite: 'strict',
  //         maxAge: MAX_AGE,
  //         path: '/'
  //     });
  // }

  // if (data.status) {
  //     return NextResponse.json(
  //         { status: true, msg: 'Login Successfully!' },
  //         {
  //             status: 200,
  //             headers: {
  //                 'Set-Cookie': serialized
  //             }
  //         }
  //     );
  // } else {
  //     return NextResponse.json({ status: false, message: data?.message });
  // }
}
