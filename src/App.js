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

  function addToCastPATCH(bill) {
    const castBill = {
      ...bill, cast: true
    }
    fetch(`http://localhost:8002/bills/${bill.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(castBill)
    })
    .then(resp => resp.json())
    .then(data => addToCast(data.id, data.cast))
  }
  
  function addToCast(id, cast) {
    setBills(
      bills.map((bill) => bill.id === id ? {...bill, cast } : bill)
    )
  }

  function removeFromCastPATCH(bill) {
    const unCastBill ={
      ...bill, cast: false
    }
    fetch(`http://localhost:8002/bills/${bill.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(unCastBill)
    })
    .then(resp => resp.json())
    .then(data => removeFromCast(data.id, data.cast))
  }

  function removeFromCast(id, cast) {
    setBills(
      bills.map((bill) => bill.id === id ? {...bill, cast } : bill)
    )
  }

  function fireBill(id) {
    setBills(
      bills.filter((bill) => bill.id !== id)
    )
  }

  return (
    <div>
      <BillsCast bills={bills.filter(bill => bill.cast)} handleClick={removeFromCastPATCH} fireBill={fireBill} />
      <BillCollection bills={ bills } handleClick={addToCastPATCH} fireBill={fireBill} />
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


// Core deliverable functionality: 

  // function addToCast(id) {
  //   setBills(
  //     bills.map((bill) => bill.id === id ? {...bill, cast: true } : bill)
  //   )
  // }

  // function removeFromCast(id) {
  //   setBills(
  //     bills.map((bill) => bill.id === id ? {...bill, cast: false} : bill)
  //   )
  // }

