import { max, sum} from 'lodash';
import * as fs from "fs";

const input = fs.readFileSync(0).toString();

const parseGame = (gamePart: string) => {
    return parseInt(gamePart.substring(5), 10);
}

const parseBall = (ball: string) => {
    const [count, color] = ball.split(" ");
    return {
        color,
        count: parseInt(count, 10)
    }
}

const parseRounds = (roundsPart: string) => {
    const rounds = roundsPart.split(";");
    return rounds.flatMap(roundRaw => {
        const balls = roundRaw.split(",").map(x=>x.trim());
        return balls.map(parseBall);
    })
}

const parseLine = (line: string) => {
    const [gamePart, roundPart] = line.split(":");
    return {
        game: parseGame(gamePart),
        rounds: parseRounds(roundPart)
    }
}

const games = input.split("\n").map(parseLine);

const filtered = games.filter(game => {
    const getMax = (color: string) => {
        return max(game.rounds.filter(r => r.color === color).map(r=>r.count)) ?? 0;
    }

    // only 12 red cubes, 13 green cubes, and 14 blue cubes?
    return getMax("red") <= 12 && getMax("green") <= 13 && getMax("blue") <= 14;
})


console.log(sum(filtered.map(g => g.game)));
