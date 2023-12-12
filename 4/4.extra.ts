    import * as fs from "fs";
    import { trim, intersection, compact, sumBy } from "lodash";
    
    const cards = fs.readFileSync(0).toString().split("\n").map(line => {
        const [_, game] = line.split(":");
        const [winners, player] = game.split("|");
        const readNumbers = (x: string) => compact(x.split(" ").map(trim));
        const matches = intersection(readNumbers(winners), readNumbers(player));
        return {
            count: 1,
            matches: matches.length,
        };
    });
    
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].matches; j++) {    
        cards[i + j + 1].count += cards[i].count;    
      }
    }
    
    console.log(sumBy(cards, "count"));
    