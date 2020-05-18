$(document).ready(function () {
    const type = "countDown"; // countUp Or countDown
    const duration = moment.duration({
        'minutes': '00',
        'seconds': '05'
    });
    const firstButton = $('.buttons').children().first();

    let step = '1';
    let intervalId;
    let startTimestamp;
    

    initStartTimestamp();

    firstButton.click(() => {
        onTimerChange(!intervalId);
    });

    $('button:eq(1)').click(() => {
        onTimerChange(false);
        initStartTimestamp();
        $('.screen').text(startTimestamp.format('mm:ss'));
    });

    function onTimerChange(isStart) {
        if (isStart) {
            startTimer();
            firstButton.text("STOP");
        } else {
            clearInterval(intervalId);
            intervalId = null;
            firstButton.text("GO");
        }
    }
    function startTimer() {
        intervalId = setInterval(function () {
            startTimestamp.add(step, 'second');
            $('.screen').text(startTimestamp.format('mm:ss'));
            checkEndOfTimer();
        }, 1000);
    }
    function initStartTimestamp() {
        switch (type) {
            case 'countDown':
                step = -1;
                startTimestamp = moment().startOf("day").add(duration._milliseconds);
                break;
            case 'countUp':
                step = 1;
                startTimestamp = moment().startOf("day");
                break;
        }
        $('.screen').text(startTimestamp.format('mm:ss'));
    }
    function checkEndOfTimer() {
        if (type == 'countDown' && startTimestamp.format('mm:ss') == '00:00') {
            onTimerChange(false);
            alert("The End");
            initStartTimestamp();
        }
    }
});