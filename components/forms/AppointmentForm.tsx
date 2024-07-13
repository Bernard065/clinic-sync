'use client'

import React, { useState } from 'react'
import { Form } from "@/components/ui/form";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getAppointmentSchema } from '@/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from '../CustomFormField';
import { FormFieldType } from '@/lib/utils';
import SubmitButton from '../SubmitButton';
import { Doctors } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import { Status } from '@/types';

const AppointmentForm = ({ type, userId, patientId }: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule"
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status;

    switch (type) {
      case 'schedule':
        status= 'scheduled'
        break;

      case 'cancel':
        status= 'cancelled'
        break;
    
      default:
        status = 'pending'
        break;
    }

    try {
      if(type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status: status as Status,
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel;

  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';     
      break;
  case 'schedule':
      buttonLabel = 'Schedule Appointment'
      break;
    default: 
      buttonLabel = 'Submit Appointment'
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-8">
          <h1 className="header">Request a new appointment.</h1>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control} 
              fieldType={FormFieldType.SELECT}
              name='primaryPhysician'
              label='Physician'
              placeholder='Select a physician'  
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image 
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.DATE_PICKER}
                name='schedule'
                label='Appointment Date'
                placeholder='Select your appoinment date'
                showTimeSelect
                dateFormat="MM/dd/yyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.TEXTAREA}
                name='reason'
                label='Reason for appointment'
                placeholder='Enter reason for appointment'
                  
              />
              <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.TEXTAREA}
                name='note'
                label='Comments'
                placeholder='Enter any comments(if any)'  
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            control={form.control} 
            fieldType={FormFieldType.TEXTAREA}
            name='cancellationReason'
            label='Reason for Cancellation'
            placeholder='Enter reason for cancellation'  
          />
        )}

        

        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ?
        'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm