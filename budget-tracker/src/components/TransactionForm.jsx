// src/components/TransactionForm.jsx
import React, { useState } from 'react';

// Menerima fungsi onAddTransaction dari App.jsx
const TransactionForm = ({ onAddTransaction }) => {
  // State lokal untuk setiap input
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(''); 
  const [type, setType] = useState('expense'); // Default ke 'expense'

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validasi Dasar
    // Pastikan deskripsi tidak kosong dan nominal adalah angka positif
    if (!description || parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      alert('Mohon isi Deskripsi dan Nominal (harus angka positif) dengan benar.');
      return;
    }

    // 2. Siapkan Objek Transaksi
    const newTransaction = {
      description,
      // Pastikan nominal dikonversi ke tipe data Number
      amount: parseFloat(amount), 
      type, // 'income' atau 'expense'
    };

    // 3. Kirim data ke App.jsx (yang akan menyimpannya ke Firebase di Tahap 4)
    onAddTransaction(newTransaction); 

    // 4. Reset Form setelah Submit
    setDescription('');
    setAmount('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h3>Tambah Transaksi Baru</h3>
      
      {/* Input Deskripsi (Text) */}
      <div className="form-control">
        <label htmlFor="description">Deskripsi</label>
        <input
          id="description"
          type="text"
          placeholder="Contoh: Gaji Bulanan, Beli Kopi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      {/* Input Nominal (Number) */}
      <div className="form-control">
        <label htmlFor="amount">Nominal (Rp)</label>
        <input
          id="amount"
          type="number"
          placeholder="Contoh: 50000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1" // Nominal harus minimal 1
          required
        />
      </div>
      
      {/* Pilihan Tipe (Radio Button) */}
      <div className="form-control type-options">
        <label>Tipe Transaksi</label>
        <div className="radio-group">
            <label className={type === 'income' ? 'active-income' : ''}>
                <input
                    type="radio"
                    value="income"
                    checked={type === 'income'}
                    onChange={() => setType('income')}
                />
                Pemasukan
            </label>
            <label className={type === 'expense' ? 'active-expense' : ''}>
                <input
                    type="radio"
                    value="expense"
                    checked={type === 'expense'}
                    onChange={() => setType('expense')}
                />
                Pengeluaran
            </label>
        </div>
      </div>
      
      <button type="submit" className="btn-submit">Tambah Transaksi</button>
    </form>
  );
};

export default TransactionForm;