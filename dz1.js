// ============================================================
// Домашнее задание 1 — Баринов Егор, ИУ5-41Б
// ============================================================

// ─────────────────────────────────────────────────────────────
// ДОП. ЗАДАНИЕ — 1 уровень (имя Е → задания 1.4 и 1.9)
// ─────────────────────────────────────────────────────────────

// Задание 1.4 — getSumAndMultOfArray
function getSumAndMultOfArray(arr) {
    let sum = 0;
    let mult = 1;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        mult *= arr[i];
    }
    return { sum, mult };
}

console.log('=== Задание 1.4 ===');
console.log(getSumAndMultOfArray([1, 2, 3, 4])); // { sum: 10, mult: 24 }
console.log(getSumAndMultOfArray([5, 0, 2]));    // { sum: 7,  mult: 0  }
console.log(getSumAndMultOfArray([]));            // { sum: 0,  mult: 1  }

// Задание 1.9 — fill
function fill(arraySize, data) {
    const result = [];
    for (let i = 0; i < arraySize; i++) {
        result.push(data);
    }
    return result;
}

console.log('\n=== Задание 1.9 ===');
console.log(fill(3, 'a'));    // ['a', 'a', 'a']
console.log(fill(4, 0));      // [0, 0, 0, 0]
console.log(fill(0, 'x'));    // []
console.log(fill(2, true));   // [true, true]

// ─────────────────────────────────────────────────────────────
// ОСНОВНОЕ ЗАДАНИЕ — 2 уровень (фамилия Б → задание 2.3)
// ─────────────────────────────────────────────────────────────

// Задание 2.3 — maxOnesSequence
function maxOnesSequence(str) {
    let maxLen = 0;
    let currentLen = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '1') {
            currentLen++;
            if (currentLen > maxLen) maxLen = currentLen;
        } else {
            currentLen = 0;
        }
    }
    return maxLen;
}

console.log('\n=== Задание 2.3 ===');
console.log(maxOnesSequence('1000000111100011111010111101111111')); // 7
console.log(maxOnesSequence('0000'));                               // 0
console.log(maxOnesSequence('1111'));                               // 4
console.log(maxOnesSequence('10101'));                              // 1
console.log(maxOnesSequence(''));                                   // 0

// ─────────────────────────────────────────────────────────────
// ОСНОВНОЕ ЗАДАНИЕ — 3 уровень (группа ИУ5-41Б → задание 3.1)
// ─────────────────────────────────────────────────────────────

// Задание 3.1 — merge
function merge(...objects) {
    const result = {};
    for (const obj of objects) {
        for (const key in obj) {
            if (!(key in result)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

console.log('\n=== Задание 3.1 ===');
console.log(merge({ a: 1, b: 2 }, { b: 99, c: 3 }, { d: 4 }));
// { a: 1, b: 2, c: 3, d: 4 }
console.log(merge({ x: 10 }, {}, { x: 20, y: 30 }));
// { x: 10, y: 30 }