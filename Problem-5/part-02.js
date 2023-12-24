// const fs = require("fs");
// // solving the puzzle takes (my computer) 0.037s

// const seedRanges = [];

// const MAPS = [];

// function main() {
//     processInput();

//     const ranges = search();

//     let best = ranges[0].start;

//     for (const range of ranges) {
//         if (range.start < best) {
//             best = range.start;
//         }
//     }

//     console.log("the answer is", best);
// }

// ///////////////////////////////////////////////////////////

// function processInput() {
//     const input = fs.readFileSync("input2.txt", "utf-8").trim();

//     const parts = input.split("\n\n");

//     fillSeedRanges(parts.shift().split(":").pop().trim().split(" "));

//     while (true) {
//         const part = parts.shift();

//         if (part == undefined) {
//             break;
//         }

//         const lines = part.split(":").pop().trim().split("\n");

//         MAPS.push(createMap(lines));
//     }
// }

// function fillSeedRanges(tokens) {
//     while (tokens.length != 0) {
//         const start = parseInt(tokens.shift());

//         const length = parseInt(tokens.shift());

//         const end = start + length - 1;

//         seedRanges.push(createRangeObj(start, end));
//     }
// }

// function createMap(lines) {
//     const map = [];

//     for (const line of lines) {
//         const tokens = line.trim().split(" ");

//         const destinyStart = parseInt(tokens.shift());

//         const sourceStart = parseInt(tokens.shift());

//         const length = parseInt(tokens.shift());

//         const destinyEnd = destinyStart + length - 1;

//         const sourceEnd = sourceStart + length - 1;

//         const delta = destinyStart - sourceStart;

//         map.push(
//             createMapObj(
//                 sourceStart,
//                 sourceEnd,
//                 destinyStart,
//                 destinyEnd,
//                 delta,
//             ),
//         );
//     }
//     return map;
// }

// function createRangeObj(start, end) {
//     return { start: start, end: end };
// }

// function createMapObj(sourceStart, sourceEnd, destinyStart, destinyEnd, delta) {
//     return {
//         source: createRangeObj(sourceStart, sourceEnd),
//         destiny: createRangeObj(destinyStart, destinyEnd),
//         delta: delta,
//     };
// }

// ///////////////////////////////////////////////////////////

// function search() {
//     let ranges = seedRanges;

//     for (const map of MAPS) {
//         ranges = searchThis(ranges, map);
//     }

//     return ranges;
// }

// function searchThis(oldRanges, map) {
//     const newRanges = [];

//     for (const oldRange of oldRanges) {
//         const doneRanges = [];

//         for (const mapObj of map) {
//             const start = Math.max(oldRange.start, mapObj.source.start);

//             const end = Math.min(oldRange.end, mapObj.source.end);

//             if (start > end) {
//                 continue;
//             }

//             const newRange = createRangeObj(
//                 start + mapObj.delta,
//                 end + mapObj.delta,
//             );

//             newRanges.push(newRange);

//             doneRanges.push(createRangeObj(start, end));
//         }

//         for (const newRange of fillRangeGaps(oldRange, doneRanges)) {
//             newRanges.push(newRange);
//         }
//     }
//     return newRanges;
// }

// function fillRangeGaps(oldRange, doneRanges) {
//     const newRanges = [];

//     sortRanges(doneRanges);

//     let start = oldRange.start;

//     while (doneRanges.length > 0) {
//         const doneRange = doneRanges.shift();

//         if (start < doneRange.start) {
//             newRanges.push(createRangeObj(start, doneRange.start - 1));
//         }

//         start = doneRange.end + 1;
//     }

//     if (start < oldRange.end) {
//         // closing the right end

//         newRanges.push(createRangeObj(start, oldRange.end));
//     }

//     return newRanges;
// }

// ///////////////////////////////////////////////////////////

// function sortRanges(list) {
//     let n = -1;

//     while (true) {
//         n += 1;

//         const current = list[n];
//         const next = list[n + 1];

//         if (next == undefined) {
//             return;
//         }

//         if (current.start <= next.start) {
//             continue;
//         }

//         list[n] = next;
//         list[n + 1] = current;

//         n = -1;
//     }
// }

// main();
const fs = require('node:fs');
let answerB = -1;
try {
    const input = fs.readFileSync('input2.txt', 'utf8') + "\r\n"; //hack to add new lines to end to trigger output cal at end of loop
    const lines = input.split("\r\n");
    const seeds = lines[0].match(/\d+/g);
    let maxSeed = 0;
    let seedRange = [];
    for(let a = 0; a < seeds.length; a+=2) {
        let seedStart = (seeds[a] * 1);
        let seedSize = (seeds[a+1] *1);
        let seedEnd = seedStart + seedSize - 1;
        seedRange.push({start:seedStart,end:seedEnd});
        maxSeed = Math.max(maxSeed,seedEnd);
    }
    console.log({seedRange,maxSeed});

    //now work from location 0 to something huge like maxSeed
    for(let i = 0; i <= maxSeed; i++) {
        if(i%100000 == 0) console.log('Checking next range', i);
        //work backwards through the mapings
        let output = -1;
        let input = i;
        for(let row = lines.length-1; row >= 1; row--) {
            const line = lines[row];
            if(line.trim() == '') {
                if(output == -1) output = input;
                //console.log(`${input} ==> ${output}`);
                input = output;
                output = -1;
            }
            else {
                if(line.indexOf(":") != -1) {
                    //console.log(line);
                }
                else if(output == -1) {
                    const bits = line.match(/\d+/g);
                    if(input >= (bits[0] * 1) && input < (bits[0] * 1) + (bits[2] * 1)) {
                        output = input + (bits[1] * 1) - (bits[0] * 1);
                    }
                }
            }
        }
        //console.log({i,input});
        let found = false;
        seedRange.forEach((sr) => {
            if(input >= sr.start && input <= sr.end) {
                found = true;
            }
        });
        if(found) {
            answerB = i;
            break;
        }
    }


}
catch(e) {
    console.error(e);
}

console.log("The answer to part 2 is:", answerB);