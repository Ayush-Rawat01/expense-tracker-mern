import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../Util.js'
import { toast, ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable.jsx'
import ExpenseTrackerForm from './ExpenseTrackerForm.jsx';
import ExpenseDetails from './ExpenseDetails.jsx';

function Home() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [incomeAmt, setIncomeAmt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  useEffect(() => {
    const amounts = expenses.map(item => item.amount);
    const income = amounts.filter(item => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const exp = amounts.filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;

    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    handleSuccess("Logged Out Successfully!")

    setTimeout(() => {
      navigate('/login');
    }, 1000)

  }

  const fetchExpenses = async () => {
    try {
      const url = "http://localhost:8080/expenses"
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate('/login');
        return;
      }
      const result = await response.json();
      console.log(result.data);
      setExpenses(result.data);

    }
    catch (err) {
      handleError(err);
    }
  }

  const addExpenses = async (data) => {

    try {
      const url = "http://localhost:8080/expenses";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }

      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate('/login');
        return;
      }

      const result = await response.json();
      console.log(result.data);
      setExpenses(result.data);
    }
    catch (err) {
      handleError(err);
    }

  }
  const handleDelete = async (id) => {
    try {
        const url = `http://localhost:8080/expenses/${id}`;
        const headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: "DELETE"
        }
        const response = await fetch(url, headers);
        if (response.status === 403) {
            localStorage.removeItem('token');
            navigate('/login');
            return
        }
        const result = await response.json();
        handleSuccess(result?.message)
        console.log('--result', result.data);
        setExpenses(result.data);
    } catch (err) {
        handleError(err);
    }
}

  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
    <>

      <div className='user-section'>
        <h1>Welcome {loggedInUser}!</h1>
        <button onClick={handleLogout}>LogOut</button>
      </div>

      <div>
        <ExpenseDetails incomeAmt = {incomeAmt} expenseAmt = {expenseAmt} />
        <ExpenseTrackerForm addExpenses={addExpenses} />
        <ExpenseTable expenses={expenses} handleDelete={handleDelete} />
      </div>

      <ToastContainer />
    </>
  )
}

export default Home