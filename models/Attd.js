import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    Roll_no: {type: String,required: true,ref: "Student",},
    date: {type: String,required: true,},
    status: {type: String,enum: ["Present","Absent"],required: true,},
  },
  { timestamps: true }
);
AttendanceSchema.index({ Roll_no: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
