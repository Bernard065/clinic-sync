'use server'

import { InputFile } from "node-appwrite/file";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, databases, storage } from "../appwrite.config";
import { parseStringify } from "../utils";
import { ID, Query } from "node-appwrite";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";


//Create Appointment
export const createAppointment = async (appointment: CreateAppointmentParams) => {
   try {
    const newAppointment = await databases.createDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        ID.unique(),
        appointment
    );

    return parseStringify(newAppointment)
    
   } catch (error) {
    console.log(error);
    
   }
   
};

// Get patient appointment
export const getAppointment =async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
        );
        return parseStringify(appointment);
    } catch (error) {
        console.log(error);
        
    }
}

// Get recent appointments
export const getRecentAppointments =async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );
        
        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as Appointment[]).reduce(
            (acc, appointment) => {
                switch (appointment.status) {
                    case "scheduled":
                        acc.scheduledCount++;
                        break;
                    case "pending":
                        acc.pendingCount++;
                        break;
                    case "cancelled":
                        acc.cancelledCount++;
                        break;
                }
                return acc;
            },
            initialCounts
        );

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        };
        return parseStringify(data)
        
    } catch (error) {
        console.log(error);
        
    }
}

export const updateAppointment = async ({
    appointmentId,
    userId,
    appointment,
    type,
  }: UpdateAppointmentParams) => {
    try {
      // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
      const updatedAppointment = await databases.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
      );
  
      if (!updatedAppointment) throw Error;
  
      
  
      revalidatePath("/admin");
      return parseStringify(updatedAppointment);
    } catch (error) {
      console.error("An error occurred while scheduling an appointment:", error);
    }
  };