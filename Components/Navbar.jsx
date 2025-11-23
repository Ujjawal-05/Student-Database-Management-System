import React from 'react'
import Link from 'next/link'

const Navbar = ({pos="fixed",wi="80%"}) => {
  const widthClass = wi === "100%" ? "w-full" : `w-[${wi}]`;
  const roundedClass = wi === "80%" ? "rounded-4xl" : "rounded-none";
  return (
    <nav
      className={`bg-[#1c1b1b] text-white flex z-10 justify-between items-center px-5 py-4 h-16 border-gray-500 ${pos} ${widthClass} left-[10%] top-[5%] ${roundedClass}`}
    >
        <div className="logo">
            <Link href="/"><img width={60} src="Logo1.png" alt=""/></Link>
        </div>
        <ul className='flex gap-5 py-2'>
            <Link href="/"><li className='hover:bg-[#101010] p-3 transition-all rounded-4xl'>Home</li></Link>
            <Link href="/about"><li className='hover:bg-[#101010] p-3 transition-all rounded-4xl'>About</li>  </Link>
            <Link href="/create"><li className='hover:bg-[#101010] p-3 transition-all rounded-4xl'>Add/Update Student</li></Link>
            <Link href="/Grade"><li className='hover:bg-[#101010] p-3 transition-all rounded-4xl'>Grades</li>  </Link>
            <Link href="/attendance"><li className='hover:bg-[#101010] p-3 transition-all rounded-4xl'>Attendance</li></Link>
        </ul>
    </nav>
  )
}

export default Navbar