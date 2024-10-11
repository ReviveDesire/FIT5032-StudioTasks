const { onRequest } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const booksCollection = admin.firestore().collection('books');
            const snapshot = await booksCollection.get();
            const count = snapshot.size;
            
            res.status(200).send({ count });
        } catch (error) {
            console.error('Error counting books:', error.message);
            res.status(500).send('Error counting books');
        }
    });
});

exports.capitalizeBookEntry = onDocumentCreated('books/{bookId}', async (event) => {
    const bookData = event.data.data();

    const capitalizedData = {
        ...bookData,
        name: bookData.name.toUpperCase(),
    };

    return event.data.ref.update(capitalizedData);
});

// Function to get all books from Firestore
exports.getAllBooks = onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const booksCollection = admin.firestore().collection('books');
            const snapshot = await booksCollection.get();
            
            // Extract data from Firestore documents
            const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Send back the list of books as JSON
            res.status(200).json(books);
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).send('Error fetching books');
        }
    });
});