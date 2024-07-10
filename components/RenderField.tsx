import React from 'react'
import { Input } from './ui/input'
import { FormFieldType } from '@/lib/utils';
import Image from 'next/image';
import { FormControl } from './ui/form';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder } = props

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
               <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                {iconSrc && (
                    <Image
                        src={iconSrc}
                        height={24}
                        width={24}
                        alt={iconAlt || 'icon'}
                        className='ml-2'
                    />
                )}
                <FormControl>
                    <Input
                    placeholder={placeholder}
                    {...field}
                    className='input'
                    />
                </FormControl>
               </div>
            )
            case FormFieldType.PHONE_INPUT:
                return (
                    <FormControl>
                        <PhoneInput
                            placeholder={placeholder}
                            defaultCountry='US'
                            international
                            withCountryCallingCode
                            value={field.value }
                            onChange={field.onChange}
                            className='input-phone'

                        />

                    </FormControl>
                )

        default:
            break;
    }

}

export default RenderField