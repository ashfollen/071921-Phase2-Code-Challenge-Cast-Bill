import React, { useEffect, useState } from 'react';
import BillCollection from './components/BillCollection';
import BillsCast from './components/BillsCast';


export default function App() {
  const [ bills, setBills ] = useState([])
  console.log(bills)
  
  useEffect(() => {
    fetch('http://localhost:8002/bills')
    .then(resp => resp.json())
    .then(data => setBills(data))
  }, [])

  function addToCast(id) {
    console.log(id);
    setBills(
      bills.map((bill) => bill.id === id ? {...bill, cast: true} : bill)
    )
  }

  function removeFromCast(id) {
    setBills(
      bills.map((bill) => bill.id === id ? {...bill, cast: false} : bill)
    )
  }

  function fireBill(id) {
    setBills(
      bills.filter((bill) => bill.id !== id)
    )
  }

  return (
    <div>
      <BillsCast bills={bills.filter(bill => bill.cast)} handleClick={removeFromCast} fireBill={fireBill} />
      <BillCollection bills={ bills } handleClick={addToCast} fireBill={fireBill} />
    </div>
  );
}

// Component  Hierarchy
// 
// App 
// -- BillsCast
// ---- BillCard
// -- BillCollection
// ---- BillCard

