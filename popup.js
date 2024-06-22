document.getElementById('timeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const clockIn = formatTime(document.getElementById('clockIn').value);
    const clockOut = formatTime(document.getElementById('clockOut').value);
    const breakStart = formatTime(document.getElementById('breakStart').value);
    const breakEnd = formatTime(document.getElementById('breakEnd').value);

    // 現在のタブにメッセージを送信
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(clockIn, clockOut, breakStart, breakEnd);
        chrome.tabs.sendMessage(tabs[0].id, {
            action: 'setTimes', times:
                { clockIn: clockIn, clockOut: clockOut, breakStart: breakStart, breakEnd: breakEnd }
        });
    });

    //   window.close();
});


function formatTime(time) {
    if (time.length === 1) {
        // "1" -> "0100"
        return '0' + time + '00';
    } else if (time.length === 2) {
        // "12" -> "1200"
        return time + '00';
    } else if (time.length === 3) {
        // "830" -> "0830"
        return '0' + time;
    } else {
        // "0830" -> "0830"
        return time;
    }
}