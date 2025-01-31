import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldType } from '@/lib/utils'
import RenderField from './RenderField'
import { CustomProps } from '@/types'




const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className='flex-1'>
              {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>
                  {label}
                </FormLabel>
              )}

              <RenderField field={field} props={props} />

              <FormMessage className='error' />
            </FormItem>
        )}
    />
  )
}

export default CustomFormField