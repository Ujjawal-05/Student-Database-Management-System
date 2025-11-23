"use client"
import Navbar from '@/Components/Navbar'
import React from 'react'
import { useState, useEffect } from 'react'

const page = () => {
  const [students, setstudents] = useState([]);
  const [roll, setroll] = useState("")
  const [Name, setName] = useState("")
  const [Branch, setBranch] = useState("")
  const [editingRoll, setEditingRoll] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("editingStudent"));
    if (storedStudent) {
      setroll(storedStudent.Roll_no);
      setName(storedStudent.Name);
      setBranch(storedStudent.Branch);
      setIsEditing(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/getroute');
        const data = await response.json();
        setstudents(data.sort((a, b) => a.Roll_no - b.Roll_no));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  const generate = () => {
    if (!roll || !Name || !Branch) {
      alert("Please fill all fields");
      return;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "Roll_no": roll,
      "Name": Name,
      "Branch": Branch
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };  
  
    fetch("http://localhost:3000/api/studentsroute", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Duplication") {
          alert("Roll number already exists!");
          return;
        }
  
        if (result.message === "Student created successfully") {
          const newStudent = { Roll_no: roll, Name: Name, Branch: Branch };
          setstudents(prevStudents => [ newStudent,...prevStudents]);
          alert(result.message);
          setroll("");
          setName("");
          setBranch("");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteStudent = (roll) => {
    if (!roll) {
      alert("Roll number is required to delete a student");
      return;
    }

    const ask = confirm("Do you want to delete this record?");
    if (!ask) return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "Roll_no": roll });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/studentsroute", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setstudents(prevStudents => prevStudents.filter(student => student.Roll_no !== roll));
        alert(result.message);
      })
      .catch((error) => console.error(error));
  };

  const update = (upitem) => {
    if (!upitem || !upitem.Roll_no) {
      alert("Roll number is required to update a student");
      return;
    }

    const ask = confirm("Do you want to edit this record?");
    if (!ask) return;

    setroll(upitem.Roll_no);
    setName(upitem.Name);
    setBranch(upitem.Branch);

    setEditingRoll(upitem.Roll_no); // store original Roll_no
    setIsEditing(true);

    localStorage.setItem("editingStudent", JSON.stringify(upitem));
  };


  const saveUpdatedStudent = () => {
    if (!roll || !Name || !Branch) {
      alert("Please fill all fields before updating");
      return;
    }

    const payload = {
      originalRoll: editingRoll,
      updatedData: {
        Roll_no: roll,
        Name,
        Branch,
      },
    };

    fetch("http://localhost:3000/api/studentsroute", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(result => {
        if(result.message === "Duplication"){
          setroll("");
          setName("");
          setBranch("");
          localStorage.removeItem("editingStudent");
        }
        if (result.message === "Student updated successfully") {
          setstudents(prevStudents =>
            prevStudents.map(student =>
              student.Roll_no === editingRoll ? payload.updatedData : student
            )
          );

          setroll("");
          setName("");
          setBranch("");
          setEditingRoll(null);
          setIsEditing(false);
          localStorage.removeItem("editingStudent");

          alert("Student updated successfully");
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
          <div className="w-[80%] h-[700px] text-2xl relative rounded-4xl border-2 border-gray-500 pb-5 my-2 overflow-x-auto scrollbar-custom ">
            <div className='w-full bg-gray-900 py-3 px-[70px] rounded-2xl text-bold sticky top-0 justify-between items-center flex font-bold text-3xl'><div className='min-w-[100px] text-center items-center justify-center ml-[42px]'>Roll No.</div><div className='min-w-[100px] text-center ml-[20px] items-center justify-center'>Name</div><div className='min-w-[100px] text-center items-center justify-center'>Branch</div><div className='min-w-[100px] text-center items-center justify-center'>Delete/Edit</div></div>
            <div className='w-full border sticky top-15 border-gray-600'></div>
            {students.map((curritem) => {
              return <div className='w-full py-3 px-[100px] rounded-2xl text-white text- my-2 justify-between items-center flex ' key={curritem.Roll_no}>
                <div className='min-w-[100px] text-center items-center justify-center'>{curritem.Roll_no}</div>
                <div className='min-w-[100px] text-center items-center justify-center'>{curritem.Name}</div>
                <div className='min-w-[100px] text-center items-center justify-center flex'>{curritem.Branch}</div>
                <div className='flex gap-3'><div onClick={() => deleteStudent(curritem.Roll_no)}><img className='cursor-pointer' src="delete.svg" width={20} alt="" /></div><div onClick={() => update(curritem)}><img className='cursor-pointer' src="Edit.svg" width={20} alt="" /></div></div>
              </div>
            })}
          </div>
          <div className='flex justify-around w-[70%]'>
            <div className='flex gap-10 my-5'>
              <input className='bg-gray-700 p-2 shadow-gray-500 shadow-2xl focus:outline-none focus:bg-gray-800 rounded-3xl text-white placeholder-gray-400' value={roll} type="text" onChange={e => { setroll(e.target.value) }} placeholder='Roll Number' />
              <input className='bg-gray-700 p-2 shadow-gray-500 shadow-2xl focus:outline-none focus:bg-gray-800 rounded-3xl text-white placeholder-gray-400' value={Name} type="text" onChange={e => { setName(e.target.value) }} placeholder='Name' />
              <input className='bg-gray-700 p-2 shadow-gray-500 shadow-2xl focus:outline-none focus:bg-gray-800 rounded-3xl text-white placeholder-gray-400' value={Branch} type="text" onChange={e => { setBranch(e.target.value) }} placeholder='Branch' />
            </div>
            <div className='my-2 flex items-center justify-center '>
              {isEditing ? (
                <button onClick={saveUpdatedStudent} className='px-6 py-2  bg-gray-700 hover:bg-gray-800 text-white rounded-lg transform cursor-pointer'>Update</button>
              ) : (
                <button onClick={generate} className='px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transform cursor-pointer'>Add</button>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default page