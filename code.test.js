const assert = require('assert');
const { parallelMergesort } = require('./code');
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}

(async function runTests() {
    console.log("Run");

    let result = await parallelMergesort([]);
    assert.deepStrictEqual(result, [], "Failed empty array");

    result = await parallelMergesort([1]);
    assert.deepStrictEqual(result, [1], "Failed single element");

    result = await parallelMergesort([1, 2]);
    assert.deepStrictEqual(result, [1, 2], "Failed two sorted elements");

    result = await parallelMergesort([2, 1]);
    assert.deepStrictEqual(result, [1, 2], "Failed two unsorted elements");

    result = await parallelMergesort([5, 3, 8, 4, 2]);
    assert.deepStrictEqual(result, [2, 3, 4, 5, 8], "Failed multiple elements");

    result = await parallelMergesort([1, 2, 3, 4, 5]);
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5], "Failed already sorted array");

    result = await parallelMergesort([5, 4, 3, 2, 1]);
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5], "Failed reverse sorted array");

    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    result = await parallelMergesort(largeArray);
    assert.ok(isSorted(result), "Failed large array");

    console.log("pass");
})();
