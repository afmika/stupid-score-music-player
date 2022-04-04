document.getElementById ('action_btn').addEventListener ('click', event => {
    // test ();
    playSoundData ().then (_ => {
        console.log('All played...');
    });
});