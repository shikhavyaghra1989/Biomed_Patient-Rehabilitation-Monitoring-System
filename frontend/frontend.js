const showReport =() => {
    //ajax call to the the 3rd and 4th api
    const DOMStrings = {
        download_button: document.getElementById("download-report"),
        report_heading: document.getElementById("report_heading")
    };

    DOMStrings.download_button.disabled = false;
    DOMStrings.report_heading.innerHTML = "Report"
}

const getData =() => {
    //ajax call to the api for frames 2nd api
    //update frame and table
    const DOMStrings = {
        download_button: document.getElementById("download-report"),
        report_heading: document.getElementById("report_heading")
    };

    DOMStrings.download_button.disabled = true;
    DOMStrings.report_heading.innerHTML = "Current Activity"
}
