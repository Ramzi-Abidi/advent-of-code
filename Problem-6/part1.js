const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
    const input = data.split("\n");

    const [, ...times] = input[0]
        .split(" ")
        .filter((x) => x.length)
        .map(Number);

    const [, ...dist] = input[1]
        .split(" ")
        .filter((x) => x.length)
        .map(Number);

    let result = times.reduce((acc, time, i) => {
        console.log("acc", acc);
        const delta = Math.sqrt(time * time - 4 * dist[i]); // b² - 4ac

        // x(7-x) > 9 <=> 7x - x² - 9 > 0
        const x1 = (-1 * time + delta) / -2;
        const x2 = (-1 * time - delta) / -2;

        const min = Math.floor(Math.min(x1, x2));
        const max = Math.ceil(Math.max(x1, x2)) - 1;

        const count = max - min;

        acc *= count;
        return acc;
    }, 1);

    console.log(result);
});
