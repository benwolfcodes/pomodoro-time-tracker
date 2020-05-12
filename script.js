// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes();
// var dateTime = date+' '+time;
var num;

var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    logDom : null,
    workTime : null,
    breakTime : null,
    workType : null,
    log : null,
    logLine : null,
    reason : null,
    ding : null,
    today : null,
    date : null,
    dateTime : null,

    init : function(){
        var self = this;
        this.minutesDom = document.querySelector('.minutes');
        this.secondsDom = document.querySelector('.seconds');
        this.logDom = document.getElementById('workLogContainer')
        this.ding = document.getElementById('ding');
        this.interval = setInterval(function(){
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector('#work').onclick = function(){
            self.startWork.apply(self);
        };
        document.querySelector('#break').onclick = function(){
            self.startShortBreak.apply(self);
        };
        document.querySelector('#stop').onclick = function(){
            self.stopTimer.apply(self);
        };
    },

    resetVariables : function(mins, secs, started){
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
    },

    getDateAndTime : function () {
        this.today = new Date();
        this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
        this.time = this.today.getHours() + ":" + this.toDoubleDigit(this.today.getMinutes());
        this.dateTime = this.date+' '+this.time;
    },

    startWork : function() {
        this.workTime = document.getElementById('workTime').value;
        console.log(this.workTime);
        this.workType = document.getElementById('notes').value;
        this.resetVariables(this.workTime, 0, true);
        this.getDateAndTime();
        this.log = "* " + this.dateTime + " - " + this.workTime + " minutes - " + this.workType;
        this.updateLog(this.log);
    },

    startShortBreak : function(){
        this.breakTime = document.getElementById('breakTime').value;
        console.log(this.breakTime);
        this.resetVariables(this.breakTime, 0, true);
        this.getDateAndTime();
        this.log = "* " + this.dateTime + " - " + this.breakTime + " minute break.";
        this.updateLog(this.log);
    },

    stopTimer : function(){
        if (this.started == true) {
            this.started = false;
            this.getDateAndTime();
            this.log = "* " + this.dateTime + " - PAUSED.";
            
        } else if (this.started == false) {
            this.started = true;
            this.getDateAndTime();
            this.log = "* " + this.dateTime + " - RESUMED.";
        }
        this.updateLog(this.log);
        this.updateDom();
    },

    toDoubleDigit : function(num){
        if(num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },

    updateDom : function(){
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    },

    updateLog : function(log){
        this.logLine = document.createElement('div');
        this.logLine.textContent = this.log;
        this.logDom.appendChild(this.logLine);
        this.ding.play();
    },


    intervalCallback : function(){
        if(!this.started) return false;
        if(this.seconds == 0) {
            if(this.minutes == 0) {
            this.timerComplete();
            return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    },

    timerComplete : function(){
        // Alarm code
        this.log = "* " + dateTime + " - TIME'S UP!";
        this.updateLog(this.log);
        this.started = false;
    }
};

window.onload = function(){
    pomodoro.init();
};