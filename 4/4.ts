import * as fs from "fs";
import { min, max, sum, trim, intersection, compact } from "lodash";

const input = fs.readFileSync(0).toString();
const lines = input.split("\n");
const cards = lines.map(line => {
    const [card, game] = line.split(/:/);
    const [winners, player] = game.split("|");
    const parsed = {
        card: parseInt(card.substring(4), 10),
        winners: compact(trim(winners).split(" ")).map(x => parseInt(x, 10)),
        player: compact(trim(player).split(" ")).map(x => parseInt(x, 10)),        
    }
    const matches = intersection(parsed.winners, parsed.player);
    return {
        card, 
        matches,
        points: matches.length > 0 ? Math.pow(2, matches.length -1) : 0,
    }
});
console.log(cards);
console.log(sum(cards.map(card => card.points)));
