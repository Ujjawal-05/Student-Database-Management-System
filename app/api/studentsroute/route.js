import connectToDatabase from '@/lib/mongodb';
import Student from '@/models/Stud';
import { NextResponse } from 'next/server';

export async function handler(req) {
    const method = req.method;

    await connectToDatabase();

    try {
        switch (method) {
            case 'GET': {
                const students = await Student.find({});
                return NextResponse.json(students, { status: 200 });
            }

            case 'POST': {
                const body = await req.json();
                const existingStudent = await Student.findOne({ Roll_no: body.Roll_no });

                if (existingStudent) {
                    return NextResponse.json({ message: 'Duplication' }, { status: 201 });
                }

                const { Roll_no, Name, Branch } = body;
                const newStudent = new Student({ Roll_no, Name, Branch });
                await newStudent.save();

                return NextResponse.json({ message: 'Student created successfully' }, { status: 201 });
            }

            case 'PUT': {
                const { originalRoll, updatedData } = await req.json();

                // Only check for duplication if the roll number is changing
                if (originalRoll !== updatedData.Roll_no) {
                    const duplicate = await Student.findOne({ Roll_no: updatedData.Roll_no });
                    if (duplicate) {
                        return NextResponse.json({ message: "Duplication" }, { status: 409 }); // Conflict
                    }
                }

                const updatedStudent = await Student.findOneAndUpdate(
                    { Roll_no: originalRoll },
                    updatedData,
                    { new: true }
                );

                if (!updatedStudent) {
                    return NextResponse.json({ message: "Student not found" }, { status: 404 });
                }

                return NextResponse.json({ message: "Student updated successfully" }, { status: 200 });
            }

            case 'DELETE': {
                const { Roll_no } = await req.json();

                if (!Roll_no) {
                    return NextResponse.json({ message: 'Roll number is required' }, { status: 400 });
                }

                const deletedStudent = await Student.findOneAndDelete({ Roll_no });

                if (!deletedStudent) {
                    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
                }

                return NextResponse.json({ message: 'Student deleted successfully' }, { status: 200 });
            }

            default:
                return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
        }
    } catch (error) {
        console.error(`Error handling ${method} request:`, error);
        return NextResponse.json({ message: `Error handling ${method} request`, error }, { status: 500 });
    }
}

// Export as all HTTP methods
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
