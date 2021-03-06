let CURR_WRITTEN = ``
let FILENAME = `WordForWord`
let NUMBER_OF_SHOW_WRITTEN_ALLOWED = 5
let NUMBER_OF_SHOW_WRITTEN_REMAINING = 5
let WORD_COUNT = 0
let WORD_GOAL = 100;
let PERCENT_COMPLETE = 0;
let MIN_WORD_COUNT_TO_SAVE = 50;
let AUTO_CLICK_INPUT = true;
let MIN_WORD_COUNT_GOAL = 100;
let MAX_WORD_COUNT_GOAL = 10000;

// prevent reload without saving
window.onbeforeunload = function (e) {

    if (WORD_COUNT > MIN_WORD_COUNT_TO_SAVE) {
        var text = CURR_WRITTEN;
        var filename = `${FILENAME}.txt`;
        download(filename, text);
        let dialogText = "Are you sure you want to leave? All your writting will be lost!"
        e.returnValue = dialogText;
        return dialogText
    }

};

// Initial Setup ---------
document.getElementById("done-button").innerText = `Show Written (${NUMBER_OF_SHOW_WRITTEN_REMAINING}/${NUMBER_OF_SHOW_WRITTEN_ALLOWED} left)`;
document.getElementById("progress-bar").style.width = `${PERCENT_COMPLETE}%`;


// Wherever you click on screen the input will be lightlighted
document.addEventListener("click", event => {
    if (AUTO_CLICK_INPUT) {
        reclickInputField();
    }
})

// Add word in input field to file and clear out input field
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {

        if (document.getElementById("main-input").value != " ") {
            CURR_WRITTEN += `${document.getElementById("main-input").value}`
            WORD_COUNT += 1;
        }

        document.getElementById("main-input").value = ""

    } else if (event.code === "Enter") {
        event.preventDefault();

        let modelExists = document.getElementById("clear-written-modal");

        if (document.getElementById("main-input").value != "") {
            WORD_COUNT += 1;
        }

        CURR_WRITTEN += `${document.getElementById("main-input").value}\n`
        document.getElementById("main-input").value = ""

    } else if (event.code === "Tab") {
        event.preventDefault();

        if (document.getElementById("main-input").value != "") {
            WORD_COUNT += 1;
        }

        CURR_WRITTEN += `[TAB] ${document.getElementById("main-input").value}`
        document.getElementById("main-input").value = ""
    }

    updateWordCount();
    updatePercentComplete();
})


// Control Buttons ---------------

// hide-button button clicked
document.getElementById("hide-button").addEventListener("click", hideWrittenAndControls);

// Display what is already written to the user
document.getElementById("done-button").addEventListener("click", showWrittenAndControls)

// Start file download. CURRENTLY DEPRICATED
// document.getElementById("download-button").addEventListener("click", function () {
//     // Generate download of hello.txt file with some content
//     var text = CURR_WRITTEN;
//     var filename = `${FILENAME}.txt`;

//     download(filename, text);

// }, false);



function showWrittenAndControls() {
    showCurrentWritten()
    document.getElementById("hide-button").style.visibility = "visible";
    document.getElementById("copy-button").style.visibility = "visible"
    document.getElementById("clear-button").style.visibility = "visible"
    // document.getElementById("download-button").style.visibility = "visible";
    deincrementShowButtons()
}

function hideWrittenAndControls() {
    document.getElementById("written").innerText = "";
    document.getElementById("hide-button").style.visibility = "hidden";
    document.getElementById("copy-button").style.visibility = "hidden"
    document.getElementById("clear-button").style.visibility = "hidden";
    // document.getElementById("download-button").style.visibility = "hidden";
    revertCopiedToCopy();
}

function reclickInputField() {
    document.getElementById("main-input").select();
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// function download(t,f,m) {
//     try {
//       var b = new Blob([t],{type:m});
//       saveAs(b, f);
//     } catch (e) {
//       window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
//     }
//   }


// function download(filename, text) {
//     var pom = document.createElement('a');
//     pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     pom.setAttribute('download', filename);

//     if (document.createEvent) {
//         var event = document.createEvent('MouseEvents');
//         event.initEvent('click', true, true);
//         pom.dispatchEvent(event);
//     }
//     else {
//         pom.click();
//     }
// }

function deincrementShowButtons() {
    NUMBER_OF_SHOW_WRITTEN_REMAINING -= 1;

    if (NUMBER_OF_SHOW_WRITTEN_REMAINING > 0) {
        document.getElementById("done-button").innerText = `Show Written (${NUMBER_OF_SHOW_WRITTEN_REMAINING}/${NUMBER_OF_SHOW_WRITTEN_ALLOWED} left)`;
    } else {
        document.getElementById("done-button").innerText = `Show Written (Amazing! Keep Going! <3)`;
    }
}

function updateWordCount() {

    document.getElementById("word-count").innerText = `Word Count: ${WORD_COUNT}/${WORD_GOAL}`;

}

function updatePercentComplete() {

    PERCENT_COMPLETE = parseInt((WORD_COUNT / WORD_GOAL) * 100)
    document.getElementById("progress-bar").style.width = `${PERCENT_COMPLETE}%`;
    document.getElementById("progress-bar").innerText = `${PERCENT_COMPLETE}%`;
}

function copyWritten() {

    // show current text
    showCurrentWritten()

    /* Get the text field */
    var copyText = document.getElementById("copy-input");

    copyText.style.visibility = "visible";

    copyText.value = CURR_WRITTEN;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    copyText.style.visibility = "hidden";

    // change button to copied
    changeCopyToCopied();

}

function changeCopyToCopied() {

    let copyButton = document.getElementById("copy-button");
    copyButton.className = "btn btn-success equal-sized-buttons";
    copyButton.innerText = "Copied";

}

function revertCopiedToCopy() {
    let copyButton = document.getElementById("copy-button");
    copyButton.className = "btn btn-outline-secondary equal-sized-buttons";
    copyButton.innerText = "Copy";

}

function clearWritten() {

    // reset app to original state
    CURR_WRITTEN = ``;
    NUMBER_OF_SHOW_WRITTEN_REMAINING = 5;
    WORD_COUNT = 0;
    PERCENT_COMPLETE = 0;

    updateWordCount();
    updatePercentComplete();
    hideWrittenAndControls();


}

// DOM element which needs to enter fullscreen mode
function fullScreenAndFocusMode() {
    let elem = document.querySelector("html");

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
    focusMode();
}

function focusMode() {
    document.documentElement.scrollTop = document.body.scrollTop = 160;
}

function showCurrentWritten () {
    document.getElementById("written").innerText = CURR_WRITTEN;

}

function applySettings () {

    let userWordCountgoal = parseInt(document.getElementById("targetWordCount").value);
    if (userWordCountgoal >= MIN_WORD_COUNT_GOAL && userWordCountgoal <= MAX_WORD_COUNT_GOAL) {
        WORD_GOAL = userWordCountgoal;
    } else {
        userWordCountgoal = WORD_GOAL;
    }

    updateWordCount();
    updatePercentComplete();
    hideIntroWelcomeModal();

}


function showIntroWelcomeModal() {
    $(document).ready(function () {
        $('#intro-settings-modal').modal('show');
        document.querySelector("html").addEventListener("click", event => {
            event.preventDefault();
        })
        AUTO_CLICK_INPUT = false;
    });
}

function hideIntroWelcomeModal() {
    $(document).ready(function () {
        $('#intro-settings-modal').modal('hide');
    });
    AUTO_CLICK_INPUT = true;
}