// src/components/TransactionList.jsx
import React from 'react';
import TransactionItem from './TransactionItem';

// Menerima transactions (array) dan onDelete (fungsi)
const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="transaction-history">
      <h3>Riwayat Transaksi</h3>
      {transactions.length === 0 ? (
        <p className="no-transactions">Belum ada transaksi. Silakan tambah transaksi baru.</p>
      ) : (
        <ul className="list">
          {transactions.map((transaction) => (
            // KEY unik sangat penting di sini! Kita gunakan ID yang dibuat sementara.
            <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                onDelete={onDelete} // Kirim onDelete ke item
            /> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;