const Queue = require("./queue");

function scan(map) {
  const result = {
    ceil: 0,
    floor: 0,
    both: 0,
    isolated: 0,
  };

  const dictionary = {};

  function bfs(tuple, height, width) {
    let queue = new Queue();

    queue.enqueue(tuple);

    dictionary[`${tuple.x},${tuple.y}`] = true;

    let ceil = false;
    let floor = false;

    while (queue.size() !== 0) {
      let newTuple = queue.dequeue();

      if (!ceil && newTuple.y === 0) {
        ceil = true;
      }

      if (!floor && newTuple.y === height - 1) {
        floor = true;
      }

      for (let xx = -1; xx <= 1; xx++) {
        for (let yy = -1; yy <= 1; yy++) {
          if (isCorrectMove(newTuple, { x: xx, y: yy }, height, width)) {
            const x = newTuple.x + xx;
            const y = newTuple.y + yy;

            if (map[y][x] === 1 && !(`${x},${y}` in dictionary)) {
              queue.enqueue({ x, y });
              dictionary[`${x},${y}`] = true;
            }
          }
        }
      }
    }

    if (floor && ceil) {
      result.both++;
    } else if (floor) {
      result.floor++;
    } else if (ceil) {
      result.ceil++;
    } else {
      result.isolated++;
    }
  }

  const height = map.length;

  for (let y = 0; y < height; y++) {
    const width = map[y].length;

    for (let x = 0; x < width; x++) {
      if (map[y][x] === 1 && !(`${x},${y}` in dictionary)) {
        bfs({ x, y }, height, width);
      }
    }
  }

  return result;
}

function isCorrectMove(tuple, movement, height, width) {
  return (
    tuple.y + movement.y >= 0 &&
    tuple.y + movement.y < height &&
    tuple.x + movement.x >= 0 &&
    tuple.x + movement.x < width &&
    (movement.x !== 0 || movement.y !== 0) &&
    (movement.x === 0 || movement.y === 0)
  );
}

module.exports = scan;
