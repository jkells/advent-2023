import * as fs from "fs";
import { min, max, sum } from "lodash";

type NumberPos = {
  value: number;
  start: number;
  end: number;
  y: number;
};

const getNumbers = (chars: string[], y: number): NumberPos[] => {
  const results: any[] = [];
  let next = "";
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] >= "0" && chars[i] <= "9") {
      next += chars[i];
    } else {
      if (next.length > 0) {
        results.push({
          value: parseInt(next, 10),
          end: i - 1,
          start: i - next.length,
          y,
        });
        next = "";
      }
    }
  }
  if (next.length > 0) {
    results.push({
      value: parseInt(next, 10),
      end: chars.length - 1,
      start: chars.length - next.length,
      y,
    });
  }
  return results;
};

const isValid = (schematic: string[][]) => (numberPos: NumberPos) => {
  const height = schematic.length;
  const width = schematic[0].length;

  const left = max([numberPos.start - 1, 0])!;
  const right = min([numberPos.end + 1, width - 1])!;
  const top = max([numberPos.y - 1, 0])!;
  const bottom = min([numberPos.y + 1, height - 1])!;

  for (let x = left; x <= right; x++) {
    for (let y = top; y <= bottom; y++) {
      const c = schematic[y][x];
      if (c !== "." && (c < "0" || c > "9")) {        
        return true;
      }
    }
  }
  return false;
};

const input = fs.readFileSync(0).toString();
const schematic = input.split("\n").map((line) => line.split(""));
const numberPositions = schematic.flatMap((line, i) => getNumbers(line, i));
const validNumbers = numberPositions.filter(isValid(schematic));
console.log(sum(validNumbers.map(x => x.value)));
