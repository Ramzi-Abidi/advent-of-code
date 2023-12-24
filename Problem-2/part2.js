const fs = require("fs");

const solve = () => {
    // Read the contents of the text file
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const games = data.split("\n"); // Split text into lines

        function possibleGames(games, red, green, blue) {
            let res = 0;

            games.forEach((game) => {
                const cubes = game
                    .split(":")[1] // Get the part after the game ID
                    .split(";") // Split individual sets of cubes
                    .map((set) => set.trim().split(", ")); // Split cubes of each set
                let maxRed = 0,
                    maxGreen = 0,
                    maxBlue = 0;
                console.log("cubes", cubes);

                cubes.forEach((set) => {
                    set.forEach((cube) => {
                        if (cube !== undefined) {
                            const [count, color] = cube.split(" ");
                            let nb = parseInt(count);
                            if (color === "red") maxRed = Math.max(maxRed, nb);
                            else if (color === "green") maxGreen = Math.max(nb, maxGreen);
                            else if (color === "blue") maxBlue = Math.max(maxBlue, nb);
                        }
                    });
                });
                let ans = maxBlue * maxGreen * maxRed;
                console.log(maxRed, maxGreen, maxBlue);
                console.log("mutipl", ans);
                res += ans;
            });

            return res;
        }

        const ans = possibleGames(games, 12, 13, 14);
        console.log(ans);
    });
};

console.log(solve());
