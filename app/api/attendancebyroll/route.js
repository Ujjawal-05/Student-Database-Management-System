import connectToDatabase from '@/lib/mongodb';
import Attendance from '@/models/Attd';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const roll = searchParams.get("roll");

  if (!roll) {
    return NextResponse.json({ message: "Roll number missing" }, { status: 400 });
  }

  try {
    const records = await Attendance.find({ Roll_no: roll }).sort({ date: 1 }); // Sorted by date
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching records" }, { status: 500 });
  }
}
