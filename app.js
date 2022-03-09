const form = document.myform; // Myform and form represent the same form

// Prevent form from reloading on submit and other default befhaviours
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

let formElems = []; // Will hold the elements like id,name, class,etc. of the form
for (let elem of form.elements) {
    formElems.push(elem.name);
}
formElems = [...new Set(formElems)]; // Removes the repeated elements
formElems.pop(); // Removes the last element of the form from the list,
// Because it is the submit button, and we don't need to care about it's
// Values unless clicked which can be made another event
console.log(formElems);

function submitForm() {
    let isComplete = true;
    let incompleted = [];
    formElems.map((elem) => {
        // Elem is id,fname and such things
        console.log(elem);
        let currElemValue;
        let currentElement = document.querySelector(`input[name='${elem}']`);
        let inputType = currentElement.getAttribute('type');
        let currentWarning = document.querySelector(`#${elem}-warning`);
        if (inputType == 'radio') {
            // Radio button's avlues behave different than other default fields
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
    console.log(document.querySelector(`input[name='${incompleted[0]}']`));

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
    setInterval(() => {
        document
            .querySelector('#sucess-wrapper')
            .classList.remove('visibleSuccess');
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
