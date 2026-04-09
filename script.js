window.onload = function() {
    const MAX_LENGTH = 12;

    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let memory = 0;
    let bgColorIndex = 0;
    const bgColors = ['#f5f5f5', '#2b2b2b', '#1a3b5c', '#3a2c1f'];
    let displayColorIndex = 0;
    const displayColors = ['#f0f0f0', '#ffe0b0', '#b0e0ff', '#d0f0c0'];

    const outputElement = document.getElementById("result");
    const container = document.querySelector('.calculator-container');
    const resultElement = document.querySelector('.result');

    function limitLength(str) {
        if (str.length > MAX_LENGTH) {
            return str.slice(0, MAX_LENGTH);
        }
        return str;
    }

    function updateDisplay(value) {
        if (value === '' || value === null || value === undefined) {
            outputElement.innerHTML = '0';
        } else {
            outputElement.innerHTML = limitLength(value.toString());
        }
    }

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (digit !== '.' || !a.includes('.')) {
                let newA = a + digit;
                if (newA.length <= MAX_LENGTH) {
                    a = newA;
                }
            }
            updateDisplay(a);
        } else {
            if (digit !== '.' || !b.includes('.')) {
                let newB = b + digit;
                if (newB.length <= MAX_LENGTH) {
                    b = newB;
                }
            }
            updateDisplay(b);
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            onDigitButtonClicked(button.innerHTML);
        };
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = '×';
    };
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    };
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '−';
    };
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    };

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                updateDisplay(a);
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) * -1).toString();
                updateDisplay(b);
            }
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                updateDisplay(a);
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                updateDisplay(b);
            }
        }
    };

    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        updateDisplay('0');
    };

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation) return;

        let numA = parseFloat(a);
        let numB = parseFloat(b);
        let result;

        switch (selectedOperation) {
            case '×':
                result = numA * numB;
                break;
            case '+':
                result = numA + numB;
                break;
            case '−':
                result = numA - numB;
                break;
            case '/':
                if (numB === 0) {
                    alert('Деление на ноль!');
                    return;
                }
                result = numA / numB;
                break;
            default:
                return;
        }

        a = result.toString();
        b = '';
        selectedOperation = null;
        updateDisplay(a);
    };

    document.getElementById("btn_backspace").onclick = function() {
        if (!selectedOperation) {
            if (a.length > 0) {
                a = a.slice(0, -1);
                updateDisplay(a);
            }
        } else {
            if (b.length > 0) {
                b = b.slice(0, -1);
                updateDisplay(b);
            }
        }
    };

    document.getElementById("btn_sqrt").onclick = function() {
        let current = !selectedOperation ? a : b;
        if (current !== '') {
            let num = parseFloat(current);
            if (num < 0) {
                alert('Корень из отрицательного числа');
                return;
            }
            let result = Math.sqrt(num).toString();
            if (!selectedOperation) {
                a = result;
            } else {
                b = result;
            }
            updateDisplay(result);
        }
    };

    document.getElementById("btn_square").onclick = function() {
        let current = !selectedOperation ? a : b;
        if (current !== '') {
            let num = parseFloat(current);
            let result = (num * num).toString();
            if (!selectedOperation) {
                a = result;
            } else {
                b = result;
            }
            updateDisplay(result);
        }
    };

    document.getElementById("btn_factorial").onclick = function() {
        let current = !selectedOperation ? a : b;
        if (current !== '') {
            let num = parseInt(parseFloat(current));
            if (num < 0) {
                alert('Факториал отрицательного числа не определён');
                return;
            }
            let result = 1;
            for (let i = 2; i <= num; i++) result *= i;
            let resultStr = result.toString();
            if (!selectedOperation) {
                a = resultStr;
            } else {
                b = resultStr;
            }
            updateDisplay(resultStr);
        }
    };

    document.getElementById("btn_triple_zero").onclick = function() {
        if (!selectedOperation) {
            let newA = a + '000';
            if (newA.length <= MAX_LENGTH) {
                a = newA;
                updateDisplay(a);
            }
        } else {
            let newB = b + '000';
            if (newB.length <= MAX_LENGTH) {
                b = newB;
                updateDisplay(b);
            }
        }
    };

    document.getElementById("btn_memory_add").onclick = function() {
        let current = !selectedOperation ? a : b;
        if (current !== '') {
            memory += parseFloat(current);
            console.log('M+ memory =', memory);
        } else if (expressionResult !== '') {
            memory += parseFloat(expressionResult);
            console.log('M+ memory =', memory);
        }
    };

    document.getElementById("btn_memory_sub").onclick = function() {
        let current = !selectedOperation ? a : b;
        if (current !== '') {
            memory -= parseFloat(current);
            console.log('M- memory =', memory);
        } else if (expressionResult !== '') {
            memory -= parseFloat(expressionResult);
            console.log('M- memory =', memory);
        }
    };

    document.getElementById("btn_toggle_bg").onclick = function() {
        bgColorIndex = (bgColorIndex + 1) % bgColors.length;
        container.style.backgroundColor = bgColors[bgColorIndex];
        container.style.borderColor = bgColorIndex % 2 ? '#FF8C00' : '#aaa';
    };

    document.getElementById("btn_toggle_display_color").onclick = function() {
        displayColorIndex = (displayColorIndex + 1) % displayColors.length;
        resultElement.style.backgroundColor = displayColors[displayColorIndex];
    };

    // ===== ИНДИВИДУАЛЬНАЯ ФУНКЦИЯ: расчёт стоимости проезда =====
    const tollPanel = document.getElementById("toll_roads_panel");
    const tollRateSelect = document.getElementById("toll_rate_select");
    const tollCustomRow = document.getElementById("toll_custom_row");
    const tollResultDiv = document.getElementById("toll_roads_result");

    document.getElementById("btn_toll_roads").onclick = function() {
        const isVisible = tollPanel.style.display === 'block';
        tollPanel.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            const currentValue = !selectedOperation ? a : b;
            if (currentValue !== '') {
                document.getElementById("toll_km_input").value = parseFloat(currentValue);
            }
        }
    };

    tollRateSelect.onchange = function() {
        tollCustomRow.style.display = (this.value === 'custom') ? 'flex' : 'none';
    };

    document.getElementById("btn_toll_roads_calc").onclick = function() {
        const kmInput = document.getElementById("toll_km_input");
        const km = parseFloat(kmInput.value);
        if (isNaN(km) || km <= 0) {
            tollResultDiv.innerHTML = '⚠️ Введите корректное расстояние';
            tollResultDiv.className = 'toll-result toll-error';
            return;
        }

        let rate, roadName;
        if (tollRateSelect.value === 'custom') {
            const customRate = parseFloat(document.getElementById("toll_custom_rate").value);
            if (isNaN(customRate) || customRate <= 0) {
                tollResultDiv.innerHTML = '⚠️ Введите корректный тариф';
                tollResultDiv.className = 'toll-result toll-error';
                return;
            }
            rate = customRate;
            roadName = 'Пользовательский тариф';
        } else {
            rate = parseFloat(tollRateSelect.value);
            roadName = tollRateSelect.options[tollRateSelect.selectedIndex].text.split('—')[0].trim();
        }

        const cost = km * rate;
        tollResultDiv.innerHTML = `🛣 <strong>${roadName}</strong><br>📏 Расстояние: <strong>${km} км</strong><br>💰 Тариф: <strong>${rate} ₽/км</strong><br>✅ Стоимость проезда: <strong>${cost.toFixed(2)} ₽</strong>`;
        tollResultDiv.className = 'toll-result toll-success';

        // Переносим результат на дисплей калькулятора
        a = cost.toFixed(2);
        b = '';
        selectedOperation = null;
        updateDisplay(a);
    };
};