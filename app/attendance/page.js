"use client";
import React, { useEffect, useState } from "react";
import Navbar from '@/Components/Navbar'

const AttendancePage = () => {
    const [students, setStudents] = useState([]);
    const [rno, setrno] = useState("")
    const [attendance, setAttendance] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const [viewDate, setViewDate] = useState("");
    const [viewAttendance, setViewAttendance] = useState([]);
    const [rollAttendance, setRollAttendance] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [percentage, setPercentage] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch("/api/getroute");
                const data = await res.json();
                setStudents(data.sort((a, b) => a.Roll_no - b.Roll_no));
                const defaultAttendance = {};
                data.forEach(student => {
                    defaultAttendance[student.Roll_no] = "Present"; // default is Present
                });
                setAttendance(defaultAttendance);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchRollAttendance = async () => {
            if (!rno) return;

            const res = await fetch(`/api/attendancebyroll?roll=${rno}`);
            const data = await res.json();

            setRollAttendance(data);

            const presentCount = data.filter(entry => entry.status === "Present").length;
            const totalCount = data.length;
            const percent = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(2) : null;
            setPercentage(percent);

            const student = students.find(std => String(std.Roll_no) === String(rno));
            setStudentName(student?.Name || "Name not found");
        };

        fetchRollAttendance();
    }, [rno]);

    const handleToggle = (rollNo) => {
        setAttendance((prev) => ({
            ...prev,
            [rollNo]: prev[rollNo] === "Present" ? "Absent" : "Present",
        }));
    };

    const handleSubmit = async () => {
        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }

        const attendanceData = students.map(student => ({
            Roll_no: student.Roll_no,
            date: selectedDate,
            status: attendance[student.Roll_no],
        }));

        try {
            const res = await fetch("/api/attendanceroute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ attendance: attendanceData }),
            });

            const result = await res.json();
            if (res.ok) {
                alert("Attendance submitted successfully!");
            } else {
                alert(result.message || "Submission failed");
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("Something went wrong");
        }
    };

    const handleViewAttendance = async () => {
        if (!viewDate) {
            alert("Please select a date to view attendance.");
            return;
        }

        try {
            const res = await fetch(`/api/viewattendance?date=${viewDate}`);
            const data = await res.json();
            console.log(data)
            setViewAttendance(data.sort((a, b) => a.Roll_no - b.Roll_no));
        } catch (err) {
            console.error("Error fetching attendance:", err);
            alert("Could not fetch attendance.");
        }
    };

    return (<>
        <Navbar pos="" wi="100%" />
        <div className="min-h-screen bg-black text-white p-6">
            {/* VIEW ATTENDANCE SECTION */}
            <h2 className="text-2xl font-bold mb-4">View Attendance</h2>

            <div className="mb-4">
                <label className="mr-3 text-xl ">Select Date:</label>
                <input type="date" value={viewDate} onChange={(e) => setViewDate(e.target.value)} className="px-2 text-white bg-blue-700 py-1 rounded"/>
                <button onClick={handleViewAttendance} className="ml-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg cursor-pointer">View</button>
            </div>

            {viewAttendance.length > 0 ? (
                <div className="mt-4 border border-gray-700 rounded p-4">
                    <h3 className="text-xl mb-4 font-semibold ">
                        Attendance on {viewDate}
                    </h3>
                    {viewAttendance.map((entry) => (
                        <div key={entry.Roll_no} className="flex justify-between items-center py-2 border-b border-gray-700">
                            <div className="text-lg mx-7 flex gap-5 text-white font-medium">
                                <div>{entry.Roll_no}</div>
                                <div className="mx-20">{students.find(student => student.Roll_no == entry.Roll_no)?.Name || "Name not found"}</div>
                                {console.log(students.name)}
                            </div>
                            <div className={`font-semibold ${entry.status === "Present" ? "text-green-400" : "text-red-400"}`}>
                                {entry.status}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                viewDate && (
                    <p className="text-gray-400 mt-4">
                        No attendance found for {viewDate}
                    </p>
                )
            )}
            <hr className="my-10 border-gray-600" />
            <h1 className="text-3xl font-bold mb-6">Mark Attendance</h1>

            <div className="mb-4">
                <label className="mr-3 text-xl">Select Date:</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="text-white bg-blue-700 px-2 py-1 rounded"/>
            </div>

            <div className="overflow-auto max-h-[60vh] border border-gray-700 rounded p-4">
                {students.map((student) => (<div key={student.Roll_no} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <div className="text-lg mx-7 flex gap-5 font-medium">
                        <div>{student.Roll_no}</div>
                        <div className="mx-20">{student.Name}</div>
                    </div>
                    <button className={`px-4 py-1 cursor-pointer rounded-lg ${attendance[student.Roll_no] === "Present" ? "bg-green-600" : "bg-red-600"}`} onClick={() => handleToggle(student.Roll_no)}>
                        {attendance[student.Roll_no]}
                    </button>
                </div>
                ))}
            </div>

            <button onClick={handleSubmit} className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-lg">
                Submit Attendance
            </button>

            <hr className="my-10 border-gray-600" />

            <h2 className="text-2xl font-bold mb-4">Check Attendance Percentage</h2>

            <div className="overflow-auto max-h-[60vh] border border-gray-700 rounded p-4">
                <input className="bg-gray-700 p-2 mb-4 w-full focus:outline-none focus:bg-gray-800 rounded-3xl text-white placeholder-gray-400" value={rno} type="text" onChange={e => setrno(e.target.value)} placeholder="Enter Roll No."/>

                {rno && (
                    <>
                        <div className="text-lg text-white font-medium mb-2">
                            <span className="text-gray-400">Name:</span> {studentName}
                        </div>

                        {rollAttendance.length === 0 ? (
                            <div className="text-red-400">
                                No attendance records found for Roll No: {rno}
                            </div>
                        ) : (
                            <>
                                <div className="text-lg text-white mb-4">
                                    Attendance Percentage:{" "} <span className="font-bold text-green-400">{percentage}%</span>
                                </div>

                                {rollAttendance.map((entry) => (
                                    <div key={entry._id} className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <div className="text-white">{entry.date}</div>
                                        <div className={`font-semibold ${entry.status === "Present" ? "text-green-400" : "text-red-400"}`}>
                                            {entry.status}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    </>
    );
};

export default AttendancePage;
