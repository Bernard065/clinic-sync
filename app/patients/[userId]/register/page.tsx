import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId)

  return (
    <div className='flex h-screen max-h-screen'>
        <section className='container'>
            <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
                <Image 
                    src='/assets/icons/logo-full.svg'
                    width={1000}
                    height={1000}
                    alt='logo'
                    className='w-fit h-10 mb-12'
                />
               
                <RegisterForm user={user} />

                <div className="text-14-regular mt-10 flex justify-between">
                    <p className="justify-items-end text-dark-600 xl:text-left text-center">
                    &copy; 2024 ClinicSync</p>
                    {/* <Link href="/?admin=true" className="text-green-500">
                    Admin
                    </Link> */}
                </div>
            </div>
        </section>
        <Image 
            src='/assets/images/register-img.png'
            width={1000}
            height={1000}
            alt='patient-form'
            className='side-img max-w-[360px]'
        />
    </div>
  )
}

export default Register