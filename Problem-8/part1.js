const fs = require("fs");

const createGraph = (g, el, l, r) => {
    if (el in g === false) {
        g[el] = [];
        g[el].push(l);
        g[el].push(r);
    }
};

fs.readFile("input2.txt", "utf-8", (err, data) => {
    // console.log(data);

    let lines = data.split("\n").map((el) => el.replace("\r", ""));
    lines = lines.filter((el) => {
        return el !== "";
    });

    const directions = lines[0];

    // console.log("dir:", directions);

    const graph = {};
    const keys = [];
    lines.forEach((el, index) => {
        if (index !== 0) {
            const line = el.split(" = (");
            let child1 = line[1].split(",")[0].trim();
            let child2 = line[1].split(",")[1].trim();
            child2 = child2.slice(0, child2.length - 1);
            keys.push(line[0]);
            createGraph(graph, line[0], child1, child2);
        }
    });

    let curr = "AAA";

    let k = 0;
    let count = 0;
    while (curr !== "ZZZ") {
        if (k >= directions.length) k = 0;
        const arr = graph[curr];
        if (directions[k] === "L") {
            curr = arr[0];
        } else {
            curr = arr[1];
        }
        k++;
        count++;
    }
    console.log(count);
});
