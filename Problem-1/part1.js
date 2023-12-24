const fs = require("fs");

const solve = () => {
    const isNumber = (n) => {
        const s = "123456789";
        return s.indexOf(n) !== -1;
    };

    let ans = 0;
    const data = fs.readFileSync("input.txt", "utf8");

    const lines = data.split("\n");
    lines.forEach((line) => {
        const trimmedLine = line.trim(); // Remove leading/trailing whitespace or newline characters
        let chres = "";
        for (const c of trimmedLine) {
            if (isNumber(c) == true) {
                chres += c;
            }
        }
        let num = Number(`${chres[0]}${chres[chres.length - 1]}`);
        ans += num;
    });
    return ans;
};

console.log(solve());
