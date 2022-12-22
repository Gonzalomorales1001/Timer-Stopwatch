//timer
let listGroupItems=document.querySelectorAll('.list-group-item')
let disabled=document.createAttribute('disabled')

let startTime=document.querySelector('#StartTime')
let stopTime=document.querySelector('#StopTime')
let interval=0

let displayHours=document.querySelector('#hours')
let displayMinutes=document.querySelector('#minutes')
let displaySeconds=document.querySelector('#seconds')

let hours=0
let minutes=0
let seconds=0

const stringify=(unit)=>{
    if(unit<10){
        return `0${unit}`
    }else{return unit}
}

const timer=(timeSet,custom=0)=>{
    startTime.className='btn btn-success'

    switch(timeSet){
        case 15:
        case 30:
            seconds+=timeSet
            if(seconds>=60){
                minutes++
                displayMinutes.innerHTML=stringify(minutes)
                seconds=seconds-60
            }
            displaySeconds.innerHTML=stringify(seconds)
        break
        case 1:
        case 5:
        case 10:
            minutes+=timeSet
            if(minutes>=60){
                hours++
                displayHours.innerHTML=stringify(hours)
                minutes=minutes-60
            }
            displayMinutes.innerHTML=stringify(minutes)
        break
        case 60:
            hours+=1
            displayHours.innerHTML=stringify(hours) 
    }

    if(custom==1){
        hours=parseInt(document.querySelector('#customHours').value)
        minutes=parseInt(document.querySelector('#customMinutes').value)
        seconds=parseInt(document.querySelector('#customSeconds').value)
        
        if(isNaN(hours)){hours=0}
        if(isNaN(minutes)){minutes=0}
        if(isNaN(seconds)){seconds=0}
        
        seconds==0&&minutes==0&&hours==0?startTime.className='btn btn-success disabled':
        displayHours.innerHTML=stringify(hours)
        displayMinutes.innerHTML=stringify(minutes)
        displaySeconds.innerHTML=stringify(seconds)
    }
}

const restore=()=>{
    startTime.className='btn btn-success disabled'
    stopTime.className='btn btn-danger disabled'
    listGroupItems.forEach((node)=>node.removeAttribute("disabled"))

    hours=00
    minutes=00
    seconds=00

    displayHours.innerHTML=`00`
    displayMinutes.innerHTML=`00`
    displaySeconds.innerHTML=`00`
}

const startTimer=()=>{
    startTime.className='btn btn-success disabled'
    stopTime.className='btn btn-danger'

    listGroupItems.forEach((node)=>node.setAttribute("disabled",""))

    interval=setInterval(()=>{
        if(hours==0&&minutes==0&&seconds==0){
            stopTimer()
            timeIsOut()
            return 
        }
        if(seconds==0){
            if(minutes!=0){
                seconds=60
                minutes--
            }
        }
        if(seconds==0&&minutes==0){
            if(hours!=0){
                hours--
                minutes=59
                seconds=60
            }
        }
        seconds--
        displaySeconds.innerHTML=stringify(seconds)
        displayMinutes.innerHTML=stringify(minutes)
        displayHours.innerHTML=stringify(hours)
    },1000)
}

const stopTimer=()=>{
    clearInterval(interval)
    restore()
}

// Time Out modal and Alarm
const timeOutmodal = new bootstrap.Modal(document.getElementById('TimeOutModal'))
const alarm = new Audio('/sound/alarm.m4a')
alarm.loop=true

let modalSeconds=0
let modalMinutes=0
let modalHours=0

let displayModalSeconds=document.querySelector('#modalSecond')
let displayModalMinutes=document.querySelector('#modalMinute')
let displayModalHours=document.querySelector('#modalHour')

let modalInterval=0

const timeIsOut=()=>{
    timeOutmodal.show()
    alarm.currentTime=0
    alarm.play()
    modalTimeOutChronometer()
}

const stopAlarm=()=>{
    clearInterval(modalInterval)
    modalSeconds=0
    modalMinutes=0
    modalHours=0
    displayModalSeconds.innerHTML=':00'
    displayModalMinutes.innerHTML=':00'
    displayModalHours.innerHTML='00'
    alarm.pause()
}


const modalTimeOutChronometer=()=>{
    modalInterval=setInterval(()=>{
        modalSeconds++
        if(modalSeconds>59){
            modalMinutes++
            modalSeconds=0
        }
        if(modalMinutes>59){
            modalHours++
            modalMinutes=0
            modalSeconds=0
        }

        displayModalSeconds.innerHTML=`:${stringify(modalSeconds)}`
        displayModalMinutes.innerHTML=`:${stringify(modalMinutes)}`
        displayModalHours.innerHTML=stringify(modalHours)

    },1000)
}

//chronometer
let chCentiseconds=0
let chSeconds=0
let chMinutes=0
let chHours=0

let chInterval=0

let displayChCentiseconds=document.querySelector('#centisecond')
let displayChSeconds=document.querySelector('#second')
let displayChMinutes=document.querySelector('#minute')
let displayChHours=document.querySelector('#hour')

const start=()=>{
    chInterval=setInterval(chronometer,10)

    document.querySelector('#start').setAttribute('disabled',"")
    document.querySelector('#resume').setAttribute('disabled',"")
    document.querySelector('#restart').setAttribute('disabled',"")

    document.querySelector('#stop').removeAttribute('disabled')
}

const stop=()=>{
    clearInterval(chInterval)

    document.querySelector('#stop').setAttribute('disabled',"")
    
    document.querySelector('#resume').removeAttribute('disabled')
    document.querySelector('#restart').removeAttribute('disabled')
}

const restart=()=>{
    chCentiseconds=0
    chSeconds=0
    chMinutes=0
    chHours=0

    displayChCentiseconds.innerHTML=`:00`
    displayChSeconds.innerHTML=`:00`
    displayChMinutes.innerHTML=`:00`
    displayChHours.innerHTML='00'

    document.querySelector('#start').removeAttribute('disabled')

    document.querySelector('#resume').setAttribute('disabled',"")
    document.querySelector('#restart').setAttribute('disabled',"")
    document.querySelector('#stop').setAttribute('disabled',"")
}

const chronometer=()=>{
        chCentiseconds++
        if(chCentiseconds>99){
            chSeconds++
            chCentiseconds=0
        }
        if(chSeconds>59){
            chMinutes++
            chSeconds=0
            chCentiseconds=0
        }
        if(chMinutes>59){
            chHours++
            chMinutes=0
            chSeconds=0
            chCentiseconds=0
        }
        displayChCentiseconds.innerHTML=`:${stringify(chCentiseconds)}`
        displayChSeconds.innerHTML=`:${stringify(chSeconds)}`
        displayChMinutes.innerHTML=`:${stringify(chMinutes)}`
        displayChHours.innerHTML=`${stringify(chHours)}`
}
