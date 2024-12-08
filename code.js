const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

async function parallelMergesort(array) {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);

    const leftWorker = new Worker(__filename, { workerData: array.slice(0, mid) });
    const rightWorker = new Worker(__filename, { workerData: array.slice(mid) });

    const leftPromise = new Promise((resolve) =>
        leftWorker.on('message', resolve)
    );
    const rightPromise = new Promise((resolve) =>
        rightWorker.on('message', resolve)
    );

    const [left, right] = await Promise.all([leftPromise, rightPromise]);
    return merge(left, right);
}

if (!isMainThread) {
    const array = workerData;
    parentPort.postMessage(array.sort((a, b) => a - b));
}

module.exports = { parallelMergesort };
