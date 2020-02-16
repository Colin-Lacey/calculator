// the main gist of this Calculator class is that a Calculator stores the current expression in the mainDisplay property and uses eval() to evaluate that string as JavaScript code
// inputs are curated within their methods so that the final expression should almost always be a valid mathematical expression
class Calculator {
    constructor() {
        this.auxDisplay = '';
        this.mainDisplay = '';
        this.isResult = false ;
        this.unclosedBrackets = 0;
        this.clearAll() ;
    }

    // clears the most recent value (ie character in the string)
    clear() {
        if (this.isResult === true) this.clearAll() ;
        if (this.mainDisplay.endsWith(' ')) {
            this.mainDisplay = this.mainDisplay.substring(0, this.mainDisplay.length - 3) ;
        } else {
            this.mainDisplay = this.mainDisplay.substring(0, this.mainDisplay.length - 1) ;
        }
        this.updateDisplay() ;      
    }
    
    // clears all stored info and display values
    clearAll() {
        this.auxDisplay = '' ;
        this.mainDisplay = '' ;
        this.currentOperand = '' ;
        this.updateDisplay();
        this.unclosedBrackets = 0 ;
        this.isResult = false ;
    }

    // takes an operator as specified by the button pressed, and tries to add it to the current operation
    selectOperator(operator) {
        // if the value on the display is a result of a previous operation, take that result,
        // and use it as the beginning of a new expression
        if (this.isResult) {
            this.isResult = false ;
            this.mainDisplay = this.mainDisplay.toString() + " " + operator.toString() + " ";
            this.updateDisplay() ;
            this.operator = operator ;
            this.currentOperand = '' ; 
            return ;
        }
        // check to make sure an operator is a valid input to the current expression
        // i.e. it doesn't follow another operator, opening bracket, or decimal point 
        if (this.mainDisplay === '' || this.mainDisplay.endsWith("(") || this.mainDisplay.endsWith(".") || this.mainDisplay.endsWith(" ")) {
            this.auxDisplay = "invalid input" ;
            this.updateDisplay() ;
            return ;
        } 
        this.mainDisplay = this.mainDisplay.toString() + " " + operator.toString() + " ";
        this.updateDisplay() ;
        this.currentOperand = '' ;
    }

    // attempt to enter an opening bracket
    selectLeftBracket() {
        this.auxDisplay = ''
        // check if the current expression is a result
        // if it is, reset everything
        if (this.isResult === true) {
            this.clearAll();
            this.updateDisplay() ;
        }
        // check that an opening bracket is a valid input 
        // (either the current expression is empty, it follows an operator, or another opening bracket)
        // if one of these conditions holds, add the operator to the expression and increment unclosedBrackets
        if (this.mainDisplay.endsWith(" ") || this.mainDisplay === "" || this.mainDisplay.endsWith("(")) {
            this.mainDisplay = this.mainDisplay.toString() + "(" ;
            this.updateDisplay() ;
            this.unclosedBrackets += 1 ;
        } else {
            this.auxDisplay = "invalid input"
            this.updateDisplay()
        }
    }

    // attempt to enter an closing bracket
    selectRightBracket() {
        this.auxDisplay = ''
        // check that there is at least one opening bracket to match the closer,
        // and the current closing bracket does not immediately follow an opening bracket
        // if these conditions hold, add the closing bracket to the expression
        if (this.unclosedBrackets > 0 && !(this.mainDisplay.endsWith("(") && !(this.mainDisplay.endsWith(' '))) ) {
            this.mainDisplay = this.mainDisplay.toString() + ")" ;
            this.updateDisplay() ;
            this.unclosedBrackets -= 1 ;
        } else {
            this.auxDisplay = ("invalid input") ;
            this.updateDisplay() ;
        }
        
    }

    // attempt to enter a digit as specified by the button pressed in HTML
    selectDigit(digit) {
        this.auxDisplay = '' ;
        // if the current expression is a result, reset everything
        if (this.isResult === true) {
            this.clearAll() ;
            this.updateDisplay() ;
        }
        // invalid input check
        // can't have a leading 0 followed by 0
        if (digit === 0 && this.currentOperand === "0") {
            this.auxDisplay = "invalid input";
            this.updateDisplay();
            return;
        };
        // invalid input check
        // if the input is a decimal point and the current expression already includes one
        // OR, if the current expression is empty and the input is a decimal point
        // OR, if the current expression ends with an operator and the input is a decimal point
        if((digit === '.' && ((this.currentOperand.includes('.')) || (this.mainDisplay === '') || (this.mainDisplay.endsWith(' ')))) || this.mainDisplay.endsWith(")") || ((this.currentOperand === 0) && (Digit === '0'))) {
            this.auxDisplay = "invalid input" ;
            this.updateDisplay() ;
        } else {
            // if input checks are passed,
            // update the string and update display
            this.mainDisplay = this.mainDisplay.toString() + digit.toString();
            this.currentOperand = this.currentOperand.toString() + digit.toString() ;   
            this.updateDisplay() ;
        }
    }

    calculate() {
        try {
            this.mainDisplay = eval(this.mainDisplay) ;
            this.updateDisplay() ;
            this.isResult = true ;
        } catch (e) {
            this.auxDisplay = "incomplete or invalid expression" ;
            this.updateDisplay() ;
        }
        
    }

    updateDisplay() {
        document.getElementById("aux-display").innerText = this.auxDisplay;
        document.getElementById("main-display").innerText = this.mainDisplay;
    }
}

const calc = new Calculator();

