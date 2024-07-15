import StatCard from '@/components/StatCard'
import { DataTable } from '@/components/table/DataTable'
import { columns } from '@/components/table/columns'
import { getRecentAppointments } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = async () => {
    const appointments = await getRecentAppointments();

  return (
    <div className='flex flex-col mx-auto max-w-[1416px] space-y-14'>
        <header className='admin-header'>
            <Link 
                href='/'
                className='cursor-pointer'
            >
                <Image 
                    src='/assets/icons/logo-full.svg'
                    height={1000}
                    width={1000}
                    alt='logo'
                    className='h-8 w-fit'
                />
            </Link>
            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome, Admin</h1>
                <p className='text-dark-700'>Manage appointments.</p>
            </section>
            <section className="admin-card">
                <StatCard 
                    type='appointments'
                    count={appointments.scheduledCount}
                    label='Scheduled appointments'
                    icon='/assets/icons/appointments.svg'
                />
                <StatCard 
                    type='pending'
                    count={appointments.pendingCount}
                    label='Pending appointments'
                    icon='/assets/icons/pending.svg'
                />
                <StatCard 
                    type='cancelled'
                    count={appointments.cancelledCount}
                    label='Cancelled appointments'
                    icon='/assets/icons/cancelled.svg'
                />
                
            </section>

            <DataTable
                data={appointments.documents}
                columns={columns}
            />
        </main>
    </div>
  )
}

export default Admin