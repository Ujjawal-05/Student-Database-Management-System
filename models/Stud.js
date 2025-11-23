import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  Roll_no: { type: Number, required: true },
  Name: { type: String, required: true },
  Branch: { type: String, required: true },
  Grade: { type: Number, default: 0,min: [0, 'Grade must be at least 0'],max: [10, 'Grade cannot exceed 10']}
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;