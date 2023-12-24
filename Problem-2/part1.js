// const fs = require("fs");

// const solve = () => {
//     // Read the contents of the text file
//     fs.readFile("input1.txt", "utf8", (err, data) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         const games = data.split("\n"); // Split text into lines

//         function possibleGames(games, red, green, blue) {
//             const possible = [];

//             games.forEach((game) => {
//                 const cubes = game
//                     .split(":")[1] // Get the part after the game ID
//                     .split(";") // Split individual sets of cubes
//                     .map((set) => set.trim().split(", ")); // Split cubes of each set
//                 console.log(cubes);
//                 let redCount = 0,
//                     greenCount = 0,
//                     blueCount = 0;
//                 cubes.forEach((set) => {
//                     set.forEach((cube) => {
//                         if (cube !== undefined) {
//                             const [count, color] = cube.split(" ");
//                             if (color === "red")
//                                 redCount = parseInt(count);
//                             else if (color === "green")
//                                 greenCount = parseInt(count);
//                             else if (color === "blue")
//                                 blueCount = parseInt(count);
//                             if(redCount <= red && greenCount <= green && blueCount <=blue) {
//                                 possible.push(game.split(":")[0].split(" ")[0])
//                             }
//                         }
//                     });
//                 });
//                 console.log(redCount, greenCount, blueCount);
//                 if (
//                     redCount === red &&
//                     greenCount === green &&
//                     blueCount === blue
//                 ) {
//                     const gameID = parseInt(game.split(":")[0].split(" ")[1]);
//                     possible.push(gameID);
//                 }
//             });

//             return possible;
//         }

//         const possibleGameIDs = possibleGames(games, 12, 13, 14);
//         const sumOfIDs = possibleGameIDs.reduce((sum, id) => sum + id, 0);

//         console.log("Possible game IDs:", possibleGameIDs);
//         console.log("Sum of their IDs:", sumOfIDs);
//     });
// };

// console.log(solve());

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
            const possible = [];

            games.forEach((game) => {
                const cubes = game
                    .split(":")[1] // Get the part after the game ID
                    .split(";") // Split individual sets of cubes
                    .map((set) => set.trim().split(", ")); // Split cubes of each set
                let redCount = 0,
                    greenCount = 0,
                    blueCount = 0;
                console.log("cubes", cubes);
                let ok = true;

                cubes.forEach((set) => {
                    set.forEach((cube) => {
                        if (cube !== undefined) {
                            const [count, color] = cube.split(" ");
                            if (color === "red") redCount = parseInt(count);
                            else if (color === "green")
                                greenCount = parseInt(count);
                            else if (color === "blue")
                                blueCount = parseInt(count);
                            if (
                                redCount > red ||
                                greenCount > green ||
                                blueCount > blue
                            ) {
                                ok = false;
                            }
                        }
                    });
                });
                console.log(redCount, greenCount, blueCount);
                if (ok) {
                    possible.push(game.split(":")[0].split(" ")[1]);
                    // possible.push(game.split(":")[0]);
                }
            });

            return possible;
        }

        const possibleGameIDs = possibleGames(games, 12, 13, 14);
        console.log("aa", possibleGameIDs);
        let sum = 0;
        possibleGameIDs.forEach((el) => {
            sum += parseInt(el);
        });
        console.log(sum);
    });
};

console.log(solve());
