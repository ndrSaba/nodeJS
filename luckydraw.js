function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));

        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}

luckyDraw("Joe")
    .then((reason) => console.log(reason))
    .catch((error) => console.error(error));

luckyDraw("Sabrina")
    .then((reason) => console.log(reason))
    .catch((error) => console.error(error));

luckyDraw("Carolina")
    .then((reason) => console.log(reason))
    .catch((error) => console.error(error));
    