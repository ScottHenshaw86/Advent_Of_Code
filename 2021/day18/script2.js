// Advent Of Code 2021 - Day 18: Part 1
const fs = require("fs");

const input = fs
.readFileSync("./input.txt", "latin1")
.split(/\r\n/g).map(a => a.split(""))

let pair = [];

const explode = () => {
    let depth = 0
    for (let i = 0; i < pair.length; i++) {
        if (pair[i] === "[") depth++;
        if (pair[i] === "]") depth--;
        if (depth > 4) {
            const left = parseInt(pair[i + 1]);
            const right = parseInt(pair[i + 3]);
            for (let j = i - 1; j > 0; j--) {
                if (Number(pair[j]) > -1) {
                    pair[j] = parseInt(pair[j]) + left
                    break;
                }
            }
            for (let j = i + 4; j < pair.length; j++) {
                if (Number(pair[j]) > -1) {
                    pair[j] = parseInt(pair[j]) + right
                    break;
                }
            }
            pair.splice(i + 1, 4);
            pair[i] = 0;
            return true;
        }
    }
    return false;
}

const split = () => {
    for (let i = 0; i < pair.length; i++) {
        if (Number(pair[i]) > 9) {
            const left = Math.floor(parseInt(pair[i]) / 2);
            const right = Math.ceil(parseInt(pair[i]) / 2);
            pair.splice(i, 1, '[', left, ',', right, ']');
            return true;
        }
    }
    return false;
}

const add = (addend) => {
    pair.push(',');
    for (let i = 0; i < addend.length; i++) {
        pair.push(addend[i])
    }
    pair.push(']')
    pair.unshift('[');
}

const getMagnitude = () => {
    for (let i = 0; i < pair.length; i++) {
        if (pair[i] === "[" && pair[i + 4] === "]") {
            const left = parseInt(pair[i + 1]);
            const right = parseInt(pair[i + 3]);
            pair.splice(i, 5, (3 * left) + (2 * right));
            return true;
        }
    }
    return false;
}

const magnitudes = [];

const c = input.length;
for (let i = 0; i < c; i++) {
    for (let j = 0; j < c; j++) { // now I have a nested loop, in order to add 2 separate rows
        pair = [...input[i]] // reset pair to the current i row
        if (i === j) continue; // don't want to add a row to itself
        add(input[j]); // add the j row

        // reduce the pair (same as part 1)
        let canExplode = true;
        while (canExplode) {
            canExplode = explode()
        }
        let canSplit = true;
        while (canSplit) {
            canSplit = split();
            if (canSplit) {
                explode()
            }
        }

        // unlike part 1, I now calculate the magnitude inside my loop
        let calculating = true;
        while (calculating) {
            calculating = getMagnitude();
        }
        // store the magnitude of this combination
        magnitudes.push(pair[0])
    }
}

// console.log(magnitudes)
console.log(Math.max(...magnitudes))
