const form = document.myform; // Myform and form represent the same form

// Prevent form from reloading on submit and other default behaviours
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

// class Form{
//     constructor(){
//     this.hehe = "boi";
//     }
//     text(length) {
        
//     }
// }
let formElems = []; // Will hold the elements like id,name, class,etc. of the form
for (let elem of form.elements) {
    if (elem.name === 'submit') continue;
    formElems.push(elem.name);
}
formElems = [...new Set(formElems)]; // Removes the repeated elements
formElems.map((elem) => {

    let currentField = document.querySelector(`input[name="${elem}"]`);
    if (currentField.getAttribute('type') !== "radio") {

        currentField.addEventListener('focus', () => {
            setInterval(() => {
                let fieldValue = currentField.value;
                if (document.activeElement == currentField) {

                    if (fieldValue !== "") {
                        
                        if (currentField.classList.contains('black') || currentField.classList.contains('red')) {
                            currentField.classList.remove('black');
                            currentField.classList.remove('red');
                            currentField.classList.add('green');
                        }
                    } else {
                        if (currentField.classList.contains('green') || currentField.classList.contains('black')) {

                            currentField.classList.remove('black');
                            currentField.classList.remove('green');
                            currentField.classList.add('red');
                        }
                    }

                }

            }, 500);
        });
    }

})



function submitForm() {
    let isComplete = true;
    let incompleted = [];
    formElems.map((elem) => {
        // Elem is id,fname and such things
        let currElemValue;
        let currentElement = document.querySelector(`input[name='${elem}']`);
        let inputType = currentElement.getAttribute('type');
        let currentWarning = document.querySelector(`#${elem}-warning`);
        if (inputType == 'radio') {
            // Radio button's values behave different than other default fields
            let radios = document.getElementsByName(`${elem}`);
            let atLeastOne = true;
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    atLeastOne = true;
                    break;
                } else {
                    atLeastOne = false;
                }
            }
            if (!atLeastOne) {
                if (currentWarning.classList.contains('hidden')) {
                    currentWarning.classList.remove('hidden');
                    showTopErr();
                }
                isComplete = false;
            } else {
                errMsg(elem, false);
                if (!currentWarning.classList.contains('hidden')) {
                    currentWarning.classList.add('hidden');
                }
            }
        } else {
            currElemValue = currentElement.value;
            if (currElemValue === '') {
                // If empty
                errMsg(elem, true);
                incompleted.push(elem);
                currentElement.classList.add('error');
                isComplete = false;
            } else if (currElemValue !== '') {
                // If not empty
                if (currentElement.classList.contains('error')) {
                    currentElement.classList.remove('error');
                }
                if (!currentWarning.classList.contains('hidden')) {
                    currentWarning.classList.add('hidden');
                }
                errMsg(elem, false);
            }
        }
    });

    if (incompleted.length != 0) {
        for (let field of incompleted) {
            let currentWarning = document.querySelector(`#${field}-warning`);
            if (currentWarning.classList.contains('hidden')) {
                currentWarning.classList.remove('hidden');
            }
        }
        showTopErr();
        document.querySelector(`input[name='${incompleted[0]}']`).focus();
    }
    if (isComplete) {
        success();
    }
}
document.querySelector('.close-btn').addEventListener('click', () => {
    if (document.querySelector('.error-top-wrapper').classList.contains('show')) {
        document.querySelector('.error-top-wrapper').classList.remove('show');
    }
});
function errMsg(field, show) {
    // Field is the name of the field and show is a boolean, if true it shows the error, else it hides the message
    if (show) {
        document.querySelector(
            `#${field}-messages`
        ).textContent = `${field} field cannot be left unfilled`;
    } else if (!show) {
        document.querySelector(`#${field}-messages`).textContent = '';
    }
    let emojis = document.querySelectorAll('span.fa');
    for (let i = 0; i < emojis.length; i++) { }
}
function success() {
    console.log('Sucess');
    document.querySelector('#sucess-wrapper').classList.add('visibleSuccess');
    document.querySelector('form').style.filter = "blur(10px)";
    window.scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector('#sucess-wrapper').classList.remove('visibleSuccess');
        document.querySelector('form').style.filter = "blur(0px)";
    }, 4000);
}
function showTopErr() {
    if (
        !document.querySelector('.error-top-wrapper').classList.contains('show')
    ) {
        document.querySelector('.error-top-wrapper').classList.add('show');
    }
    setTimeout(() => {
        document.querySelector('.error-top-wrapper').classList.remove('show');
    }, 4000);
}
