class Calculator {
    constructor(firstNumber, secondNumber) {
        this.firstNumber = firstNumber;
        this.currentNumber = currentNumber;
        this.clearAll();
    }

    clearEntry() {
        if(this.currentNumber = '') this.operation = undefined;
        else this.currentNumber = '';
    }

    clearAll() {

    }

    selectOperation(operation) {
        this.previousNumber = this.currentNumber;
        this.operation = operation;
    }

    enterNumber(number) {
        if(this.currentOperand.includes('.') && number === '.') return;
        this.currentNumber = this.currentOperand.toString() + number.toString();
    }

    calculate() {
    
    }

    updateDisplay() {
        this.currentOperandDisplay.innerText = this.currentOperand;
    }
}

const calc = new Calculator();