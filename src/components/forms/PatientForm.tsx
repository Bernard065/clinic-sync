"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import { FormFieldType } from "@/lib/utils"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"





const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

    // Define form
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
          name: "",
          email: "",
          phone: ""
        },
    })

    // Define a submit handler
    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
      setIsLoading(true)
      
      try {
        // User data that we get from the form
        const userData = {
          name,
          email,
          phone,
        }

        const user = await createUser(userData)

        if(user) router.push(`/patients/${user.$id}/register`)
        
      } catch (error) {
        console.log(error)
        
      }
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> 
        <section className="mb-8 space-y-6">
            <h1 className="header">Hi there...</h1>
            <p className="text-dark-700">Get started with appointments</p>
        </section>

        <CustomForm 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Full name'
          placeholder='Enter your Full Name'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'

        />
        <CustomForm 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email'
          placeholder='Enter your Email'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'

        />
          <CustomForm 
          control={form.control} 
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone Number'
          placeholder='+254715012201'
          iconSrc='/assets/icons/email.svg'
          iconAlt='phone'

        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm