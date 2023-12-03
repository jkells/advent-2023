import * as fs from "fs";
import { min, max, sum, xor } from "lodash";

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

const getGears = (chars: string[], y: number): { x: number; y: number }[] => {
  const results: { x: number; y: number }[] = [];
  for (let x = 0; x < chars.length; x++) {
    if (chars[x] === "*") {
      results.push({
        y,
        x,
      });
    }
  }
  return results;
};

const numbersNextToGears = (
  schematic: string[][],
  gear: { x: number; y: number },
  numberPoses: NumberPos[]
): NumberPos[] => {
  const height = schematic.length;
  const width = schematic[0].length;

  const left = max([gear.x - 1, 0])!;
  const right = min([gear.x + 1, width - 1])!;
  const top = max([gear.y - 1, 0])!;
  const bottom = min([gear.y + 1, height - 1])!;

  return numberPoses.filter((numberPos) => {
    if (numberPos.y < top || numberPos.y > bottom) {
      return false;
    }

    if (numberPos.end < left || numberPos.start > right) {
      return false;
    }

    return true;
  });
};

const input = fs.readFileSync(0).toString();
const schematic = input.split("\n").map((line) => line.split(""));
const numberPositions = schematic.flatMap((line, i) => getNumbers(line, i));
const gears = schematic.flatMap((line, i) => getGears(line, i));
const gearsWithAdjacent = gears.map((gear) =>
  numbersNextToGears(schematic, gear, numberPositions)
);
const twoOnly = gearsWithAdjacent.filter((gear) => gear.length === 2);
const powers = twoOnly.map((gear) => gear[0].value * gear[1].value);
console.log(sum(powers));
