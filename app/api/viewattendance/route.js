import connectToDatabase from '@/lib/mongodb';
import Attendance from '@/models/Attd';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ message: "Date is required" }, { status: 400 });
  }

  const records = await Attendance.find({ date });

  return NextResponse.json(records);
}
