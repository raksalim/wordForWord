let CURR_WRITTEN = ``
let FILENAME = `WordForWord`
let NUMBER_OF_SHOW_WRITTEN_ALLOWED = 5
let NUMBER_OF_SHOW_WRITTEN_REMAINING = 5
let WORD_COUNT = 0
let WORD_GOAL = 100;
let PERCENT_COMPLETE = 0;



window.onbeforeunload = function(e) {
    
        if (WORD_COUNT > 10) {
        var text = CURR_WRITTEN;
        var filename = `${FILENAME}.txt`;
        download(filename, text);
        let dialogText = "Are you sure you want to leave? All your writting will be lost!"
        e.returnValue = dialogText;
        return dialogText
    }
    
};

document.getElementById("done-button").innerText = `Show Written (${NUMBER_OF_SHOW_WRITTEN_REMAINING}/${NUMBER_OF_SHOW_WRITTEN_ALLOWED} left)`;
document.addEventListener("click", reclickInputField)

// Add word in input field to file and clear out input field
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {

        if (document.getElementById("main-input").value != " ") {
            CURR_WRITTEN += `${document.getElementById("main-input").value}`
            WORD_COUNT += 1;
        }

        document.getElementById("main-input").value = ""

    } else if (event.code === "Enter"){

        if (document.getElementById("main-input").value != "") {
            WORD_COUNT += 1;
        }

        CURR_WRITTEN += `${document.getElementById("main-input").value}\n`
        document.getElementById("main-input").value = ""

    } else if ( event.code === "Tab" ) {
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

// hide-written button clicked
document.getElementById("hide-written").addEventListener("click", hideWrittenAndControls);

// document.getElementById("copy-written").addEventListener("click", copyWritten);

// Display what is already written to the user
document.getElementById("done-button").addEventListener("click", showWrittenAndControls)

// Start file download.
document.getElementById("download-button").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = CURR_WRITTEN;
    var filename = `${FILENAME}.txt`;
    
    download(filename, text);
}, false);

document.getElementById("progress-bar").style.width = `${PERCENT_COMPLETE}%`;


function showWrittenAndControls() {
    showWritten()
    showClearWrittenButton()
    showDownloadButton()
    deincrementShowButtons()
}

function hideWrittenAndControls() {
    hideWritten()
    hideClearWrittenButton()
    hideDownloadButton()
}


function showWritten(){
    console.log(CURR_WRITTEN);
    document.getElementById("written").innerText = CURR_WRITTEN;
}

function hideWritten(){
    document.getElementById("written").innerText = "";
}

function showClearWrittenButton() {
    document.getElementById("hide-written").style.visibility = "visible";
}

function hideClearWrittenButton() {
    document.getElementById("hide-written").style.visibility = "hidden";
}

function showDownloadButton () {
    document.getElementById("download-button").style.visibility = "visible";
}

function hideDownloadButton () {
    document.getElementById("download-button").style.visibility = "hidden";
}

function reclickInputField () {
    console.log("reclicked")
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

function deincrementShowButtons () {
    NUMBER_OF_SHOW_WRITTEN_REMAINING -= 1;

    if (NUMBER_OF_SHOW_WRITTEN_REMAINING > 1){
        document.getElementById("done-button").innerText = `Show Written (${NUMBER_OF_SHOW_WRITTEN_REMAINING}/${NUMBER_OF_SHOW_WRITTEN_ALLOWED} left)`;
    } else {
        document.getElementById("done-button").innerText = `Show Written (Amazing Going! <3)`;
    }
}

function updateWordCount () {

    document.getElementById("word-count").innerText = `Word Count: ${WORD_COUNT}/${WORD_GOAL}`;
    
}

function updatePercentComplete () {

    PERCENT_COMPLETE = parseInt((WORD_COUNT/WORD_GOAL) * 100)
    document.getElementById("progress-bar").style.width = `${PERCENT_COMPLETE}%`;
    document.getElementById("progress-bar").innerText = `${PERCENT_COMPLETE}%`;
}

function copyWritten() {
    /* Get the text field */
    let copyText = document.getElementById("written");
  
    /* Select the text field */
    copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }