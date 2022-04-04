function customRound (n) {
    const d = 10;
    return Math.round(n * d) / d;
}
function convertDatasToBasicCoordinate () {
    const parsed_list = parseDatas ();
    let base_dist = 10;
    let y_scale = 2;
    let offset = 0;
    let temp_nax_y = -Infinity;
    let ans = parsed_list.map (curr => {
        let y_value = curr.octave ? note_oct[curr.octave][curr.note] : 0;
        y_value /= y_scale;
        let x_value = offset + base_dist * curr.ratio;
        offset = x_value;
        temp_nax_y = Math.max(temp_nax_y, y_value);
        return [
            x_value,
            y_value
        ].map(customRound);
    });

    ans = ans.map(v => [v[0], v[1] -( temp_nax_y / 2)].map(customRound));
    
    console.log('min', -temp_nax_y / 2, temp_nax_y / 2);
    return ans;
}

// example
console.log(
    convertDatasToBasicCoordinate ()
        .map(v => '('+v.join(',')+')')
        .join(',')
)