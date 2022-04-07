/**
 * @author afmika
 * Apr 2022
 */

// octave => {[note : freq]}
// personal choices
const note_oct = {
    '_MADE_UP_' : {
        '_' : 100
    },
    // octave 3
    // fundamental freq = f0 = 130.8 = C
    // Th 1. half-step : fn+1 ~ 2^(1/12) * fn => fn = 2^(n/12) * f0
    // Th 2. freq note X current octave = 2 * (freq note X previous octave)
    //  => 1 full octave means we have done (2^(1/12)) 12 times (hence the multiplicator is 2)
    // [Note] 16/15 is a good rational close to 2^(1/12)
    '3' : {
        'C' : 130.812782650299317,
        'C#' : 138.591315488436048,
        'D' : 146.832383958703780,
        'D#' : 155.563491861040455,
        'E' : 164.813778456434964,
        'F' : 174.614115716501942,
        'F#' : 184.997211355817199,
        'G' : 195.997717990874647,
        'G#' : 207.652348789972569,
        'A' : 220.000000000000000,
        'A#' : 233.081880759044958,
        'B' : 246.941650628062055
    },
    // octave 4
    '4' : {
        'C' : 261.625565300598634,
        'C#' : 277.182630976872096,
        'D' : 293.664767917407560,
        'D#' : 311.126983722080910,
        'E' : 329.627556912869929,
        'F' : 349.228231433003884,
        'F#' : 369.994422711634398,
        'G' : 391.995435981749294,
        'G#' : 415.304697579945138,
        'A' : 440.000000000000000,
        'A#' : 466.163761518089916,
        'B' : 493.883301256124111
    }
};

/**
 * Sample based on 
 * Lanzhu Zhong - Eutopia (Love Live Nijigasaki HS)
 * I ain't much but it's honest work.
 */ 
const datas_notes = `
    4   : L
    1.  : S
    1.  : S
    #6  : M
    1.  : S
    #1. : S
    1.  : S
    : SS
    4   : L
    1.  : S
    1.  : S
    #6  : M
    #1. : M
    1.  : S
    : SS
    4   : L
    1.  : S
    1.  : S
    #6  : L
    #1. : L
    1.  : S
    : S
    4 : S
    1. : S
    : SS

    4 : L
    4 : M
    4 : S
    1. : L
    #6 : S
    #6 : M
    #5 : S
    #5 : M
    : SS
    4 : S
    4 : S
    4 : S
    1. : M
    #6 : S
    #6 : M
    #5 : S
    1. : S
    : SS

    #5 : L
    #5 : M
    #6 : S
    1. : M
    #6 : L
    #5 : L
    #5 : M
    #4 : L
    #5 : M
    #5 : M
    : SS
    4  : L
    #2. : M
    1.  : M
    #6 : S
    #6 : M
    #5 : S
    #5 : M

    : SS
    4 : L
    #5 : M
    #6 : M
    1. : L
    : SS
    #6 : L
    : L
    #1. : L
    : SS
    1. : M
    : SS
    1. : M

    #5 : L
    5  : M
    #5 : L
    #5 : M
    #1 : S
    : M
    #5 : L
    5  : M
    #5 : L
    #5 : M
    #2 : S
    : M
    #5 : L
    5  : M
    #5 : L
    #5 : M

    : S
    4 : L
    #5 : M
    #6 : M
    1. : M
    #6 : S
    #6 : S
    #5 : S
    #5 : S
    : M
    
    #5 : L
    5  : M
    #5 : L
    #5 : M
    #1 : S
    : M
    #5 : L
    5  : M
    #5 : L
    #5 : M
    #2 : S
    : M
    #5 : L
    5  : M
    #5 : L
    #5 : M
    : S
`;

