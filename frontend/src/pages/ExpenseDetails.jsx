import React from 'react'

function ExpenseDetails({ incomeAmt, expenseAmt }) {
    return (
        <div>

            your balance is {incomeAmt - expenseAmt}

            <div className="amounts-container">
                Income
                <span className="income-amount">₹{incomeAmt}</span>
                Expense
                <span className="expense-amount">₹{expenseAmt}</span>
            </div>
        </div>
    )
}

export default ExpenseDetails