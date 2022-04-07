function customRound (n) {
    const d = 10;
    return Math.round(n * d) / d;
}

// example
function constructRelativeHeight (coords) {
    // assuming 0 is the lowest y value
    let first = [0, 0];
    coords = [first, ... coords];
    const res = [first];
    for (let i = 1; i < coords.length; i++) {
        let [ , y1] = coords[i - 1], // prev
            [x2, y2] = coords[i]; // next
        let diff = customRound(y2 - y1);
        res.push([x2, diff]);
    }
    return res;
}

function constructNoteWithAbsFunction () {
    let temp = parseDatas().map(item => {
        if (item.note == null) return 'S'; // rest
        if (item.octave == '4')
            item.note = '2' + item.note; // NO DOTS !!
        let letter = item.note.replace(/[#.]/g, '');
        let copy = letter + (item.note.includes('#') ? '_s' : '');
        const max = (1 / ratio_map['SS']);
        let how_many_times = Math.round(max * item.ratio);
        let arr = new Array(how_many_times).fill(copy);
        return arr;
    });
    let res = [];
    for (let arr of temp) {
        res.push(...arr);
        res.push('S_0'); // forced silence
    }
    return res; // auto flattened by console.log btw
}

// F, F, F, S, F, F, C_s, ...etc
function makeHeightsFromString (list) {
    let scale = 2;
    return list.map (str => {
        if (str.includes('S')) return 0; // S or S_0
        str = str.replace ('_s', '#');
        // example 2C_s, 2*B, 2F
        let oct = str.includes('2') ? '4' : '3';
        str = str.replace (/2|2\*/, '');
        return note_oct[oct][str] / scale;
    });
}

function buildCoords (heights) {
    let dx = 1, x = 0;
    let coords = heights.map(y => {
        x += dx;
        return [x, y].map(customRound);
    });
    return coords;
}

function relativeHeightBasedOnLetters () {
    const heights = makeHeightsFromString (constructNoteWithAbsFunction ());
    let coords = buildCoords (heights);
    return constructRelativeHeight (coords);
}


const sample_heights = makeHeightsFromString (constructNoteWithAbsFunction ());
console.log(
    '[' + sample_heights.map(customRound)
        // buildCoords(sample_heights).map(v => {
        //     const [x, y] = v;
        //     return `(${x}, ${y})`;
        // })
    + ']'
)

console.log(
    '[' +
        relativeHeightBasedOnLetters ().map(v => {
            const [x, y] = v;
            return `(${x}, ${y})`;
        }).join(', ')
    + ']'
)