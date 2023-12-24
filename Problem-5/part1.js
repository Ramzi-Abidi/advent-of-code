const fs = require("fs");

const solve = () => {
    const mapXtoY = (mapping, X) => {
        let Y = -1;
        for (const row of mapping) {
            const [end, start, count] = row.split(" ").map(Number);
            if (X >= start && X <= start + count) {
                Y = end - start + X;
                break;
            }
        }
        return Y === -1 ? X : Y;
    };

    // Read the contents of the text file
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) {
            return;
        }
        // const sections = text.split(/\n\s*\n/);
        const lines = data.split(/\n\s*\n/); // split text into lines

        const seeds = lines[0]
            .split("\r")[0]
            .split("seeds: ")[1]
            .split(" ")
            .map((el) => Number(el));

        const elements = [];
        lines.forEach((el) => {
            if (el.indexOf("seeds: ") === -1) {
                elements.push(el.split(":"));
            }
        });

        const mappings = [];
        elements.forEach((el) => {
            if (el !== "") {
                mappings.push(el[1].split("\r\n"));
            }
        });
        console.log(mappings);

        let res = seeds
            .map((n) => mapXtoY(mappings[0], n))
            .map((n) => mapXtoY(mappings[1], n))
            .map((n) => mapXtoY(mappings[2], n))
            .map((n) => mapXtoY(mappings[3], n))
            .map((n) => mapXtoY(mappings[4], n))
            .map((n) => mapXtoY(mappings[5], n))
            .map((n) => mapXtoY(mappings[6], n));

        console.log(Math.min(...res));
    });
};

console.log(solve());
