const title = document.querySelector('#inp1');
const amount = document.querySelector('#space');
const btn = document.querySelector('#btn');
const radios = document.querySelectorAll('input[name="transaction"]');
const cards = document.querySelector('#cards');

const balanceAmount = document.querySelector('#balance-amount');
const incomeAmount = document.querySelector('#income-amount');
const expenseAmount = document.querySelector('#expense-amount');

const balance = document.querySelector('#balance');
const addBalance = document.querySelector('#addBalance');

const startScreen = document.querySelector('.startScreen');
const container = document.querySelector('.container');

let data = [];
let mainBalance = 0;
let income = 0;
let expense = 0;

const themeChanger = document.querySelector('.theme-changer');

themeChanger.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  themeBtn.textContent =
    document.body.classList.contains('dark')
      ? '☀️'
      : '🌙';
})


// Initial balance
addBalance.addEventListener('click', () => {
  let balanceVal = balance.value.trim();

  if (balanceVal === "") {
    alert("Enter starting balance");
    return;
  }

  mainBalance = Number(balanceVal);

  balanceAmount.textContent = `₹${mainBalance}`;

  startScreen.style.display = "none";
  container.style.display = "block";
});


btn.addEventListener('click', startApp);


function startApp() {

  const selected = document.querySelector(
    'input[name="transaction"]:checked'
  );

  const titleVal = title.value.trim();

  // validate before Number()
  const amountInput = amount.value.trim();

  if (titleVal === "") {
    alert("Enter title");
    return;
  }

  if (amountInput === "") {
    alert("Enter amount");
    return;
  }

  if (!selected) {
    alert("Select transaction type");
    return;
  }

  const amountVal = Number(amountInput);

  if (amountVal <= 0) {
    alert("Amount must be greater than 0");
    return;
  }


  // update balances once
  if (selected.value === "income") {
    mainBalance += amountVal;
    income += amountVal;
  } else {
    mainBalance -= amountVal;
    expense += amountVal;
  }


  // update UI
  balanceAmount.textContent = `₹${mainBalance}`;
  incomeAmount.textContent = `₹${income}`;
  expenseAmount.textContent = `₹${expense}`;


  // save transaction
  const transaction = {
    title: titleVal,
    amount: amountVal,
    type: selected.value
  };

  data.push(transaction);


  clearInputs();

  renderCards();
}


function renderCards() {

  cards.innerHTML = "";

  data.forEach(elem => {

    const div = document.createElement('div');
    div.id = "card";

    div.innerHTML = `
      <p>${elem.title}</p>
      <p>₹${elem.amount}</p>
      <div id="check"
      style="
      display:block;
      background:${
        elem.type === "income"
        ? "green"
        : "red"
      }">
      </div>
    `;

    cards.appendChild(div);

  });

}


function clearInputs() {

  title.value = "";
  amount.value = "";

  radios.forEach(radio => {
    radio.checked = false;
  });

}
