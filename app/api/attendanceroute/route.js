import connectToDatabase from "@/lib/mongodb";
import Attendance from "@/models/Attd";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { attendance } = await req.json();

    if (!Array.isArray(attendance)) {
      return NextResponse.json({ message: "Invalid attendance format" }, { status: 400 });
    }

    const bulkOps = attendance.map(entry => ({
      updateOne: {
        filter: { Roll_no: entry.Roll_no, date: entry.date },
        update: { $set: entry },
        upsert: true,
      }
    }));

    await Attendance.bulkWrite(bulkOps);

    return NextResponse.json({ message: "Attendance submitted successfully" });
  } catch (err) {
    console.error("Error submitting attendance:", err);
    return NextResponse.json({ message: "Error submitting attendance" }, { status: 500 });
  }
}
