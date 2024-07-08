import PatientForm from '@/components/forms/PatientForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      {/* PassKey Modal */}
      <section className='remove-scrollbar container my-auto'>
        <div className='subcontainer max-w-[496px]'>
          <Image 
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt='logo'
            className='mb-12 h-10 w-fit'
          />
          <PatientForm />
          <div className='flex justify-between mt-20 text-14-regular'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              &copy; ClinicSync
            </p>
            <Link href='/?admin=true' className='text-green-500'>Admin</Link>
          </div>
        </div> 
      </section>

      <Image 
          src='/assets/images/onboarding-img.png'
          width={1000}
          height={1000}
          alt='home'
          className='side-img max-w-[50%]'
      />  
    </div>
  )
}

export default Home