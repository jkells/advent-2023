import { first, last, sum} from 'lodash';
import * as fs from "fs";

var input = fs.readFileSync(0).toString();

const onlyDigits = (line: string) => line.split('').filter(c => '0' && c <= '9').join("");
const digitLines = input.split("\n").map(x => parseInt(`${first(onlyDigits(x))}${last(onlyDigits(x))}`, 10));
console.log(sum(digitLines));
