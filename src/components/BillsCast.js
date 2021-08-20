import React from 'react';
import BillCard from './BillCard'

export default function BillsCast({ bills, handleClick, fireBill }) {
  // Your code here

  return (
    <div className="ui segment inverted blue bill-cast">
      <div className="ui five column grid">
        <div className="row bill-cast-row">
        {bills.map((bill) => <BillCard key={bill.id} bill={bill} handleClick={ handleClick } fireBill={fireBill} />)}
        </div>
      </div>
    </div>
  );
}

