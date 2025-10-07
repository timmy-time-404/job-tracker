// src/components/TransactionItem.jsx
import React from 'react';

// Menerima objek transaction dan fungsi onDelete
const TransactionItem = ({ transaction, onDelete }) => {
  const sign = transaction.type === 'income' ? '+' : '-';
  // Tentukan class CSS untuk warna
  const itemClass = transaction.type === 'income' ? 'income' : 'expense';

  // Format angka ke format mata uang Rupiah
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Opsional: hilangkan koma dan 00
  }).format(transaction.amount);

  return (
    // Terapkan kelas CSS untuk visualisasi warna
    <li className={`transaction-item ${itemClass}`}>
      <div className="description-section">
        <span className="description">{transaction.description}</span>
        {/* Opsional: tampilkan tanggal */}
        <span className="date">{transaction.date}</span> 
      </div>
      
      <div className="amount-section">
        <span className="amount">
          {sign} {formattedAmount}
        </span>
        {/* Tombol Hapus: memanggil onDelete dengan ID transaksi ini */}
        <button 
          className="delete-btn" 
          onClick={() => onDelete(transaction.id)}
        >
          &times;
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;