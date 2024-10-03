import React from 'react'

const Navbar = () => {
  return (
     <nav className=' w-[100%] flex justify-between bg-blue-950 text-white p-2'>
        <div className='font-bold text-2xl'>iTask</div>
        <ul className='flex w-[20%]  justify-between'>
            <li  className='hover:text-lg cursor-pointer' >Home</li>
            <li className='hover:text-lg cursor-pointer'>contact</li>
            <li></li>
        </ul>
     </nav>
  )
}

export default Navbar
