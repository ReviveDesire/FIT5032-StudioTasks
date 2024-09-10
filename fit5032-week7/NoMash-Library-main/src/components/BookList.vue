<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        <input
          type="text"
          v-model="book.name"
          @blur="updateBook(book)"
        />
        - ISBN: {{ book.isbn }}
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    // Fetch books from Firestore using querying
    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'asc'),  
          limit(3)            
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    // Update book name in Firestore
    const updateBook = async (book) => {
      try {
        await updateDoc(doc(db, 'books', book.id), { name: book.name });
        alert('Book updated successfully!');
      } catch (error) {
        console.error('Error updating book: ', error);
      }
    };

    // Delete a book from Firestore
    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));
        books.value = books.value.filter(book => book.id !== id);
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      updateBook,
      deleteBook,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

input {
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  background-color: #f44336;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>
