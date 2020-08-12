const nameField = document.getElementById('name');
const jobField = document.getElementById('other-title');
const colourSelect = document.getElementById('color'); 
const designSelect = document.getElementById('design');

// FUNCTIONS
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
});

designSelect.addEventListener('change', (event) => {
    let selected = event.target.value;

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


// // 1) Follow the steps below to hide the "Select a shirt" option tag so users won't be able to select it or see it in the drop down menu
//   // 1a) Target the "Select a shirt" `option` element with a querySelector, like so — ('option[value="Select a shirt"]') 
//   // 1b) Use dot notation to set the `hidden` property to true on the "Select a shirt" `option` element 
//   document.querySelector('option[value="Select a shirt"]').hidden = true;

// // 2) Follow the steps below to practice manually selecting which option will show in the "Shirt Selection" field
//   const shirtSelectElement = document.querySelector('#shirt-select-element');
//   const shirtOptionElements = document.querySelectorAll('#shirt-select-element option');

//   // 2a) Log both variables to the console to confirm their values
//   console.log(shirtSelectElement);
//   console.log(shirtOptionElements);
//   // 2b) Use the second variable and bracket notation to select one of the option elements and try logging it out to confirm its value 
//   console.log(shirtOptionElements[1]);
//   // 2c) Use dot notation to set the `selected` property to true on the `option` element you selected above
//   shirtOptionElements[1].selected = true;
//   // 2d) Refresh the browser to see the new value in the `select` element
//   // 2e) Experiment with setting the `selected` property to true or false on different option elements to see the results


// /**
//  * Event listener for checkboxes
//  */
// shirtSelectElement.addEventListener('change', (event) => {

// // 3) Follow the steps below to highlight the selected shirt 
//   // 3a) Log out the value of the `select` element with `event.target` technique — console.log(event.target.value);
// //  console.log(event.target.value);
//   // 3b) Create a variable to store the shirt `img` elements, using a querySelectorAll, like so — ('.shirt-image') 
//   let shirtImages = document.querySelectorAll('.shirt-image');
//   // 3c) Create a `for` loop to iterate over the shirt `img` elements in the variable above
//   for (let i = 0; i < shirtImages.length; i++) {
//     // 3d) Inside the loop, create the following two variables:
//     // One to store the alt attribute of the image at the loop's current iteration, like so: YourImgVariableName[i].alt
//     let imageAlts = shirtImages[i].alt;
//     // One for the `event.target.value`
//     let target = event.target.value;
//     // 3e) Log out the two variables, refresh the page, and select a new shirt to confirm their values
//     console.log(imageAlts);
//     console.log(target);
//     // 3f) Still inside the loop, create an if/else statement 
//     if(imageAlts === target) {
//       // 3g) If the two variables you just created are equal, use the `.classList.add()` method to add the 'chosen' className to the img element
//       shirtImages[i].classList.add('chosen');
//     } else {
//       // 3h) Else use the `.classList.remove()` method to remove the 'chosen' className from the from the img element
//       shirtImages[i].classList.remove('chosen');
//     } 
//   }
//   console.log("The select element's change event listener is functional!");
// });