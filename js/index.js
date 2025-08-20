import rcmTech from "./rcm.js";

const rcm = 10;
const abrsm = 8;
const orgElem = document.getElementById("org");
const gradeElem = document.getElementById("grade");
const scale = document.getElementById("scale");
const desc = document.getElementById("description")
const next = document.getElementById("next");
const restart = document.getElementById("restart");
const reset = document.getElementById("reset");
const count = document.getElementById("count");
let nextPressed = false;

function main(){
    addListeners();
}

function addListeners(){
    next.addEventListener("click", () => {
        nextPressed = true;
    })

    reset.addEventListener("click", () => {
        next.disabled = true;
        scale.innerHTML = "";
        desc.innerHTML = "";
        gradeElem.innerHTML = "";
        orgElem.value = "default"
        gradeElem.disabled = true;
        count.innerHTML = "";
        restart.hidden = true;
        next.hidden = false;
    })

    restart.addEventListener("click", () => {
        restart.hidden = true;
        next.hidden = false;
        generateScaleList(rcmTech, gradeElem.value);
    })

    orgElem.onchange = () => {
        switch (orgElem.value){
            case "rcm":
                populateGrades(rcm);
                gradeElem.disabled = false;
                break;
            case "abrsm":
                populateGrades(abrsm);
                gradeElem.disabled = false;
                break;
            case "default":
                gradeElem.disabled = true;
                break;
        }
    }

    gradeElem.onchange = () => {
        switch (orgElem.value){
            case "rcm":
                next.disabled = false
                generateScaleList(rcmTech, gradeElem.value);
                break;
            case "abrsm":
                next.disabled = false
                generateScaleList(rcmTech, gradeElem.value);
                break;
            case "default":
                break;
        }
    }
}

function populateGrades(org){
    gradeElem.innerHTML = "";
    for (let i = 1; i <= org; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        gradeElem.append(option);
    }
}

function watchButtonPress(){
    return new Promise(resolve => {
        function check(){
            if (nextPressed){
                nextPressed = false;
                resolve();
            } else {
                setTimeout(check, 100);
            }
        }
        check();
    });
}

async function generateScaleList(org, grade){
    const list = org[grade]
    for (let test of list){
        desc.innerHTML = test["name"];
        let length = Math.ceil((Math.random() * (0.33 - 0.25) + 0.25) * test["keys"].length);
        let shuffled = shuffleArray(test["keys"]);
        for (let i = 0; i < length; i++){
            scale.innerHTML = shuffled[i];
            count.innerHTML = `${i + 1} of ${length}`
            await watchButtonPress();
        }
    }
    end();
}

function shuffleArray(arr){
    let copy = [...arr]
    for (var i = copy.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    console.log(copy);
    return copy;
}

function end(){
    next.hidden = true;
    restart.hidden = false;
    desc.innerHTML = "Finished!";
    scale.innerHTML = "";
    count.innerHTML = "";
}

main();