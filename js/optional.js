function customRound (n) {
    const d = 10;
    return Math.round(n * d) / d;
}
function convertDatasToBasicCoordinate () {
    const parsed_list = parseDatas ();
    let base_dist = 10;
    let y_scale = 2;
    let offset = 0;
    let max_y = -Infinity;

    let ans = parsed_list.map (curr => {
        const {octave, note} = curr;
        // x value
        let x_value = offset + base_dist * curr.ratio;
        // y value
        let y_value = octave ? note_oct[octave][note] : 0;
        y_value /= y_scale;
        max_y = Math.max(max_y, y_value);
        
        offset = x_value;
        return [
            x_value,
            y_value
        ].map(customRound);
    });
    
    console.log('max', max_y);
    return ans;
}

// example
console.log(
    convertDatasToBasicCoordinate ()
        .map(v => '('+v.join(',')+')')
        .join(',')
)