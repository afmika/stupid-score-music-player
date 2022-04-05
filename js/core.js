/**
 * @author afmika
 * Apr 2022
 */

const audioContext = new (window.AudioContext || window.webkitAudioContext) ();
const volume = 0.2; // between 0 and 1
const default_waveform_type = 'triangle'; // sine, square, sawtooth, triangle ?
const base_tempo_sec = 0.4; // 1/8, 1/4, 1/2 will be computed based on this value

// main gain node setup
const mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = volume;

const note_map = 'CDEFGAB';
const ratio_map = {
    'SS' : 1 / 4,
    'S' : 1 / 2,
    'M' : 3 / 4, 
    'L' : 1
};

function parseDatas () {
    let result = [];
    let notes = datas_notes
                    .replace(/[ \t]+/g, '')
                    .split(/[\n\r/]+/g);
    for (let note of notes) {
        let [code, len_str] = note.split(':');
        if (len_str) {
            const ratio = ratio_map [len_str] || ratio_map['M'];
            let valid = /[1-7]/;
            let octave = null, note_final = null;

            if (valid.test (code)) {
                octave = code.endsWith ('.') ? '4' : '3';
                let index = code.match (valid).shift();
                note_final = note_map [ -1 + parseInt(index) ];
                if (code.includes('#')) note_final += '#';
            }

            result.push ({
                note : note_final,
                octave : octave,
                ratio : ratio,
                orig : note
            });

            // forced silence
            result.push ({
                note : null,
                octave : null,
                ratio : 0.1,
                orig : null,
                forced_sil : true
            });
        }
    }
    return result;
}

/**
 * @param {number} freq 
 * @param {number} duration_sec
 * @param {string} waveform_type sine, square, sawtooth, triangle 
 */
function playRawDuration (freq, duration_sec, waveform_type) {
    let oscillator = audioContext.createOscillator();
    oscillator.connect(mainGainNode);
    oscillator.type = waveform_type || default_waveform_type;
    oscillator.frequency.value = freq;
    oscillator.start();
    return new Promise ((resolve, reject) => {
        setTimeout (() => {
            oscillator.stop();
            resolve(oscillator);
        }, Math.max(10, parseInt(duration_sec * 1000)));
    });
}

function playNote (freq, ratio = 1, waveform_type) {
    if (ratio < 0 || ratio > 1)
        throw Error ('Ratio < 0 or > 1');
    return playRawDuration (freq, ratio * base_tempo_sec, waveform_type);
}

function playSilence (ratio = 1) {
    if (ratio < 0 || ratio > 1)
        throw Error ('Ratio < 0 or > 1');
    return new Promise ((resolve, reject) => {
        setTimeout (() => {
            resolve (true);
        }, ratio * base_tempo_sec * 1000);
    });
}

function test () {
    const at = note_oct['3'];
    playNote (at['A#'], 1).then (osc => {
        console.log('done');
    });
}

async function playSoundData () {
    const parsed_list = parseDatas ();
    for (let curr of parsed_list) {
        if (curr.octave && curr.note) {
            const at = note_oct[curr.octave];
            await playNote (at[curr.note], curr.ratio);
        } else
            await playSilence (curr.ratio);
    }
}