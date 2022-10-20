/*
DisplayValue :
- Contient une valeur de chaîne qui représente l’entrée de l’utilisateur ou le résultat d’une opération.
- C’est la façon dont nous faisons le suivi de ce qui devrait être affiché à l’écran. 

FirstOperand :
- stockera le premier opérande pour n’importe quelle expression

Operator :
-  La clé de l’opérateur stockera l’opérateur pour une expression

WaitingForSecondOperand :
 - vérifier si le premier opérateur et l’opérateur ont été entrés
 - Si c’est vrai, les prochains nombres que l’utilisateur entrera constitueront le second opérande.
*/

const calculator = {
  displayValue: '0', // Permet à la calculatrice d'afficher 0.
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

/*--- Entrez les chiffres ---*/
function inputDigit(digit) {
  const { displayValue } = calculator;
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    // Remplacer la valeur affichée si la valeur actuelle est '0', sinon ajouter
  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}

/*--- Mettre à jour l'affichage ---*/
function updateDisplay() {
  // select the element with class of `calculator-screen`
  const display = document.querySelector('.calculator-screen');
  // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys'); keys.addEventListener('click',(event) => {
  // Access the cliked element
  const { target } = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    console.log('operator', target.value);
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    console.log('clear', target.value);
    return;
  }

  inputDigit(target.value);
  updateDisplay();

});


// Dans la fonction inputDecimal, la méthode includes() est utilisée pour vérifier 
//si displayValue ne contient pas déjà un point décimal.
// Si c’est le cas, un point est ajouté au nombre. Sinon, la fonction sort.
function inputDecimal(dot) {
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

