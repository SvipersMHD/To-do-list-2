var btnHide = document.querySelector(".hide")
var btnAddTask = document.querySelector(".btn__add")
var btnDelette = document.querySelector(".btn__removeall")
var btnFiltreDone = document.querySelector(".filtre__done")
var btnFiltreBeDone = document.querySelector(".filtre__bedone")
var btnFiltreShowall = document.querySelector(".filtre__showall")



var inputDescription = document.querySelector(".description")

var askWrapper = document.querySelector(".ask__box")
var askWrapperBox = document.querySelector(".ask__wrapper")
var errorName = document.querySelector(".error__name")
var errorTask = document.querySelector(".error__task")
var errorDate = document.querySelector(".error__date")
var errorHide = document.querySelector(".error__hide")
// Chargement du localstorage aux chargement de la pfunction generateUniqueId() {

//
var askDataFromLocalStorage = localStorage.getItem('askData');
if (askDataFromLocalStorage) {
    askWrapper.innerHTML = askDataFromLocalStorage;
}

var askDataFromLocalStorageTitre = localStorage.getItem('titre');

if (askDataFromLocalStorageTitre) {
    const modifTitres = document.querySelectorAll('.modifTitre');
    modifTitres.forEach((modifTitre) => {
        const id = modifTitre.getAttribute("id");
        const titreFromLocalStorage = localStorage.getItem(`titre_${id}`);
        if(titreFromLocalStorage && modifTitre.getAttribute("id")){
            modifTitre.value = titreFromLocalStorage;
            modifTitre.removeAttribute("id");
        }
    });
}
function modifTask(){
    var modifTitres = document.querySelectorAll(".modifTitre")
    modifTitres.forEach((modifTitre) => {
        const id = Math.random().toString(36).substr(2, 9);
        modifTitre.setAttribute("id", id);
        modifTitre.addEventListener('input', (event) => {
            console.log("ça prend");
            const newTitre = event.target.value;
            console.log(newTitre);
            localStorage.setItem(`titre_${id}`, newTitre);
            localStorage.setItem('askData', askWrapper.innerHTML)
            
        });
    });
}
var save = document.querySelector(".save")
save.addEventListener("click",function(){
    modifTask()
})
// hauteur du wrapper chargé après reload
var heightPlus = askWrapperBox.offsetHeight + askWrapper.offsetHeight
askWrapperBox.style.height = heightPlus + "px";
/////////////
function rajoutTask(){
    // message erreur
    if(inputDescription.value.length <= 1) {
        errorTask.style.display = "block"
        errorHide.style.display = "none"
    } 
    if(inputDescription.value.length >= 1) {
        errorTask.style.display = "none"
        errorHide.style.display = "none"
    } 
    if(inputName.value.length <= 1) {
        errorName.style.display = "block"
        errorHide.style.display = "none"
    } 
    if(inputName.value.length >= 1) {
        errorName.style.display = "none"
        errorHide.style.display = "none"
    } 
    if(inputDate.value.length <= 1) {
        errorDate.style.display = "block"
        errorHide.style.display = "none"
    } 
    if(inputDate.value.length >= 1) {
        errorDate.style.display = "none"
        errorHide.style.display = "none"
    } 
    if(document.querySelector(".show")) {
        errorHide.style.display = "block"
        errorName.style.display = "none"
        errorTask.style.display = "none"
        errorDate.style.display = "none"
    } 
    ///
    if(
        inputDescription.value.length >= 1 
        &&
        inputName.value.length >= 1
        &&
        inputDate.value.length >= 1
        && 
        document.querySelector(".hide")
        ){
            errorName.style.display = "none"
            errorTask.style.display = "none"
            errorDate.style.display = "none"
            errorHide.style.display = "none"
            var inputData = inputDescription.value
            var inputDataName = inputName.value
            var inputDateSelec = inputDate.value
            var askData = 
            `
            <div class="ask">
            <input class="modifTitre modif" value="${inputDataName}">
            <input class="modifDate modif" type="date" format="dd-mm-yy" value= ${inputDateSelec}>
            <textarea class="modifDescription modif">${inputData}</textarea>
            <button class="btn__done">Done</button>
            <button class="btn__remove">remove</button>
            </div>
            `
            // met le dernier div en haut 
            askWrapper.insertAdjacentHTML('afterbegin', askData);
            
            var askTranslate = document.querySelector(".ask")
            var heightPlus = askWrapperBox.offsetHeight + askTranslate.offsetHeight
            askWrapperBox.style.height = heightPlus + "px";
            // Sauvegarde des données
            localStorage.setItem('askData', askWrapper.innerHTML)
            // animation
            setTimeout(function() {
                askTranslate.style.transition = ".3s all ease-in-out";
            }, 1000);
            gsap.fromTo(
                askTranslate,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
                );
                // vide les champs
                inputDescription.value = ""
                inputName.value = ""
                inputDate.value = ""
                itsDone(askTranslate)
                
                // Ajout d'un gestionnaire d'événements "change" à chaque élément
            }  
        }
        // bouton vert 
        function itsDone(remplacer){
            var btnDone = document.querySelector(".btn__done")
            btnDone.addEventListener("click",function(){
                remplacer.classList.toggle("green-active")
            })
        }
        //////////////////
        // bouton enlever 
        function enlever(){
            var btnRemoveTask = document.querySelectorAll(".btn__remove")
            btnRemoveTask.forEach(function(removeTask){
                removeTask.addEventListener("click", function(){
                    removeTask.closest("div").classList.add("slide__droite")
                    setTimeout(() => {
                        removeTask.closest("div").remove();
                    }, 400)
                    localStorage.setItem('askData', askWrapper.innerHTML);
                    var askTranslate = document.querySelector(".ask")
                    var heightMoins = askWrapperBox.offsetHeight - askTranslate.offsetHeight
                    askWrapperBox.style.height = heightMoins + "px";
                })
            });
            btnDelette.addEventListener("click", function(){
                var tailleWrapper = askWrapperBox.offsetHeight
                gsap.to(
                    askWrapper,
                    { y: -tailleWrapper, duration: 0.5, ease: 'power2.out' }
                    );
                    setTimeout(() => {
                        gsap.to(
                            askWrapper,
                            { y: 0,}
                            );
                    }, 1000)
                    setTimeout(() => {
                        askWrapper.innerHTML = ""
                    }, 1000)
                    setTimeout(() => {
                        askWrapperBox.style.height = 130 + "px";
                    }, 500)
                
                localStorage.removeItem('askData');
            })
        }
            ///////////////////
            // SHOW HIDE 
            var showDiv = document.createElement(`div`)
            showDiv.innerHTML = "Show list"
            showDiv.classList.add("show")
            btnHide.innerHTML = "Hide list"
            btnHide.classList.add("hide")
            
            btnHide.addEventListener("click", function(){
                var tailleWrapper = askWrapperBox.offsetHeight
                gsap.to(askWrapperBox, {
                    y: (-tailleWrapper),
                    duration: 0.5,
                })
                
                btnHide.replaceWith(showDiv)
            })
            showDiv.addEventListener("click", function(){
                var tailleWrapper = askWrapperBox.offsetHeight
                gsap.to(askWrapperBox, {
                    y: tailleWrapper - tailleWrapper,
                    duration: 0.5,
                })
                showDiv.replaceWith(btnHide)
            })
            /////////////////////////////////////////
            document.addEventListener("keydown", function(enter){
                if(enter.key === "Enter") {  
                    rajoutTask()
                    enlever()
                }
            });
            
            btnAddTask.addEventListener("click", function(){
                rajoutTask()
                enlever()
            });
            
            enlever()
            var askTranslate = document.querySelector(".ask")
            var btnDoneAll = document.querySelectorAll(".btn__done")
            btnDoneAll.forEach(function(btnDoneAllSelect){
                btnDoneAllSelect.addEventListener("click", function(){
                    btnDoneAllSelect.closest("div").classList.toggle("green-active")
                })
            })
            
            // bouton done filtre
            btnFiltreBeDone.addEventListener("click", function(){
                if(document.querySelector(".ask")){
                    var doneGreened = document.querySelectorAll(".green-active")
                    var askTranslate = document.querySelectorAll(".ask")
                    // reset 
                    doneGreened.forEach(function(doneGreene){
                        doneGreene.style.display = "grid"
                    })
                    askTranslate.forEach(function(askTranslateNotDone){
                        askTranslateNotDone.style.display = "grid"
                    })
                    //
                    askTranslate.forEach(function(askTranslateNotDone){
                        askTranslateNotDone.style.display = "grid"
                    })
                    doneGreened.forEach(function(doneGreene){
                        doneGreene.style.display = "none"
                    })
                }
            })
            btnFiltreDone.addEventListener("click", function(){
                if(document.querySelector(".ask")){
                    var doneGreened = document.querySelectorAll(".green-active")
                    var askTranslate = document.querySelectorAll(".ask")
                    // reset 
                    doneGreened.forEach(function(doneGreene){
                        doneGreene.style.display = "grid"
                    })
                    askTranslate.forEach(function(askTranslateNotDone){
                        askTranslateNotDone.style.display = "grid"
                    })
                    //
                    askTranslate.forEach(function(askTranslateNotDone){
                        askTranslateNotDone.style.display = "none"
                    })
                    doneGreened.forEach(function(doneGreene){
                        doneGreene.style.display = "grid"
                    })
                }
            })
            btnFiltreShowall.addEventListener("click", function(){
                if(document.querySelector(".ask")){
                    var doneGreened = document.querySelectorAll(".green-active")
                    var askTranslate = document.querySelectorAll(".ask")
                    // reset 
                    doneGreened.forEach(function(doneGreene){
                        doneGreene.style.display = "grid"
                    })
                    askTranslate.forEach(function(askTranslateNotDone){
                        askTranslateNotDone.style.display = "grid"
                    })
                    //
                }
            })

            var tl = gsap.timeline({delay: 1});
            tl.from(".input__wrapper", {y: -200, duration: 0.5}, 1);
            tl.from(".hide", {y: -400, duration: 0.5}, 1);
            tl.from(".ask__wrapper", {y: 100, duration: 0.5});
