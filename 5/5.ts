import * as fs from "fs";
import { sum, trim, intersection, compact, min } from "lodash";

type Mapping = { from: string; to: string; mappings: number[][] };

const readNumbers = (x: string) => compact(x.split(" ").map(trim)).map((x) => parseInt(x, 10));
const lines = fs.readFileSync(0).toString().split("\n");
let seeds: number[] = [];
const maps: Mapping[] = [];
let currentMap: Mapping | null = null;

for (const line of lines) {
  if (line.includes("seeds:")) {
    seeds = readNumbers(line.split(":")[1]);
  } else if (line.includes("map:")) {
    const mapTitle = trim(line.split(" ")[0]);
    const [from, to] = mapTitle.split("-to-");
    currentMap = {
      from,
      to,
      mappings: [],
    };
    maps.push(currentMap);
  } else if (currentMap) {
    currentMap.mappings.push(readNumbers(line));
  }
}

const getLocation = (seedId: number) => {
  let currentCategory = "seed";
  let currentId = seedId;
  let search = 0;
  while (true) {
    const nextCategoryMap = maps.find((x) => x.from === currentCategory);
    if (!nextCategoryMap) {
      throw new Error("No map");
    }
    const nextMapping = nextCategoryMap?.mappings.find((x) => currentId >= x[1] && currentId <= x[1] + x[2]);
    const nextId = nextMapping ? nextMapping[0] + (currentId - nextMapping[1]) : currentId;
    // console.log(`${currentCategory} (${currentId}) maps to ${nextCategoryMap?.to} (${nextId})`);
    currentCategory = nextCategoryMap?.to;
    currentId = nextId;
    if (currentCategory === "location") {
      return currentId;
    }
    search++;
    if(search > 10){
        throw new Error()
    }
  }
};

let results: number[] = [];
for(let i = 0; i <= (seeds.length /2); i+=2) {
    const start = seeds[i];
    const range = seeds[i+1];
    for (let j = 0; j<range; j+=1000) {
        results.push(getLocation(start + j));
    }
}


console.log(min(results))
