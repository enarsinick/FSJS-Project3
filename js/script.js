/* 

Split up the payment field validators into seperate functions, so I can 
return true or false, instead of trying to do it all in one function

*/




// Global variables
const nameField = document.getElementById('name');
const emailField = document.getElementById('mail');
const jobField = document.getElementById('other-title');
const colourSelect = document.getElementById('color'); 
const designSelect = document.getElementById('design');
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

const activityValidator = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }

    activitiesContainer.style.borderColor = 'red';
    activitiesContainer.firstElementChild.style.color = 'red';
    return false;
}

const paymentValidtor = () => {
    let selectedPayment = paymentSelect.value;
    
    if (selectedPayment === 'credit card') {
        let ccNum = ccField.value;
        let zip = zipField.value;
        let cvv = cvvField.value;

        if (ccNum.length > 12 && ccNum.length < 17) {
            ccField.style.borderColor = 'rgb(111, 157, 220)';
        } else {
            ccField.style.borderColor = 'red';
        };

        if (zip.length === 5) {
            zipField.style.borderColor = 'rgb(111, 157, 220)';
        } else {
            zipField.style.borderColor = 'red';
        }

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
        creditCardDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
    } else if (option === 'bitcoin') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    } else {
        bitcoinDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        creditCardDiv.style.display = 'block';
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
        makeColourOptionsHidden(colourSelect, 0, colourSelect.length);
        for(let i = 0; i <= 2; i++) {
            colourSelect[i].hidden = false;
        }
    } else if (selected === 'heart js') {
        makeColourOptionsHidden(colourSelect, 0, colourSelect.length);
        for(let i = 3; i <= 5; i++) {
            colourSelect[i].hidden = false;
        }
    } else {
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

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    nameValidator();
    emailValidator();
    activityValidator();
    paymentValidtor();
});


// /* Real time validation */
// // To add real time validation, use the .addEventListener() method on the form elements/sections
// // Use events like `keyup`, `blur` and/or `mouseout`
// // As the callback, use the validation functions above, but remember, 
// // Don't use parens when passing a reference to a function as a callback  


// /* Submit listener on the form element */
// form.addEventListener('submit', (e) => {
//   // 1. Create an if statement
//     // If `(!nameValidator())` call `e.preventDefault();` 
//       // And log out a message saying this validator prevented submission
  
//   // 2. Repeat the above step for the rest of your validation functions

//   // And feel free to comment out or delete any log statements from the validation functions above
//   if(!nameValidator()) {e.preventDefault(); console.log('There is no name');}
//   if(!emailValidator()) {e.preventDefault(); console.log('There is no email');}
//   if(!frameworkValidator()) {e.preventDefault(); console.log('There is no framework');}
//   if(!languageValidator()) {e.preventDefault(); console.log('There is no language');}

//   // Submit handler test log - Feel free to delete this or comment it out
//   console.log('Submit handler is functional!');
// });