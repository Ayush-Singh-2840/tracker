const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const transactionsEl = document.getElementById('transactions');
const transactionForm = document.getElementById('transactionForm');

// Fetch transactions from localStorage or initialize empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Render initial UI
updateUI();

// Add transaction
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('transactionName').value;
  const amount = parseFloat(document.getElementById('transactionAmount').value);
  const type = document.getElementById('transactionType').value;

  if (name && !isNaN(amount)) {
    const transaction = { name, amount, type };
    transactions.push(transaction);

    // Save to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateUI();
    transactionForm.reset();
  } else {
    alert('Please fill out all fields correctly!');
  }
});

// Update the UI
function updateUI() {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // Update display values
  balanceEl.textContent = `₹${balance}`;
  incomeEl.textContent = `₹${income}`;
  expensesEl.textContent = `₹${expenses}`;

  // Update transaction history
  transactionsEl.innerHTML = '';
  transactions.forEach((t) => {
    const li = document.createElement('li');
    li.textContent = `${t.name} - ₹${t.amount} (${t.type})`;
    transactionsEl.appendChild(li);
  });
}
