"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/lib/utils";
import { User } from "@/types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
          ...PatientFormDefaultValues,
          name: "",
          email: "",
          phone: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
      setIsLoading(true);
  
      // Store file info in form data as
      let formData;
      if (
        values.identificationDocument &&
        values.identificationDocument?.length > 0
      ) {
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
        });
  
        formData = new FormData();
        formData.append("blobFile", blobFile);
        formData.append("fileName", values.identificationDocument[0].name);
      }
  
      try {
        const patient = {
          userId: user.$id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          birthDate: new Date(values.birthDate),
          gender: values.gender,
          address: values.address,
          occupation: values.occupation,
          emergencyContactName: values.emergencyContactName,
          emergencyContactNumber: values.emergencyContactNumber,
          primaryPhysician: values.primaryPhysician,
          insuranceProvider: values.insuranceProvider,
          insurancePolicyNumber: values.insurancePolicyNumber,
          allergies: values.allergies,
          currentMedication: values.currentMedication,
          familyMedicalHistory: values.familyMedicalHistory,
          pastMedicalHistory: values.pastMedicalHistory,
          identificationType: values.identificationType,
          identificationNumber: values.identificationNumber,
          identificationDocument: values.identificationDocument
            ? formData
            : undefined,
          privacyConsent: values.privacyConsent,
        };
        
        // @ts-ignore
        const newPatient = await registerPatient(patient);
        
        if (newPatient) {
          router.push(`/patients/${user.$id}/new-appointment`);
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
              renderSkeleton={(field: any) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
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
                fieldType={FormFieldType.INPUT}
                name='address'
                label='Address'
                placeholder='Enter your address'
                
            />
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.INPUT}
                name='occupation'
                label='Occupation'
                placeholder='Enter your occupation'
              
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.INPUT}
                name='emergencyContactName'
                label='Emergency Contact Name'
                placeholder='Name of next of kin'
                
            />
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.PHONE_INPUT}
                name='emergencyContactNumber'
                label='Emergency Contact Number '
                placeholder='Number of next of kin'
              
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control} 
          fieldType={FormFieldType.SELECT}
          name='primaryPhysician'
          label='Primary Physician'
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

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.INPUT}
                name='insuranceProvider'
                label='Insurance Provider'
                placeholder='Enter your insurance provider'
                
            />
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.INPUT}
                name='insurancePolicyNumber'
                label='Insurance Policy Number '
                placeholder='Enter your insurance policy number'
              
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.TEXTAREA}
                name='allergies'
                label='Allergies (if any)'
                placeholder='Enter any allergies you have'
                
            />
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.TEXTAREA}
                name='currentMedication'
                label='Current Medication (if any) '
                placeholder='Enter any medication you are currently under'
              
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.TEXTAREA}
                name='familyMedicalHistory'
                label='Family Medical History (if any)'
                placeholder='Enter current family medical history'
                
            />
            <CustomFormField
                control={form.control} 
                fieldType={FormFieldType.TEXTAREA}
                name='pastMedicalHistory'
                label='Past Medical History (if any) '
                placeholder='Enter past family medical history'
              
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control} 
          fieldType={FormFieldType.SELECT}
          name='identificationType'
          label='Identification Type'
          placeholder='Select an identification type'
              
        >
          {IdentificationTypes.map((identificationType) => (
            <SelectItem key={identificationType} value={identificationType}>
            {identificationType}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control} 
          fieldType={FormFieldType.INPUT}
          name='identificationNumber'
          label='Identification Number '
          placeholder='Enter your identification number'
              
        />
        <CustomFormField 
          control={form.control} 
          fieldType={FormFieldType.SKELETON}
          name='identificationDocument'
          label='Scanned Copy of Identification Document '
          renderSkeleton={(field: any) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
            </div>
        </section>

        <CustomFormField
          control={form.control} 
          fieldType={FormFieldType.CHECKBOX}
          name='privacyConsent'
          label='I consent to privacy policy '
              
        />
         <CustomFormField
          control={form.control} 
          fieldType={FormFieldType.CHECKBOX}
          name='treatmentConsent'
          label='I consent to treatment '
              
        />
         <CustomFormField
          control={form.control} 
          fieldType={FormFieldType.CHECKBOX}
          name='disclosureConsent'
          label='I consent to disclosure of information '
              
        />
        

        

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  )
};

export default RegisterForm