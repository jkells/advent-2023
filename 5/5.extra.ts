import { assert } from "console";
import * as fs from "fs";
import { sum, trim, intersection, compact, min, map, sortBy, flattenDeep, sortedUniq, uniq } from "lodash";
import { getLeadingCommentRanges } from "typescript";

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
    const numbers = readNumbers(line);
    if (numbers.length > 0) {
      currentMap.mappings.push(numbers);
    }
  }
}


const getCutoffs = (map: Mapping, start, sourceLen) => {
  const cutOffs = map.mappings.map(([_dest, source, len]) => {
    const mappingStart = source;
    const mappingEnd = source+ len;

    let x: number[] = [];
    if(mappingStart >= start && mappingStart <= start + sourceLen) {
      x.push(mappingStart);
    }
     
    if(mappingEnd >= start && mappingEnd <= start + sourceLen) {
      x.push(mappingEnd);
    }
    return x;
  });
  return uniq(flattenDeep(compact([start, start + sourceLen, cutOffs]))).sort();
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
