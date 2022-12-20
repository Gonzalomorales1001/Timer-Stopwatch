let listGroupItems=document.querySelectorAll('.list-group-item')
let disabled=document.createAttribute('disabled')

let startTime=document.querySelector('#StartTime')
let stopTime=document.querySelector('#StopTime')

let displayHours=document.querySelector('#hours')
let displayMinutes=document.querySelector('#minutes')
let displaySeconds=document.querySelector('#seconds')

let hours=0
let minutes=0
let seconds=0

const timer=(timeSet,custom=0)=>{
    startTime.className='btn btn-success'

    switch(timeSet){
        case 15:
        case 30:
            seconds+=timeSet
            if(seconds>=60){
                minutes++
                displayMinutes.innerHTML=`0${minutes}`
                seconds=seconds-60
            }
            displaySeconds.innerHTML=`0${seconds}`
        break
        case 1:
        case 5:
        case 10:
            minutes+=timeSet
            if(minutes>=60){
                hours++
                displayHours.innerHTML=`0${hours}`
                minutes=minutes-60
            }
            displayMinutes.innerHTML=`0${minutes}`
        break
        case 60:
            hours+=1
            displayHours.innerHTML=`0${hours}`  
    }

    if(custom==1){
        hours=parseInt(document.querySelector('#customHours').value)
        minutes=parseInt(document.querySelector('#customMinutes').value)
        seconds=parseInt(document.querySelector('#customSeconds').value)

        if(isNaN(hours)){hours=0}
        if(isNaN(minutes)){minutes=0}
        if(isNaN(seconds)){seconds=0}

        displayHours.innerHTML=`0${hours}`
        displayMinutes.innerHTML=`0${minutes}`
        displaySeconds.innerHTML=`0${seconds}`
    }
}

const restore=()=>{
    startTime.className='btn btn-success disabled'
    stopTime.className='btn btn-danger disabled'

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

    let interval=setInterval(()=>{
        if(hours==0&&minutes==0&&seconds==0){
            startTime.className='btn btn-success disabled'
            stopTime.className='btn btn-danger disabled'
            listGroupItems.forEach((node)=>node.removeAttribute("disabled"))
            clearInterval(interval)
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
        displaySeconds.innerHTML=`0${seconds}`
        displayMinutes.innerHTML=`0${minutes}`
        displayHours.innerHTML=`0${hours}`
    },1)
}