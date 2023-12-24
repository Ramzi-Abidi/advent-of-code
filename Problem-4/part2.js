const fs = require("fs");

const solve = () => {
    // Read the contents of the text file
    fs.readFile("input1.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const cards = data.split("\n"); // split text into lines
        console.log(cards.length);
        const cardCount = new Array(cards.length).fill(1);

        cards.forEach((line, index) => {
            const arr = line.split(":")[1];
            let winningCards = arr.split(" | ")[0].trim().split(" ");
            let myCards = arr.split(" | ")[1].trim().split(" ");
            winningCards = winningCards.filter((el) => el !== "" && el !== " ");
            myCards = myCards.filter((el) => el !== "" && el !== " ");

            const point = myCards.filter((x) =>
                winningCards.includes(x),
            ).length;
            console.log(point);
            if (point) {
                for (let i = index + 1; i < index + 1 + point; i++) {
                    cardCount[i] += cardCount[index] || 0;
                }
            }
        });

        console.log(cardCount.reduce((acc, v) => acc + v, 0));
    });
};

console.log(solve());
