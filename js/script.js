// Global variables
const nameField = document.getElementById('name');
const emailField = document.getElementById('mail');
const jobField = document.getElementById('other-title');
const colourSelect = document.getElementById('color'); 
const designSelect = document.getElementById('design');
const shirtColorDiv = document.getElementById('shirt-colors');
const activitiesContainer = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input');
const paymentSelect = document.getElementById('payment');
const ccField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const submitBtn = document.querySelector('button');
let totalCostHeader = document.createElement('h3');
totalCost = 0;

// Checks to see if the name field is valid or not
const nameValidator = () => {
    let nameValue = nameField.value;

    if (nameValue.length > 0) {
        nameField.style.borderColor = 'rgb(111, 157, 220)';
        return true;
    } else {
        nameField.style.borderColor = 'red';
        return false;
    }
}

// Checks to see if the email field is valid or not
const emailValidator = () => {
    let emailValue = emailField.value;
    let indexOfAt = emailValue.indexOf('@');
    let indexOfDot = emailValue.lastIndexOf('.');

    if (indexOfAt > 1 && indexOfDot > indexOfAt + 1) {
        emailField.style.borderColor = 'rgb(111, 157, 220)';
        return true;
      } else {
        emailField.style.borderColor = 'red';
        return false;
      }

}

// Checks to see if the activity checkboxes are valid or not
const activityValidator = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            activitiesContainer.firstElementChild.style.color = 'rgba(8, 63, 87, 0.6)';
            return true;
        }
    }

    activitiesContainer.firstElementChild.style.color = 'red';
    return false;
}

// Checks to see if the payment field is valid or not
const paymentValidtor = () => {
    let selectedPayment = paymentSelect.value;
    
    if (selectedPayment === 'credit card') {
        let ccNum = ccField.value;
        let zip = zipField.value;
        let cvv = cvvField.value;

        // Is the CC field over 12 digits and under 17?
        if (ccNum.length > 12 && ccNum.length < 17) {
            creditCardDiv.firstElementChild.firstElementChild.innerHTML = 'Card Number:'
            creditCardDiv.firstElementChild.firstElementChild.style.color = 'black';
            ccField.style.borderColor = 'rgb(111, 157, 220)';
        } else if (ccNum.length < 12 && ccNum.length !== 0) {
            creditCardDiv.firstElementChild.firstElementChild.innerHTML = 'Your credit card number is too short'
            creditCardDiv.firstElementChild.firstElementChild.style.color = 'red';
            console.log('The credit card number is too short');
            ccField.style.borderColor = 'red';
        } else if (ccNum.length > 17) {
            creditCardDiv.firstElementChild.firstElementChild.innerHTML = 'Your credit card number is too long'
            creditCardDiv.firstElementChild.firstElementChild.style.color = 'red';
            ccField.style.borderColor = 'red';
        } else {
            creditCardDiv.firstElementChild.firstElementChild.innerHTML = 'Please enter a credit card number'
            creditCardDiv.firstElementChild.firstElementChild.style.color = 'red';
            ccField.style.borderColor = 'red';
        }

        // Is the ZIP code 5 digits long
        if (zip.length === 5) {
            zipField.style.borderColor = 'rgb(111, 157, 220)';
        } else {
            zipField.style.borderColor = 'red';
        }

        // Is the CVV 3 digits long
        if (cvv.length === 3) {
            cvvField.style.borderColor = 'rgb(111, 157, 220)';
        } else {
            cvvField.style.borderColor = 'red';
        }
    }
}


// Simple function to hide or show payment option based on value passed to it 
const showHidePayOptions = option => {
    if (option === 'paypal') {
        hideOrShowElement(creditCardDiv, false);
        hideOrShowElement(bitcoinDiv, false);
        hideOrShowElement(paypalDiv, true);
    } else if (option === 'bitcoin') {
        hideOrShowElement(creditCardDiv, false);
        hideOrShowElement(paypalDiv, false);
        hideOrShowElement(bitcoinDiv, true);
    } else {
        hideOrShowElement(bitcoinDiv, false);
        hideOrShowElement(paypalDiv, false);
        hideOrShowElement(creditCardDiv, true);
    }
}

/* 
    Function that shows certain option within the t-shirt colour 
    option drop down menu, depending on the data passed to it
*/
const makeColourOptionsHidden = (options, num, length) => {
    for (let i = num; i < length; i++) {
        options[i].hidden = true;
    }
}

// Function to unhide or hide an element 
const hideOrShowElement = (element, visability) => {
    if (visability) {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

// Once the page has finished loading, do some stuff
window.addEventListener("load", function(){
    nameField.focus();
    jobField.parentNode.style.display = 'none';

    // Loop through and hide all colour options
    makeColourOptionsHidden(colourSelect, 0, colourSelect.length);

    // Create and add place holder element
    const placeholderOption = document.createElement('option');
    placeholderOption.hidden = true;
    placeholderOption.selected = true;
    placeholderOption.disabled = true;
    placeholderOption.innerHTML = 'Please select a T-shirt theme';
    colourSelect.appendChild(placeholderOption);
    hideOrShowElement(shirtColorDiv, false);

    // Appending total activities cost to the page on load
    totalCostHeader.innerHTML = `Total: $${totalCost}`;
    document.querySelector('.activities').append(totalCostHeader);

    // Make the payment select drop down select method hidden
    paymentSelect.firstElementChild.hidden = true;
    paymentSelect.firstElementChild.nextElementSibling.selected = true;
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
});

// Listens out for changes on the t-shirt info drop down
designSelect.addEventListener('change', event => {
    let selected = event.target.value;

    // Check certain value of selected and hide/show certain options in colour drop down
    if(selected === 'js puns') {
        hideOrShowElement(shirtColorDiv, true);
        makeColourOptionsHidden(colourSelect, 0, colourSelect.length);
        for(let i = 0; i <= 2; i++) {
            colourSelect[i].hidden = false;
        }
    } else if (selected === 'heart js') {
        hideOrShowElement(shirtColorDiv, true);
        makeColourOptionsHidden(colourSelect, 0, colourSelect.length);
        for(let i = 3; i <= 5; i++) {
            colourSelect[i].hidden = false;
        }
    } else {
        hideOrShowElement(shirtColorDiv, false);
        console.log('Please select a design');
    }
});

// Listen out for changes on the activities checkboxes
document.querySelector('.activities').addEventListener('change', e => {
    // Store the clicked checkbox, it's cost and day/time value
    let clicked = e.target;
    let clickedCost = clicked.getAttribute('data-cost');
    clickedCost = parseInt(clickedCost);
    let clickedTime = clicked.getAttribute('data-day-and-time');

    // check if current clicked checkbox has been checked and do some math
    if (clicked.checked) {
        totalCost += clickedCost;
    } else {
        totalCost -= clickedCost;
    }
    // Update total cost header on page
    totalCostHeader.innerHTML = `Total: $${totalCost}`;

    // Loop over all checkboxes on the page
    for (let i = 0; i < checkboxes.length; i++) {
        let checkboxTime = checkboxes[i].getAttribute('data-day-and-time');
        
        // If the clicked time and current iteration time match, plus they aren't the same checkbox, then do some stuff
        if (clickedTime === checkboxTime && clicked !== checkboxes[i]) {
            // Disable or enable current checkbox
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }
        }
    }
});

/* 
    listen out for changes on the payment info select 
    and change payment options based on that
*/ 
paymentSelect.addEventListener('change', e => {
    let paymentSelected = e.target.value;
    showHidePayOptions(paymentSelected);
});

// Listen out for every key press in the email field and notify when the email is valid or invalid
emailField.addEventListener('keyup', () => {
    if (!emailValidator()) {
        emailField.previousElementSibling.innerHTML = 'Please enter a valid email address';
        emailField.previousElementSibling.style.color = 'red';
    } else {
        emailField.previousElementSibling.innerHTML = 'Email:';
        emailField.previousElementSibling.style.color = 'black';
    }
});

// Listens for a click on the form submit button and checks if all fields are valid
submitBtn.addEventListener('click', e => {
    if(!nameValidator()) {e.preventDefault(); console.log('There is no name');}
    if(!emailValidator()) {e.preventDefault(); console.log('There is no email');}
    if(!activityValidator()) {e.preventDefault(); console.log('There is no activity selected');}
    if(!paymentValidtor()) {e.preventDefault(); console.log('There is no payment details');}
});