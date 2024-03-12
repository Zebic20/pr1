function convertEpoch() {
    var epochInput = document.getElementById("epoch").value;
    var fromEpoch = document.getElementById("fromEpoch").value;
    var toEpoch = document.getElementById("toEpoch").value;

    var epoch;
    if (epochInput.trim() === "") {
        epoch = new Date().getTime();
    } else {
        epoch = parseFloat(epochInput);
    }

    var milliseconds;
    if (fromEpoch === "1") {
        milliseconds = epoch * 1000;
    } else if (fromEpoch === "2") {
        milliseconds = epoch;
    } else {
        document.getElementById("result").innerHTML = "Unsupported fromEpoch";
        return;
    }

    if (toEpoch === "1") {
        document.getElementById("result").innerHTML = Math.floor(milliseconds / 1000);
    } else if (toEpoch === "2") {
        document.getElementById("result").innerHTML = milliseconds;
    } else {
        document.getElementById("result").innerHTML = "Unsupported toEpoch";
    }

    // Отображение времени по Московскому времени
    var mskTime = new Date(milliseconds ); // MSK is UTC+3
    document.getElementById("mskTime").innerHTML = "Time in MSK: " + mskTime.toLocaleString();

    // Отображение времени по времени Гринвича (GMT)
    var gmtTime = new Date(milliseconds);
    document.getElementById("gmtTime").innerHTML = "Time in GMT: " + gmtTime.toUTCString();

    // Отображение относительного времени
    var currentTime = new Date();
    var relativeTime = new Date(milliseconds);
    var difference = currentTime - relativeTime;
    var prefix = difference < 0 ? "in " : "";
    difference = Math.abs(difference);
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var relativeTimeString = prefix;
    if (days > 0) {
        relativeTimeString += days + " days";
    } else if (hours > 0) {
        relativeTimeString += hours + " hours";
    } else if (minutes > 0) {
        relativeTimeString += minutes + " minutes";
    } else {
        relativeTimeString += seconds + " seconds";
    }
    relativeTimeString += difference < 0 ? " ago" : "";
    document.getElementById("relativeTime").innerHTML = "Relative Time: " + relativeTimeString;

    // Отображение текущей эпохи по Unix Timestamp
    var currentUnixEpoch = Math.floor(new Date().getTime() / 1000);
    document.getElementById("currentUnixEpoch").innerHTML = "Current Unix Epoch: " + currentUnixEpoch;
}