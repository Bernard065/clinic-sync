// Import the Appwrite SDK
import * as sdk from 'node-appwrite';

// Destructure and export environment variables for use in the Appwrite client setup
export const {
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID
} = process.env;

// Setting up the Appwrite node client
const client = new sdk.Client();

// Configure the Appwrite client with endpoint, project ID, and API key
client
    .setEndpoint(ENDPOINT!) // Set the Appwrite API endpoint
    .setProject(PROJECT_ID!) // Set the Appwrite project ID
    .setKey(API_KEY!); // Set the Appwrite API key

// Exporting instances of Appwrite services
export const databases = new sdk.Databases(client); // Instance to interact with Appwrite databases
export const storage = new sdk.Storage(client); // Instance to interact with Appwrite storage
export const users = new sdk.Users(client); // Instance to interact with Appwrite users
export const messaging = new sdk.Messaging(client); // Instance to interact with Appwrite messaging
