// src/App.jsx
import React, { useState, useEffect } from 'react';
// import { db, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore'; // Diperlukan untuk Tahap 4 & 5
import Header from './Header';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
// src/App.jsx (Tambahkan import ini di bagian atas)
import { db } from './../firebase/firebase'; // Import objek db dari file konfigurasi Anda
import { 
    collection, 
    addDoc, 
    onSnapshot, // Untuk membaca data real-time
    query, 
    orderBy,
    deleteDoc, // Untuk menghapus data (Tahap 5)
    doc // Untuk referensi dokumen (Tahap 5)
} from 'firebase/firestore'; 

const TRANSACTION_COLLECTION = "transactions"; // Nama koleksi di Firestore

// const TRANSACTION_COLLECTION = "transactions"; // Diperlukan untuk Tahap 4 & 5

function App() {
    // src/App.jsx (di dalam fungsi App)

// State loading, opsional tapi disarankan
const [loading, setLoading] = useState(true); 

// FUNGSI READ: Mengambil data dari Firestore secara real-time
useEffect(() => {
    // 1. Buat Query: Ambil dari koleksi 'transactions', diurutkan berdasarkan createdAt
    const q = query(
        collection(db, TRANSACTION_COLLECTION), 
        orderBy('createdAt', 'desc') // Tampilkan transaksi terbaru di atas
    );

    // 2. onSnapshot: Listener real-time. State akan otomatis terupdate jika ada perubahan di DB
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTransactions = snapshot.docs.map(doc => ({
        // ID dokumen Firestore harus disimpan sebagai 'id'
        id: doc.id, 
        ...doc.data()
      }));
      setTransactions(fetchedTransactions);
      setLoading(false); // Matikan status loading
    });

    // Cleanup: Matikan listener saat komponen dilepas
    return () => unsubscribe(); 
}, []); 

// State untuk menyimpan daftar transaksi
  const [transactions, setTransactions] = useState([]); 
  // State untuk menyimpan saldo total
  const [balance, setBalance] = useState(0); 

  // FUNGSI INI AKAN DIGANTI TOTAL di Tahap 4 dengan logika Firebase
  const addTransaction = (newTransaction) => {
    console.log("Transaksi diterima dari form:", newTransaction);
    
    // ID sementara (akan diganti ID Firestore di Tahap 4)
    const transactionWithId = { 
      ...newTransaction, 
      id: Date.now().toString(), 
      // Tambahkan date agar data terasa lebih realistis
      date: new Date().toLocaleDateString('id-ID'), 
    };
// src/App.jsx (di dalam fungsi App)

// FUNGSI DELETE: Menghapus data dari Firestore
const deleteTransaction = async (id) => {
    try {
        // Mendapatkan referensi dokumen
        await deleteDoc(doc(db, TRANSACTION_COLLECTION, id));
        // Sekali lagi, onSnapshot akan otomatis mengurus update state.
    } catch (e) {
        console.error("Error deleting document: ", e);
        alert("Gagal menghapus transaksi.");
    }
};
// Pastikan komponen TransactionList menerima onDelete={deleteTransaction} (sudah dilakukan di Tahap 3)
    // Update state transactions (menambah transaksi baru)
    setTransactions((prevTransactions) => [
      transactionWithId,
      ...prevTransactions, 
    ]);
  };
  
  // FUNGSI HAPUS (Placeholder untuk Tahap 5)
  const deleteTransaction = (id) => {
    console.log("Placeholder: Hapus ID", id, " (akan terintegrasi dengan Firebase di Tahap 5)");
    // Di tahap ini, kita hanya menghapus dari state lokal
    setTransactions(transactions.filter(t => t.id !== id));
  }

  // LOGIKA PERHITUNGAN SALDO (RUNS AFTER STATE CHANGES)
  useEffect(() => {
    // Gunakan fungsi reduce untuk mengulang seluruh array transaksi dan menjumlahkan saldo
    const newBalance = transactions.reduce((acc, transaction) => {
        const amount = transaction.amount;
        if (transaction.type === 'income') {
            return acc + amount; // Tambah jika income
        } else {
            return acc - amount; // Kurang jika expense
        }
    }, 0); // Mulai dari 0
    
    setBalance(newBalance);
  }, [transactions]); // Array dependency: Recalculate hanya jika 'transactions' berubah

  return (
    <div className="container">
      {/* Kirim state balance ke Header */}
      <Header totalBalance={balance} />
      <div className="content">
        {/* Kirim fungsi addTransaction ke Form */}
        <TransactionForm onAddTransaction={addTransaction} />
        {/* Kirim state transactions dan fungsi delete (placeholder) ke List */}
        <TransactionList 
            transactions={transactions} 
            onDelete={deleteTransaction} 
        />
      </div>
    </div>
  );
}

export default App;