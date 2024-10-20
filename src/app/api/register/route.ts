import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const response=NextResponse.json({ message: 'User registered successfully' ,email});
  response.cookies.set('token', token, { httpOnly: true })
  return response
}
