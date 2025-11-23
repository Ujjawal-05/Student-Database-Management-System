"use client"
import Navbar from '@/Components/Navbar'
import React from 'react'
import { useState, useEffect } from 'react'

const page = () => {
  const [students, setstudents] = useState([]);
  const [roll, setroll] = useState("")
  const [grade, setgrade] = useState("")
  const [inp, setinp] = useState(false)
  const [editingRollNo, setEditingRollNo] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/getroute'); // Call the API route we created
        const data = await response.json();
        setstudents(data.sort((a,b)=>a.Roll_no-b.Roll_no));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  const UpdateGrade = () => {
    if (!grade) {
      alert("Please fill the fields before updating");
      return;
    }
    if (grade<0) {
      alert("Grade cannot be negative");
      return;
    }
    if (grade>10) {
      alert("Grade cannot be above 10");
      return;
    }

    const payload = {
      Roll_no: roll,
      Grade: grade
    };

    fetch("http://localhost:3000/api/gradesroute", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(async response => {
      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (response.ok) {
        setstudents(prevStudents =>
          prevStudents.map(student =>
            student.Roll_no === payload.Roll_no ? { ...student, Grade: payload.Grade } : student
          )
        );
        setroll("");
        setgrade("");
        setEditingRollNo(null);
        alert(result.message || "Grade updated");
      } else {
        alert(result.message || "Update failed");
      }
    })
      .catch(error => {
        console.error("Error updating student:", error);
        alert("Error updating student");
      });
  };



  return (
    <>
      <Navbar pos="" wi="100%" />
      <section className='min-h-screen bg-black text-white py-3'>
        <div className='flex flex-col items-center justify-center max-h-[90vh]'>
          <div className="w-[70%] h-[700px] text-2xl relative rounded-4xl border-2 border-gray-500 pb-5 my-2 overflow-x-auto scrollbar-custom ">
            <div className='w-full bg-gray-900 py-3 px-[70px] rounded-2xl text-bold sticky top-0 justify-between items-center flex font-bold text-3xl '><div className='min-w-[100px] text-center items-center justify-center'>Roll No.</div><div className='min-w-[100px] text-center items-center justify-center'>Grade</div></div>
            <div className='w-full border sticky top-15 border-gray-600'></div>
            {students.map((curritem) => {
              return <div className='w-full py-3 px-[100px] rounded-2xl my-2 justify-between items-center flex ' key={curritem.Roll_no}>
                <div className='mx-4'>{curritem.Roll_no}</div>
                <div className='flex gap-5 items-center'>{curritem.Grade} <div className='cursor-pointer' onClick={() => { setEditingRollNo(curritem.Roll_no); setroll(curritem.Roll_no); setgrade(curritem.Grade); }}><img width={20} src="Edit.svg" alt="" /></div></div>
              </div>
            })}
          </div>
          {editingRollNo && (<div className='flex justify-around w-[70%]'>
            <div className='flex gap-10 my-5'>
              <input className='bg-gray-700 p-2 shadow-2xl shadow-gray-500 focus:outline-none focus:bg-gray-800 rounded-3xl text-white placeholder-gray-400' value={grade} type="text" onChange={e => { setgrade(e.target.value) }} placeholder='Grade' />
            </div>
            <div className='my-2 flex items-center justify-center'>
              <button onClick={UpdateGrade} className='px-6 py-2 bg-gray-700 text-white rounded-lg transform cursor-pointer hover:bg-gray-800'>UPDATE</button>
            </div>
          </div>)}
        </div>
      </section>
    </>
  )
}

export default page