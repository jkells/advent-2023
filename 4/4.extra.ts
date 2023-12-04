import * as fs from "fs";
import { sum, trim, intersection, compact } from "lodash";

const input = fs.readFileSync(0).toString();
const lines = input.split("\n");
const cards = lines.map((line) => {
  const [card, game] = line.split(/:/);
  const [winners, player] = game.split("|");
  const parsed = {
    card: parseInt(card.substring(4), 10),
    winners: compact(trim(winners).split(" ")).map((x) => parseInt(x, 10)),
    player: compact(trim(player).split(" ")).map((x) => parseInt(x, 10)),
  };
  const matches = intersection(parsed.winners, parsed.player);
  return {
    count: 1,
    card,
    matchCount: matches.length,
  };
});

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  for (let j = 0; j < card.matchCount; j++) {
    const mutateCard = cards[i + j + 1];
    if (mutateCard) {
      mutateCard.count += card.count;
    }
  }
}

console.log(sum(cards.map((card) => card.count)));
