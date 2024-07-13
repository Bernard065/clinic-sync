import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const NewAppointment = async ({ params: { userId }}: SearchParamProps) => {
  const patient = await getPatient(userId)
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col'>
          <Image 
            src='/assets/icons/logo-full.svg'
            width={1000}
            height={1000}
            alt='logo'
            className='w-fit h-10 mb-12 mt-5'
          />
          <AppointmentForm 
            type='create'
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-10 py-12">
              &copy; 2024 ClinicSync 
          </p>

        </div>
      </section>

      <Image 
        src='/assets/images/register-img.png'
        width={1000}
        height={1000}
        alt='appointment'
        className='side-img max-w-[390px] bg-buttom'
      />
    </div>
  )
}

export default NewAppointment