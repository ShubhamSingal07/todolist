window.onload=function(){
     
    let inptask=document.getElementById('inptask')
    let addbtn=document.getElementById('addbtn')
    let clrbtn=document.getElementById('clrbtn')
    let sortbtn=document.getElementById('sortbtn')
    let tasklist=document.getElementById('tasklist')

    let tasks=[]

    if(localStorage.list)[
        tasks=JSON.parse(localStorage.list)
    ]

    function refreshlist (){
        localStorage.list=JSON.stringify(tasks)
        tasklist.innerHTML=''
        for(let i in tasks){
            let task=tasks[i]

            let li=document.createElement('li')
            li.className='list-group-item'
            let div=document.createElement('div')
            div.className=task.done?'row done':'row' 

            let span=document.createElement('span')
            span.innerText=task.name
            span.className='col'

            let donebtn=document.createElement('button')
            donebtn.innerText=task.done? '❌':'✔️'
            donebtn.className=task.done? 'btn btn-warning col-1 mx-2':'btn btn-success col-1 mx-2'

            let dltbtn=document.createElement('button')
            dltbtn.innerText='🗑'
            dltbtn.className='btn btn-danger col-1 mx-2'

            let upbtn=document.createElement('button')
            upbtn.innerText='⬆️'
            upbtn.className='btn btn-secondary col-1 mx-2'

            let downbtn=document.createElement('button')
            downbtn.innerText='⬇️'
            downbtn.className='btn btn-secondary col-1 mx-2'

            upbtn.onclick=function(){
                let t=tasks.splice(i,1)
                console.log(t)
                console.log(tasks)
                tasks.splice(i-1,0,t[0])
                refreshlist()
            }

            downbtn.onclick=function(){
                let t=tasks.splice(i,1)
                tasks.splice(i+1,0,t[0])
                refreshlist()
            }

            donebtn.onclick=function(){
                task.done=!task.done
                refreshlist()
            }

            dltbtn.onclick=function(){
                tasks.splice(i,1)
                refreshlist()
            }

            div.appendChild(span)
            if(i!=0){
                div.appendChild(upbtn)
            }
            if(i!=tasks.length-1){
                div.appendChild(downbtn)
            }
           
            div.appendChild(donebtn)
            div.appendChild(dltbtn)
            li.appendChild(div)
            tasklist.appendChild(li)    
        }
    }

    refreshlist()

    function addtask(){
        inptaskvalue=inptask.value
        tasks.push({
          name: inptaskvalue,
          done: false
        })
     
        inptask.value=''
        refreshlist() 
    }

    function sortlist(){
        tasks.sort(function(a,b){
            return a.done-b.done
        })
    }

    function clrlist(){
        tasks=tasks.filter(function(t){
           return !t.done
        })
    }

    addbtn.onclick=function(){
        console.log('hello')
        addtask()
    }

    sortbtn.onclick=function(){
        sortlist()
        refreshlist()
    }

    clrbtn.onclick=function(){
        clrlist()
        refreshlist()
    }

    inptask.onkeyup=function(ev){
        if(ev.keyCode==13){
            addtask()
        }
    }
}