import connectToDatabase from '@/lib/mongodb';
import Student from '@/models/Stud';

export async function GET(req) {
  try {
    await connectToDatabase(); // Connect to the database
    const students = await Student.find({}); // Fetch all students
    return new Response(JSON.stringify(students), { status: 200 }); // Return JSON response
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(JSON.stringify({ message: 'Error fetching students', error }), { status: 500 });
  }
}
