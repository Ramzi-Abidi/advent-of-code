const fs = require("fs");

const solve = () => {
    const isNumber = (n) => {
        const s = "123456789";
        return s.indexOf(n) !== -1;
    };

    const hash = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    };

    let ans = 0;
    const data = fs.readFileSync("input.txt", "utf8");
    const lines = data.split("\n");
    lines.forEach((line) => {
        const trimmedLine = line.trim(); // Remove leading/trailing whitespace or newline characters
        let chres = "";
        let i = 0;
        while (i < trimmedLine.length) {
            if (isNumber(trimmedLine[i])) {
                chres += trimmedLine[i];
            } else if (trimmedLine.substr(i, 3) in hash) {
                chres += hash[trimmedLine.substr(i, 3)];
            } else if (trimmedLine.substr(i, 4) in hash) {
                chres += hash[trimmedLine.substr(i, 4)];
            } else if (trimmedLine.substr(i, 5) in hash) {
                chres += hash[trimmedLine.substr(i, 5)];
            }
            i++;
        }
        let num = Number(`${chres[0]}${chres[chres.length - 1]}`);
        ans += num;
    });
    return ans;
};

console.log(solve());
