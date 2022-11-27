const showReport = () => {
    //ajax call to the the 3rd and 4th api
    var REST_CALL = "http://dummyurl/get-report";
    $("#frame-img").attr('src', 'blackBG.jpg');
    // var REST_CALL = "https://www.boredapi.com/api/activity"
    const fetchFinalData = _ => {
        $.ajax(
            {
                type: 'GET',
                url: REST_CALL,
                success: function (data) {
                    document.getElementById("type-data").innerHTML = "Duration";
                    document.getElementById("sitting-prob").innerHTML = data.report.sitting + " minutes";
                    document.getElementById("standing-prob").innerHTML = data.report.standing + " minutes";
                    document.getElementById("sleeping-prob").innerHTML = data.report.sleeping + " minutes";
                    document.getElementById("eating-prob").innerHTML = data.report.eating + " minutes";
                    document.getElementById("falling-prob").innerHTML = data.report.falling + " minutes";
                    document.getElementById("walking-prob").innerHTML = data.report.walking + " minutes";
                    document.getElementById("pain-prob").innerHTML = data.report.pain + " minutes";

                    //
                    // document.getElementById("sitting-prob").innerHTML = data.participants + " seconds";
                    // document.getElementById("standing-prob").innerHTML = data.link + " seconds";
                    // document.getElementById("sleeping-prob").innerHTML = data.key + " seconds";
                    // document.getElementById("eating-prob").innerHTML = data.price + " seconds";
                    // document.getElementById("falling-prob").innerHTML = data.accessibility + " seconds";
                    // document.getElementById("walking-prob").innerHTML = data.participants + " seconds";
                    // document.getElementById("pain-prob").innerHTML = data.accessibility + " seconds";
                    
                },
                error: function (textStatus, errorThrown) {
                    alert("Error!!")
                }
            }
        );
    }

    fetchFinalData()

    const DOMStrings = {
        download_button: document.getElementById("download-report"),
        report_heading: document.getElementById("report_heading")
    };

    DOMStrings.download_button.disabled = false;
    DOMStrings.report_heading.innerHTML = "Report"
}

const getData = () => {
    //ajax call to the api for frames 2nd api
    //update frame and table
    // var SERVER_URL = window.location.protocol + "//" + window.location.host;
    document.getElementById("loader").hidden=true;
    document.getElementById("frame-img").hidden=false;

    var REST_CALL = "http://dummyurl/get-current-activity";

    const fetchApiData = _ => {
        $.ajax(
            {
                type: 'GET',
                url: REST_CALL,
                success: function (data) {
                    if (data === undefined || data.length == 0) {
                    $("#frame-img").attr('src', 'blackBG.jpg');
                        stopTimer()
                    }

                    // Render N frames in 2 second
                    let calcTimeInMs = Math.floor(2*1000 / data.length);
                    for (let i = 0; i < data.length; i++) {
                        setTimeout(_ => setImgData(data[i]), (i + 1) * calcTimeInMs);
                    }
                },
                error: function (textStatus, errorThrown) {
                    alert("Error!!")
                    $("#frame-img").attr('src', 'blackBG.jpg');
                    stopTimer()
                }
            }
        );
    }

    const setImgData = (apidata) => {

        $("#frame-img").attr('src', apidata.current_frame);
        document.getElementById("sitting-prob").innerHTML = apidata.current_activity.sitting;
        document.getElementById("standing-prob").innerHTML = apidata.current_activity.standing;
        document.getElementById("sleeping-prob").innerHTML = apidata.current_activity.sleeping;
        document.getElementById("eating-prob").innerHTML = apidata.current_activity.eating;
        document.getElementById("falling-prob").innerHTML = apidata.current_activity.falling;
        document.getElementById("walking-prob").innerHTML = apidata.current_activity.walking;
        document.getElementById("pain-prob").innerHTML = apidata.current_activity.pain;
    }



    const api_poll = _ => setInterval(_ => fetchApiData(), 2 * 1000);
    const stopTimer = _ => clearInterval(timer);

    let timer = api_poll();

    const DOMStrings = {
        download_button: document.getElementById("download-report"),
        report_heading: document.getElementById("report_heading")
    };

    DOMStrings.download_button.disabled = true;
    DOMStrings.report_heading.innerHTML = "Current Activity"
}

const downloadData = () => {
    // for csv download

    // var csv='';
    // Object.keys(finaldata).forEach(function(key) {
    //       csv+=key+","+finaldata[key]+","
    //       csv += "\n";
    //   })
    // let file = new File([csv], "fe.csv", {
    //     type: "text/plain",
    // });

    // filename="namet"
    // saveAs(file, filename + ".csv");

    var sTable = document.getElementById('table-content-div').innerHTML;

    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
    win.close();

}



$('form').submit(function (e) {
    e.preventDefault();

    var REST_CALL = "http://dummyurl/upload-video"

    var fd = new FormData();
    fd.append('file', $('#file')[0].files[0]);
    $.ajax({
        url: REST_CALL,
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            alert(data.message);
            $('form').find('input:file').val('');
            document.getElementById("loader").hidden=false;
            document.getElementById("frame-img").hidden=true;
        },
        error: function (textStatus, errorThrown) {
            alert("Error!!")
            $('form').find('input:file').val('');
        }
    });
});
