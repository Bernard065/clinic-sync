'use client'

import { convertFileToUrl } from '@/lib/utils'
import { FileUploaderProps } from '@/types'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        onChange(acceptedFiles)
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
        <input {...getInputProps()} />
        {files && files?.length > 0 ? (
            <Image 
                src={convertFileToUrl(files[0])}
                width={1000}
                height={100}
                alt='uploaded image'
                className='max-h-[400px overflow-hidden object-cover'
            />
        ) : (
            <>
                <Image 
                    src='/assets/icons/upload.svg'
                    width={40}
                    height={40}
                    alt='upload'
                />
                <div className='file-upload_label'>
                    <p className='text-gray-500'>Click to upload<span>or drag and drop</span></p>
                    
                </div>
            </>
        )}
    </div>
  )
}

export default FileUploader