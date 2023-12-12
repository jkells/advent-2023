    import * as fs from "fs";
    import { sum, trim, intersection, compact } from "lodash";
    
    const points = fs.readFileSync(0).toString().split("\n").map(line => {
        const [_, game] = line.split(":");
        const [winners, player] = game.split("|");
        const readNumbers = (x: string) => compact(x.split(" ").map(trim));
        const matches = intersection(readNumbers(winners), readNumbers(player));
        return matches.length > 0 ? Math.pow(2, matches.length -1) : 0;
    });
    console.log(sum(points));
