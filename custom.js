// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Close modals when clicked outside the modal content
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  });
};

// Calculator functionality
let currentInput = '';
let operator = '';
let firstOperand = null;
let secondOperand = null;

function appendNumber(number) {
  currentInput += number;
  updateDisplay(currentInput);
}

function appendOperator(op) {
  if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
      operator = op;
      currentInput = '';
  } else if (operator) {
      secondOperand = parseFloat(currentInput);
      calculateResult();
      operator = op;
  }
}

function calculateResult() {
  secondOperand = parseFloat(currentInput);
  let result;
  switch (operator) {
      case '+':
          result = firstOperand + secondOperand;
          break;
      case '-':
          result = firstOperand - secondOperand;
          break;
      case '*':
          result = firstOperand * secondOperand;
          break;
      case '/':
          result = firstOperand / secondOperand;
          break;
      case '%':
          result = firstOperand % secondOperand;
          break;
      default:
          return;
  }
  updateDisplay(result);
  firstOperand = result;
  currentInput = '';
}

function clearDisplay() {
  currentInput = '';
  operator = '';
  firstOperand = null;
  secondOperand = null;
  updateDisplay(0);
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
}

function updateDisplay(value) {
  document.getElementById('calc-display').value = value;
}

// Timer functionality
let countdown;
const startBtn = document.getElementById('start-btn');
const datetimePicker = document.getElementById('datetime-picker');

startBtn.addEventListener('click', function() {
  clearInterval(countdown);

  const targetDate = new Date(datetimePicker.value).getTime();
  if (isNaN(targetDate)) {
      alert("Please select a valid date and time.");
      return;
  }

  countdown = setInterval(function() {
      const now = new Date().getTime();
      const timeRemaining = targetDate - now;

      if (timeRemaining < 0) {
          clearInterval(countdown);
          document.getElementById("time-remaining").textContent = "Countdown completed!";
          return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = formatTime(days);
      document.getElementById("hours").textContent = formatTime(hours);
      document.getElementById("minutes").textContent = formatTime(minutes);
      document.getElementById("seconds").textContent = formatTime(seconds);
      
      document.getElementById("time-remaining").textContent = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds Remaining`;
  }, 1000);
});

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}
