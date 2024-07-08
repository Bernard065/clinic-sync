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

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
})




const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
    })

    // Define a submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> 
        <section className="mb-8 space-y-4">
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