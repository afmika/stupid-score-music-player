function customRound (n) {
    const d = 10;
    return Math.round(n * d) / d;
}

function convertDatasToBasicCoordinate () {
    const parsed_list = parseDatas ();
    let base_dist = 20;
    let y_scale = 20;
    let offset = 0;
    let max_y = -Infinity;

    let ans = parsed_list.map (curr => {
        const {octave, note} = curr;
        // x value
        let delta =  base_dist * curr.ratio;
        let x_value = offset + delta;
        // y value
        let y_value = octave ? note_oct[octave][note] : 0;
        y_value /= y_scale;
        max_y = Math.max(max_y, y_value);
        
        offset = x_value;
        return [x_value, y_value].map(customRound);
    });

    return ans;
}

// example
function constructRelativeHeight () {
    let coords = convertDatasToBasicCoordinate ();
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
    let temp = parseDatas().map(it => {
        if (it.note == null) return 'R'; // rest
        if (it.octave == '4')
            it.note = '(130/12)+' + it.note; // NO DOTS !!
        it.note = it.note.replace(/[#.]/g, '');
        return it.note + (it.note.includes('D') ? '_1' : '')+ (it.note.includes('#') ? '_s' : '')
    });
    let res = [];
    for (let note of temp) {
        res.push(note)
        res.push ('R');
    }
    return res;
}

console.log(
    '[' +
    constructRelativeHeight ().map(v => {
            const [x, y] = v;
            return `(${x}, ${y})`;
        }).join(', ')
    + ']'
)


console.log(
    '[' +
    convertDatasToBasicCoordinate ().map(v => {
            const [x, y] = v;
            return `(${x}, ${y})`;
        }).join(', ')
    + ']'
)

console.log(
    '[' +
    constructNoteWithAbsFunction ()
    + ']'
)