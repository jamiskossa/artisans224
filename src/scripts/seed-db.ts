
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { conversations as mockConversations } from '../lib/data-seed';

// IMPORTANT: Replace this with your actual Firebase config
const firebaseConfig = {
  "projectId": "artisans-compass",
  "appId": "1:643243336578:web:8e4c52a92c9948b41da59b",
  "storageBucket": "artisans-compass.firebasestorage.app",
  "apiKey": "AIzaSyDj4h-kGIo8gRdf_Gf5_8Tr92NCHERJdiw",
  "authDomain": "artisans-compass.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "643243336578"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
    console.log("Starting to seed database...");

    for (const convo of mockConversations) {
        try {
            const { messages, ...convoData } = convo;
            
            // Create a document reference with the specified ID
            const convoRef = doc(db, 'conversations', convo.id);
            await setDoc(convoRef, convoData);
            console.log(`Seeded conversation: ${convo.id}`);

            const messagesColRef = collection(convoRef, 'messages');
            for (const msg of messages) {
                await addDoc(messagesColRef, {
                    ...msg,
                    timestamp: new Date(msg.timestamp) // Convert string timestamp to Firestore Timestamp
                });
            }
            console.log(`   - Seeded ${messages.length} messages for ${convo.id}`);

        } catch (error) {
            console.error(`Error seeding conversation ${convo.id}:`, error);
        }
    }

    console.log("Database seeding finished.");
}

seedDatabase().then(() => {
    // Manually exit the script
    process.exit(0);
}).catch(err => {
    console.error("Critical error during seeding:", err);
    process.exit(1);
});

// To run this script:
// 1. Make sure you have ts-node installed: `npm install -g ts-node`
// 2. Run from the root of your project: `ts-node src/scripts/seed-db.ts`
