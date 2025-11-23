import Navbar from "@/Components/Navbar";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <section className="min-h-screen bg-black">
            <div className="flex flex-col items-center justify-center text-5xl px-5 min-h-169 ">
              <p className="text-wrap text-center w-[80vw]">Welcome to the Student Database Management System</p>
          </div>
        </section>
        <div className="bg-gray-600 h-[1px]"></div>
        
        <section className="min-h-screen bg-black">
        <div className="grid grid-cols-2 min-h-169">
            <div className="flex items-center justify-center trig">
              <img className="rounded-3xl" src="Database.png" width={500} alt="" />
            </div>
            <div className="flex flex-col gap-7 items-center justify-center text-3xl px-5 tlef">
              <p className="text-wrap text-center w-xl"><span>Check Student Database </span></p>
              <Link href="/create"><button className="px-6 py-2 bg-gray-700 text-white rounded-lg transform cursor-pointer hover:-translate-y-1 transition duration-300 flex items-center gap-2 hover:bg-gray-800"><span>Go To DB</span><span><img  src="Link2.svg" width={20} alt="" /></span></button></Link>
            </div>
          </div>
        </section>
        <div className="bg-gray-600 h-[1px]"></div>
        
        <section className="min-h-screen bg-black">
          <div className="grid grid-cols-2 min-h-169">
            <div className="flex flex-col gap-7 items-center justify-center text-3xl px-5 trig">
              <p className="text-wrap text-center w-xl"><span>Check/Update Attendance </span></p>
              <Link href="/attendance"><button className="px-6 py-2 bg-gray-700 text-white rounded-lg transform cursor-pointer hover:-translate-y-1 transition duration-300 flex items-center gap-2 hover:bg-gray-800"><span>Attendance</span><span><img src="Link2.svg" width={20} alt="" /></span></button></Link>
            </div>
            <div className="flex items-center justify-center tlef">
              <img className="rounded-3xl" width={500} src="Attendance.png" alt="" />
            </div>
          </div>
        </section>
        <div className="bg-gray-600 h-[1px]"></div>
        
        <section className="min-h-screen bg-black">
        <div className="grid grid-cols-2 min-h-169 ">
            <div className="flex items-center justify-center trig">
              <img className="rounded-3xl" width={500} src="Grades.png" alt="" />
            </div>
            <div className="flex flex-col gap-7 items-center justify-center text-3xl px-5 tlef">
              <p className="text-wrap text-center w-xl"><span>Check Grades</span></p>
              <Link href="/Grade"><button className="px-6 py-2 bg-gray-700 text-white rounded-lg transform cursor-pointer hover:-translate-y-1 transition duration-300 flex items-center gap-2 hover:bg-gray-800"><span>Grades</span><span><img src="Link2.svg" width={20} alt="" /></span></button></Link>
            </div>
          </div>
        </section>
        <div className="bg-gray-600 h-[1px]"></div>
        
      </main>
    </>
  );
}
