window_5209hbf298hew9jfiowg_Dolpthone_version = "1.0.2 Stable";
versionType = "";
// main script
subsound = new Audio('https://aika-toki.github.io/others/library/NotiSound/003_1s.wav');
notifsound = new Audio("https://aika-toki.github.io/others/library/NotiSound/002_3s.wav");
patchsound = new Audio('https://aika-toki.github.io/others/library/NotiSound/001_2s.wav');
alertsound = new Audio('https://aika-toki.github.io/others/library/NotiSound/005_2s.wav');
startup();
setTimeout(()=>{
    if(!document.querySelector('iframe')){
        next();
    }
    setTimeout(()=>{
        subscribe();
    },5000);
},1000);
function subscribe(){
    mainalert('Try to subscribe.');
    subsound.load();
    if(window.top.document.querySelector('#modal-inner-iframe').contentDocument.querySelector('#video-player')){
        let video = window.top.document.querySelector('#modal-inner-iframe').contentDocument.querySelector('#video-player');
        // video.addEventListener("ended", done);
        videochecker();
        subsound.play();
    }
}
function videochecker(){
    let video = window.top.document.querySelector('#modal-inner-iframe').contentDocument.querySelector('#video-player');
    let process = setInterval(()=>{
        if(video.duration <= video.currentTime){
            done();
            libalert('VideoDurationChecker','process ended.');
            clearInterval(process);
        }
    },200);
    libalert('VideoDurationChecker','process started.');
}
function done(){
    console.log("DONE!");
    mainalert('content ended.');
    setTimeout(()=>{
        next();
        console.log("Next")
    },1000);
    let sub = setTimeout(()=>{
        reinject();
        // subscribe();
        console.log("Subscribe");
        clearTimeout(sub);
    },10000);
}
function next(){
    mainalert('trying to access next content.');
    const caps=window.top.document.getElementsByClassName("u-list")[0].getElementsByTagName("li"); 
    let lastIndex=0;
    for(const item in caps){ 
        const cl=caps[item].classList;
        if(!cl.contains("good")){
            if(cl.contains("movie")&&!cl.contains("supplement")){
                break;
            }else if(cl.contains("evaluation-test")||cl.contains("essay-test")){
                notifsound.load();
                notifsound.play();
                notifsound.addEventListener('ended',()=>{
                    notifsound="";
                });
                break;
            }
        }
        lastIndex+=1;
    }
    caps[lastIndex].querySelector("a").click();
    setTimeout(()=>{
        indicatorUpdate();
    },3000);
}
function startup(){
    if(!document.body.classList.contains('izialready')){
        let swalsc = window.top.document.createElement('script');
        swalsc.src = "//aika-toki.github.io/others/library/iziToast/iziToast.min.js";
        swalsc.id = "iziToastScript";
        window.top.document.querySelector('script#di').before(swalsc);
        let swalst = document.createElement('link');
        swalst.rel = "stylesheet";
        swalst.href = "//aika-toki.github.io/others/library/iziToast/iziToast.min.css";
        swalst.id = "iziToastStyle"
        window.top.document.head.appendChild(swalst);
        let indicatorStyle = document.createElement('style');
        indicatorStyle.textContent = 'li>a{filter: drop-shadow(0px 0px 2px #fff)}li.essay-test a.is-gate-closed::after,li.evaluation-test a.is-gate-closed::after{background-image: none !important;background-color: #9ba4bfaa;}';
        indicatorStyle.id = "indicatorStyle";
        window.top.document.head.appendChild(indicatorStyle);
        document.body.classList.add('izialready');
    }
    let version = window_5209hbf298hew9jfiowg_Dolpthone_version;
    let re = document.querySelector('script#di').className=="reinjected"?"re":"";
    console.log('\u001b[33m[Dolpthone]Ver.'+version+' '+re+'loaded.');
    if(re=="re"){
        mainalert('reinjected.');
    }
    patchsound.load();
    if(window.top.document.querySelector('script#di').className == ""){
        setTimeout(()=>{
            patchsound.play();
            window.top.veralart(version);
            window.top.indicatorsetup();
        },1000);
    }
}
function veralart(version){
    let version_sentense = `version ${version} has applied.`;
    iziToast.show({
        position: 'topRight',
        title: 'Dolpthone',
        message: version_sentense,
        timeout: 5000,
        messageColor: "#00c541"
    });
}
function libalert(procn,msg){
    iziToast.show({
        position: 'topRight',
        title: 'DolphoneLib - '+procn,
        message: msg,
        timeout: 5000,
        messageColor: "#4f73e3"
    })
}
function mainalert(msg){
    iziToast.show({
        position: 'topRight',
        title: 'Dolphone',
        message: msg,
        timeout: 5000,
        messageColor: "#00c541"
    })
}
function reinject(){
    let p=document.querySelector('script#di');
    if(p!=null){
        document.querySelector('script#di').remove();
    }
    let e=document.createElement('script');
    e.src="https://aika-toki.github.io/others/javascript/Dolpthone_inject"+versionType+".js";
    e.id="di";
    e.className="reinjected";
    window.top.document.head.appendChild(e);
}
function indicatorsetup(){
    let indic = setInterval(()=>{
        let listel = document.querySelectorAll('li'),nowel=null;
        for(let i = 0;i<listel.length;i++){
            let lcls = listel[i].classList;
            if(lcls.contains('movie')){
                if(listel[i].querySelector('a').classList.contains('is-selected')){
                    nowel = i;
                }
            }
        }
        if(nowel!==null){
        nowel=listel[nowel];
        nowel.style.background = `linear-gradient(90deg, #ddd 0%,#ddd 100%)`
        movieel = document.querySelector('iframe').contentDocument.querySelector('video');
        let percent = Math.round((movieel.currentTime/movieel.duration)*1000)/10;
        nowel.style.background = `linear-gradient(90deg, #9fb 0%, #9fb ${percent}%,#ffffff ${percent}%,#ffffff 100%)`
        }
    },20);
    libalert('Indicator',`Process started; id: ${indic}`);
}
function indicatorUpdate(){
    let listel = document.querySelectorAll('li');
    if(document.querySelector('div.u-card.has-no-padding').querySelector('.u-filter')){
        if(!document.querySelector('#sections-contents > div.l-column-common.section > div.u-card.has-no-padding > div.u-filter > div > div:nth-child(1)').classList.contains('u-filter-active')){
            document.querySelector('#sections-contents > div.l-column-common.section > div.u-card.has-no-padding > div.u-filter > div > div:nth-child(1)').click();
        }
    }
    for(let i = 0;i<listel.length;i++){
        let lcls = listel[i].classList;
        if(lcls.contains('movie')){
            if(lcls.contains('good')){
                listel[i].style.backgroundColor = "#9fb";
            }
        } else if(lcls.contains('evaluation-test')||lcls.contains('essay-test')){
            if(lcls.contains('good')){
                listel[i].style.background = "#adbdeb";
            }
            if(listel[i].querySelector('a').classList.contains('is-selected')){
                listel[i].style.background = "linear-gradient(90deg, #adbdeb 0%, #adbdeb 10%, #ffffff 10%, #ffffff 100%)";
                alertsound.load();
                let alertnot = setInterval(()=>{
                    alertsound.play();
                },60000);
                finishChecker(i,alertnot);
            }
        }
    }
    libalert('Indicator','Indicator Updated.');
}
function finishChecker(pos, indiid){
    let listel = document.querySelectorAll('li')[pos];
    let checker = setInterval(()=>{
        if(listel.classList.contains('good')){
            clearInterval(indiid);
            clearInterval(checker);
            libalert('TestCorrectChecker','process ended.');
            setTimeout(()=>{
                done();
            },5000);
        }
    },500);
    libalert('TestCorrectChecker','process started.');
}