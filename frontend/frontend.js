const showReport =() => {
    //ajax call to the the 3rd and 4th api
    var REST_CALL = "http://dummyurl/get-report";
    // var REST_CALL ="https://www.boredapi.com/api/activity"
    const fetchFinalData= _ => {
        $.ajax(
            {
               type:'GET',
               url:REST_CALL,
               success: function(data){
                document.getElementById("type-data").innerHTML = "Duration";
                document.getElementById("sitting-prob").innerHTML = data.report.sitting + " minutes";
                document.getElementById("standing-prob").innerHTML = data.report.standing + " minutes";
                document.getElementById("sleeping-prob").innerHTML = data.report.sleeping + " minutes";
                document.getElementById("eating-prob").innerHTML = data.report.eating + " minutes";
                document.getElementById("falling-prob").innerHTML = data.report.falling + " minutes";
                document.getElementById("walking-prob").innerHTML = data.report.walking + " minutes";
                document.getElementById("pain-prob").innerHTML = data.report.pain + " minutes";

                //
                // document.getElementById("sitting-prob").innerHTML = data.participants + " minutes";
                // document.getElementById("standing-prob").innerHTML = data.link + " minutes";
                // document.getElementById("sleeping-prob").innerHTML = data.key + " minutes";
                // document.getElementById("eating-prob").innerHTML = data.price + " minutes";
                // document.getElementById("falling-prob").innerHTML = data.accessibility + " minutes";
                // document.getElementById("walking-prob").innerHTML = data.participants + " minutes";
                // document.getElementById("pain-prob").innerHTML = data.accessibility + " minutes";
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

const getData =() => {
    //ajax call to the api for frames 2nd api
    //update frame and table
    // var SERVER_URL = window.location.protocol + "//" + window.location.host;
    var REST_CALL = "http://dummyurl/get-current-activity";
    
    const fetchImage = _ => {
    $.ajax(
        {
           type:'GET',
           url:REST_CALL,
           success: function(data){
    
            if (typeof  data.current_frame!=="undefined"){
                $("#frame-img").attr('src', data.current_frame);
                document.getElementById("sitting-prob").innerHTML = data.current_activity.sitting;
                document.getElementById("standing-prob").innerHTML = data.current_activity.standing;
                document.getElementById("sleeping-prob").innerHTML = data.current_activity.sleeping;
                document.getElementById("eating-prob").innerHTML = data.current_activity.eating;
                document.getElementById("falling-prob").innerHTML = data.current_activity.falling;
                document.getElementById("walking-prob").innerHTML = data.current_activity.walking;
                document.getElementById("pain-prob").innerHTML = data.current_activity.pain;
            }
            else{
                stopTimer()
            }
           },
           error: function (textStatus, errorThrown) {
            alert("Error!!")
            stopTimer()
        }
        }
     );
    }
    const poll = _ => setInterval(_ => fetchImage(), 2*1000);
    const stopTimer = _ => clearInterval(timer);

    let timer = poll();

    const DOMStrings = {
        download_button: document.getElementById("download-report"),
        report_heading: document.getElementById("report_heading")
    };

    DOMStrings.download_button.disabled = true;
    DOMStrings.report_heading.innerHTML = "Current Activity"
}

const downloadData=() => {
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



$( 'form' ).submit(function ( e ) {
    e.preventDefault();

    var REST_CALL ="http://dummyurl/upload-video"

    var fd = new FormData();    
    fd.append( 'file', $( '#file' )[0].files[0] );
    $.ajax({
    url: REST_CALL,
    data: fd,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data){
        alert(data.message);
        $( 'form' ).find('input:file').val('');
    },
    error: function (textStatus, errorThrown) {
        alert("Error!!")
        $( 'form' ).find('input:file').val('');
    }
    });
});
