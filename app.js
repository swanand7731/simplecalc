(function () {
    const keys = document.querySelectorAll('div.calculator-keys button');
    const display = document.querySelector('.calculator-display p');

    keys.forEach(key => {
        key.addEventListener('click', event => {            
            const key = event.target;
            const action = event.target.dataset.action;
            const keyText = key.textContent;
            const calculator = document.querySelector('.calculator');

            if (!action) {
                //This is a number clicked             
                if (display.textContent === '0' || calculator.dataset.opkey) {
                    calculator.dataset.opkey = '';
                    display.textContent = keyText;
                } else {
                    if (!calculator.dataset.opkey && !display.textContent.includes('.'))
                        display.textContent = keyText;
                    else
                        display.textContent = display.textContent + keyText;
                }
            }

            if (action === 'add' || action === 'subtract' ||
                action === 'multiply' || action === 'divide') {

                calculator.dataset.firstValue =  display.textContent;                    
                calculator.dataset.operator = action;
                calculator.dataset.opkey = 'operator';
            }

            if(action === 'clear'){
                display.textContent = '0';
                calculator.dataset.operator = '';
                calculator.dataset.opkey = '';
                calculator.dataset.firstValue = '';
            }

            if (action === 'decimal') {
                if (display.textContent === '0' || calculator.dataset.opkey) {
                    calculator.dataset.opkey = '';
                    display.textContent = '0.';
                } else if (!display.textContent.includes('.')) {
                    if (!calculator.dataset.opkey)
                        display.textContent = '0.';
                    else
                        display.textContent = display.textContent + '.';
                }
            }

            if(action === 'calculate'){
                
                const firstValue = calculator.dataset.firstValue;
                const secondValue = display.textContent;
                const operator = calculator.dataset.operator;
                if(firstValue && operator){
                    display.textContent = calculate(firstValue, secondValue, operator);
                    calculator.dataset.operator = '';
                }
                    
            }

        });
    });

    const calculate = (n1, n2, operator) => {
        const firstValue = parseFloat(n1);
        const secondValue = parseFloat(n2);
        if(operator === 'add') return firstValue + secondValue;
        if(operator === 'subtract') return firstValue - secondValue;
        if(operator === 'multiply') return firstValue * secondValue;
        if(operator === 'divide') return firstValue / secondValue;
    }

})();
