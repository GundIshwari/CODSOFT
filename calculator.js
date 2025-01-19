const display = document.getElementById('display');
let currentInput = ''; // Current number being typed
let previousInput = ''; // Previous number entered
let operator = null; // Current operator

// Updates the calculator display
const updateDisplay = () => {
  display.textContent = currentInput || previousInput || '0';
};

// Handles button clicks
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    // If "Clear" button is clicked
    if (button.classList.contains('clear')) {
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay();
      return;
    }

    // If an operator button is clicked
    if (button.classList.contains('operator')) {
      if (currentInput && previousInput && operator) {
        // Perform calculation if we already have two inputs and an operator
        previousInput = String(calculate(previousInput, currentInput, operator));
        currentInput = '';
      } else if (currentInput) {
        // Move current input to previous input if no calculation is pending
        previousInput = currentInput;
        currentInput = '';
      }
      operator = value; // Store the current operator
      updateDisplay();
      return;
    }

    // If "=" button is clicked
    if (value === '=') {
      if (currentInput && previousInput && operator) {
        // Perform calculation and display result
        currentInput = String(calculate(previousInput, currentInput, operator));
        previousInput = '';
        operator = null;
        updateDisplay();
      }
      return;
    }

    // If a number or decimal point is clicked
    if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
    currentInput += value; // Append the clicked number
    updateDisplay();
  });
});

// Performs calculations based on the operator
const calculate = (num1, num2, operator) => {
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error'; // Prevent division by zero
    default:
      return 0;
  }
};

// Initialize display
updateDisplay();
