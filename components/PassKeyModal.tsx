'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils";
  
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const PassKeyModal = () => {
    const router = useRouter();
    const path = usePathname();

    const [isOpen, setIsOpen] = useState(true);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

      if(path) {
        if(accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {    
            setIsOpen(false)
            router.push('/admin')
        } else {
            setIsOpen(true);
        }
      }
    }, [encryptedKey])
    

    const closeModal = () => {
        setIsOpen(false);
        router.push('/');
    }

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);

            localStorage.setItem('accessKey', encryptedKey);

            setIsOpen(false)
        } else {
            setError('Invalid passkey. Please try again')
        }
    }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-start justify-between"
                >
                    Admin Access Verification
                    <Image 
                        src='/assets/icons/close.svg'
                        height={20}
                        width={20}
                        alt="close"
                        className="cursor-pointer"
                        onClick={() => closeModal()}
                    />
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Please enter the passkey to access admin page.
                </AlertDialogDescription>
            </AlertDialogHeader>

            <div>
            <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                <InputOTPGroup className="shad-otp">
                    <InputOTPSlot className="shad-otp-slot" index={0} />
                    <InputOTPSlot className="shad-otp-slot" index={1} />
                    <InputOTPSlot className="shad-otp-slot" index={2} />
                    <InputOTPSlot className="shad-otp-slot" index={3} />
                    <InputOTPSlot className="shad-otp-slot" index={4} />
                    <InputOTPSlot className="shad-otp-slot" index={5} />
                </InputOTPGroup>
            </InputOTP>

            {error && <p className="shad-error text-14-regular mt-4 flex justify-center">
                {error}</p>}

            </div>

            <AlertDialogFooter>
                <AlertDialogAction
                    className="shad-primary-btn w-full"
                    onClick={(e) => validatePasskey(e)}
                >
                    Enter Admin Passkey
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

  )
}

export default PassKeyModal