
// Global variables
const nameField = document.getElementById('name');
const jobField = document.getElementById('other-title');
const colourSelect = document.getElementById('color'); 
const designSelect = document.getElementById('design');
const checkboxes = document.querySelectorAll('.activities input');
let totalCostHeader = document.createElement('h3');
totalCost = 0;

// Function that shows certain option within the t-shirt colour 
// option drop down menu, depending on the data passed to it
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
});

// Listens out for changes on the t-shirt info drop down
designSelect.addEventListener('change', (event) => {
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
document.querySelector('.activities').addEventListener('change', (e) => {
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