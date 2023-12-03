import * as fs from "fs";
import { maxBy, minBy, sum } from "lodash";

var input = fs.readFileSync(0).toString();

const numbers = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4' : '4',
    '5' : '5',
    '6' : '6',
    '7' : '7',
    '8' : '8',
    '9' : '9',
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four' : '4',
    'five' : '5',
    'six' : '6',
    'seven' : '7',
    'eight' : '8',
    'nine' : '9', 
}

const findAllPositions = (line: string, match: string, value: number, startIndex = 0) => {
    const index = line.indexOf(match, startIndex);
    if(index === -1) {
        return [];
    }
    return [{index, value}, ...findAllPositions(line, match, value, index + 1)];
}

const getNumbers = (line: string) => {
    const indexes = Object.keys(numbers).flatMap(i => {
        const matches = findAllPositions(line, i, numbers[i]);
        return matches;                
    });
    return parseInt(minBy(indexes, "index").value + maxBy(indexes, "index").value);
}

const digitLines = input.split("\n").map(getNumbers)
console.log(sum(digitLines));
