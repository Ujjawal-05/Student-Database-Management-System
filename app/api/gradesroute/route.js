import connectToDatabase from '@/lib/mongodb';
import Student from '@/models/Stud';
import { NextResponse } from 'next/server';
export async function PUT(req) {
    await connectToDatabase();
    const { Roll_no, Grade } = await req.json();

    const updatedStudent = await Student.findOneAndUpdate(
        { Roll_no },
        { Grade },
        { new: true }
    );

    if (!updatedStudent) {
        return new Response(JSON.stringify({ message: "Student not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ message: "Grade updated successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}