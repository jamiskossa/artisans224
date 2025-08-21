
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, writeBatch } from 'firebase/firestore';
import { conversations as mockConversations, artisans, news, orders, artworks } from '../lib/data-seed';

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

async function seedCollection(collectionName: string, data: any[]) {
    console.log(`Seeding collection: ${collectionName}...`);
    const batch = writeBatch(db);

    for (const item of data) {
        const { id, ...itemData } = item;
        const docRef = doc(db, collectionName, id);
        batch.set(docRef, itemData);
    }

    await batch.commit();
    console.log(`${collectionName} collection seeded with ${data.length} documents.`);
}


async function seedDatabase() {
    console.log("Starting to seed database...");
    
    try {
        await seedCollection('artisans', artisans);
        await seedCollection('news', news);
        await seedCollection('orders', orders);
        await seedCollection('artworks', artworks);

        // Seed conversations and their sub-collections of messages
        console.log("Seeding conversations...");
        for (const convo of mockConversations) {
            const { messages, ...convoData } = convo;
            const convoRef = doc(db, 'conversations', convo.id);
            await setDoc(convoRef, convoData);
            
            const messagesBatch = writeBatch(db);
            const messagesColRef = collection(convoRef, 'messages');
            for (const msg of messages) {
                const msgRef = doc(messagesColRef, msg.id); // Use specific ID for message
                messagesBatch.set(msgRef, {
                    ...msg,
                    timestamp: new Date(msg.timestamp) // Convert string timestamp to Firestore Timestamp
                });
            }
            await messagesBatch.commit();
            console.log(`   - Seeded ${messages.length} messages for ${convo.id}`);
        }
        console.log(`Conversations collection seeded.`);

    } catch (error) {
        console.error("Error during seeding:", error);
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

    