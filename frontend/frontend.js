const showReport =() => {
    const DOMStrings = {
        download_button: document.getElementById("download-report"),
        report_heading: document.getElementById("report_heading")
    };

    DOMStrings.download_button.disabled = false;
    DOMStrings.report_heading.innerHTML = "Report"
}

const getData =() => {
    const DOMStrings = {
        download_button: document.getElementById("download-report"),
        report_heading: document.getElementById("report_heading")
    };

    DOMStrings.download_button.disabled = true;
    DOMStrings.report_heading.innerHTML = "Current Activity"
}
