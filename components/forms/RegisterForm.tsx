"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/utils";
import { User } from "@/types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);
    
        try {
          const user = {
            name: values.name,
            email: values.email,
            phone: values.phone,
          };
    
          const newUser = await createUser(user);
    
          if (newUser) {
            router.push(`/patients/${newUser.$id}/register`);
          }
        } catch (error) {
          console.log(error);
        }
    
        setIsLoading(false);
    };
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-8 space-y-4">
          <h1 className="header">Welcome.</h1>
          <p className="text-dark-700">Let's know more about you</p>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>

        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Full name'
          placeholder='Enter your Full Name'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.INPUT}
                name='email'
                label='Email'
                placeholder='Enter your Email'
                iconSrc='/assets/icons/email.svg'
                iconAlt='email'
            />
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.PHONE_INPUT}
                name='phone'
                label='Phone Number'
                placeholder='+254715012201'
                iconSrc='/assets/icons/email.svg'
                iconAlt='phone'
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.DATE_PICKER}
                name='birthDate'
                label='Date of Birth'
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.DATE_PICKER}
                name='birthDate'
                label='Date of Birth'
                
            />
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.PHONE_INPUT}
                name='phone'
                label='Phone Number'
                placeholder='+254715012201'
                iconSrc='/assets/icons/email.svg'
                iconAlt='phone'
            />
        </div>

        

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm