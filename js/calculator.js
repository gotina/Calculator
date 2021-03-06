var Calculator = function() {
    this.operandA = null;
    this.operandB = null;
    this.operation = null;
    this.float = 0;
};

Calculator.prototype = {
    addition: function() {
        this.calculate();
        this.operation = function(a, b) {
            return Big(a).plus(b);
        };
        this.float = 0;
    },
    subtraction: function() {
        this.calculate();
        this.operation = function(a, b) {
            return Big(a).minus(b);
        };
        this.float = 0; 
    },
    multiplication: function() {
        this.calculate();
        this.operation = function(a, b) {
            return Big(a).times(b);
        };
        this.float = 0; 
    },
    division: function() {
        this.calculate();
        this.operation = function(a, b) {
            return Big(a).div(b);
        };
        this.float = 0;
    },
    clearCurrent: function() {
        this.setOperandB(0, "");
        this.float = 0; 
    },
    clearAll: function() {
        this.clearCurrent();
        this.operandA = 0;
        this.operation = null;
        this.float = 0; 
    },
    calculate: function() {
        if (this.operation) {
            this.operandA = this.operation(this.operandA, this.operandB);
        } else {
			if(this.operandB == 0){
				this.operandB = this.operandA;
			}
            	this.operandA = this.operandB;
        }
		this.setOperandB(0, this.operandA);
		this.operation = null;
    },
    equals: function() { 
        this.calculate();
        this.updateDisplay(this.operandA);
    },
    digit: function(number) {
        if (this.float) {
			
			this.setOperandB(Big(this.operandB).plus(number / Math.pow(10, this.float)));
            this.float = this.float + 1;
		} else {           
            this.setOperandB((this.operandB * 10) + number);
        };
    
    },
    point: function() {
        this.float = 1;
    },
	unary: function() {
		if(this.operandB == 0){
			this.operandB = this.operandA;
		} 
		this.setOperandB(this.operandB * -1);
		this.operation = null;
	},
    setOperandB: function(value, text) {
        this.operandB = value;
        this.updateDisplay(typeof text == "undefined" ? this.operandB : text);
    },
    updateDisplay: function(value) {
        $("#display").text(value);
    }
};

var calc = new Calculator();

$("button").click(function() {
    var raw = $(this).text()
    number = parseInt(raw, 10);
    if (isNaN(number)) { 
        switch (raw) {
        case "C":
            calc.clearCurrent();
            break;
        case "AC":
            calc.clearAll();
            break;
        case "x":
            calc.multiplication();
            break;
        case "/":
            calc.division();
            break;
        case "+":
            calc.addition();
            break;
        case "-":
            calc.subtraction();
            break;
        case "=":
            calc.equals();
            break;
        case ".":
            calc.point();
            break;
		case "+/-":
			calc.unary();
			break;
        }
    } else {
        calc.digit(number);
    }
});