// src/components/Header.jsx
import React from 'react';

const Header = ({ totalBalance }) => {
  // Format angka ke format mata uang Rupiah
  const formattedBalance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalBalance);

  return (
    <header className="header">
      <h1>💰 Budget Tracker Saya</h1>
      <div className="balance-box">
        <h2>Saldo Total</h2>
        {/* Terapkan warna berdasarkan Saldo: Hijau jika positif, Merah jika negatif */}
        <p className={totalBalance >= 0 ? 'balance-positive' : 'balance-negative'}>
          {formattedBalance}
        </p>
      </div>
    </header>
  );
};

export default Header;