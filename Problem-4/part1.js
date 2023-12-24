const fs = require("fs");

const solve = () => {
    let res = 0;

    // Read the contents of the text file
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const cards = data.split("\n"); // split text into lines

        cards.forEach((line) => {
            let count = 0;
            let i = 0;

            const arr = line.split(":")[1];
            let winningCards = arr.split(" | ")[0].trim().split(" ");
            let myCards = arr.split(" | ")[1].trim().split(" ");
            winningCards = winningCards.filter((el) => el !== "" && el !== " ");
            myCards = myCards.filter((el) => el !== "" && el !== " ");

            myCards.forEach((el) => {
                if (winningCards.indexOf(el) !== -1) {
                    console.log("a", i);
                    if (i === 0) {
                        count++;
                        i++;
                    } else {
                        count *= 2;
                    }
                }
            });
            console.log("count", count);
            res += count;
        });
        console.log("res", res);
    });
};

console.log(solve());
