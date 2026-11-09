// George Poelcher III 
// GIT 417 - Prof. Bailey
// Final Project

"use strict";

let formButton = document.querySelector("form input[type^=submit]");
let themeToggle = document.querySelector("#dark-mode");
let darkRotation = 0;

//Toggles the light/dark mode theme by adding or removing a dark-mode class
//I also made a fun little toggle animation by spinning the inner SVG!
function toggleDarkMode(e){
    let page = document.querySelector("html");
    let sunMoon = themeToggle.firstChild;
    page.classList.toggle("dark-mode");

    darkRotation += 180;
    sunMoon.style.transform = `rotate(${darkRotation}deg)`;
}

//This is a global variable for storing objects for quick purchase
let shoppingCart = new Map();

//Initializing commonly used cart elements for various method uses.
let buyButton = document.querySelectorAll(".product-card button");
let cartList = document.getElementById("cart-items");
let checkoutButton = document.querySelector("#overview #checkout-div button");
let cartText = document.getElementById("message-span");

//Constants used for cart calculations
const TAX_RATE = 1.06;
const SHIP_FEE = 5.00;

//Radio buttons to keep track of which contect method is preferred
let emailRadio = document.querySelector("fieldset #emailPref");
let phoneRadio = document.querySelector("fieldset #phonePref");

//Adds each selected product to the cart when its button is clicked.
//This only allows each item to be added once.
function addProduct(e){
    let priceElement = e.target.previousElementSibling;
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    cartText.innerHTML = "";

    let name = priceElement.previousElementSibling.innerHTML;

    //Only allows for customer to add one of each item to the shopping cart
    if(!shoppingCart.has(name)){
        shoppingCart.set(name, price);

        updateCart();
    }
}

//Removes an item from the cart if its "remove" button is clicked in the cart.
function removeProduct(e){
    let itemContent = e.target.parentNode;
    let name = itemContent.textContent.split("$")[0].trim();

    shoppingCart.delete(name);
    itemContent.remove();

    if(shoppingCart.size === 0){
        cartText.innerHTML = "Products will appear here as you add them!";
    }

    updateCart();
}

//Called every time the cart is modified (add/remove an item). Updates the DOM to reflect cart content.
function updateCart(){
    cartList.innerHTML = "";

    if(shoppingCart.size > 0){
        checkoutButton.classList.remove("hidden");

         for(let [name, cost] of shoppingCart){
             cartList.innerHTML += `<li>${name}\t$${cost}\t<button><object data="images/svg/svg_x.svg" type="image/svg+xml" height="20px" width="20px"></object></button></li>`;
         }

        
        cartList.innerHTML += `<hr><li>Subtotal: $${subTotal()}</li>\n<li>Tax Rate: ${TAX_RATE}%</li>\n<li>Shipping: $${SHIP_FEE}.00</li>`;
        cartList.innerHTML += `<hr>\n<li>Total: $${cartTotal()}</li>`;

        let removeButton = document.querySelectorAll("#cart-items li button");
        for(let button of removeButton){
            button.addEventListener("click", removeProduct);
        }
    }

    else{
        checkoutButton.classList.add("hidden");
    }
}

function subTotal(){
    let sum = 0;
    for(let [item, cost] of shoppingCart){
        sum += cost;
    }

    return sum.toFixed(2);
}

//Function used to quickly calculate new total of shopping cart items
function cartTotal(){
    let sum = subTotal() * TAX_RATE + SHIP_FEE;

    return sum.toFixed(2);
}

//TO-DO: Write note to user that checkout is completed and return points earned
function checkout(e){
    let pointsEarned = Math.round(cartTotal() * 3);
    shoppingCart.clear();
    updateCart();

    cartText.innerHTML = `Thank you for your purchase! This transaction will be added to your MyNintendo purchase history within 24 hours.`;
    cartText.innerHTML += ` For today's purchase, you've earned ${pointsEarned} Points! These will be deposited into your MyNintendo Account Points Balance within 24 hours.`;
}

//Object used for storing applicant information entered into the form.
//Contains a debug function used in console for showing information being stored correctly.
let applicant = {
    firstName: "fName",
    lastName: "lName",
    phoneNumber: "phone",
    email: "email",
    comments: "comment",
    contactPreference: "null", //Can either be "phone" or "email"

    //This is a debug function that is called every time the form is submitted to the console.
    //I figured this would be a good way to show that the form is actually storing the entered info somewhere.
    showApplicant(){
        console.log("Name: " + this.firstName + " " + this.lastName + "\nPhone: " + this.phoneNumber + "\nEmail: " + this.email + "\nComments: " + this.comments + "\nContact Preference: " + this.contactPreference);
    }
};

//Dedicated function to turning on and off whichever radio input is chosen for contact preference.
//Visually updates the form to show which field is required and adding the required class for checking form completion.
function toggleRequired(e){
    if(e.target.value === "email"){
        document.querySelector("label[for^='email']").innerHTML += `<span class="required">*</span>`;
        document.querySelector("#email").setAttribute("required", "");

        document.querySelector("label[for^='phone']").innerHTML = `Phone Number`;
        document.querySelector("#phoneNumber").removeAttribute("required");
    }

    else{
        document.querySelector("label[for^='phone']").innerHTML += `<span class="required">*</span>`;
         document.querySelector("#phoneNumber").setAttribute("required", "");

        document.querySelector("label[for^='email']").innerHTML = `Email`;
        document.querySelector("#email").removeAttribute("required");
    }
}

//Overrides default behavior and instead performs a custom form validation method.
function validateForm(e){
    e.preventDefault();
    let isValid = true;

    //Resets innerHTML of any elements used to communicate errors in the form.
    document.querySelector("#apply p:last-of-type").innerHTML = "";
    for(let span of document.querySelectorAll(".error-span")){
        span.innerHTML = "";
    }

    //I added the optional value of '[A-z] to accomodate for names with ' included
    const nameCheck = /^[A-Za-z]{2,}([-|'][A-Za-z]{2,})?$/;
    let fName = document.querySelector("form #firstName");
    let lName = document.querySelector("form #lastName");

    //Requires emails to have minimum two characters before and after @, limits to 3 letters for TLD
    const emailCheck = /^[A-Za-z0-9._-]{2,}@[A-Za-z0-9.-]{2,}\.[A-Za-z]{2,3}$/;
    let email = document.querySelector("form #email");

    //Allows for optional regional codes, optional - between characters while enforcing number lengths
    const phoneCheck = /^(\+[0-9]{1,3}-)?[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/;
    let phone = document.querySelector("form #phoneNumber");

    //Only will check if length > 0, otherwise any comments are okay.
    let formComment = document.querySelector("form #comments");

    //Checks if first name is valid
    if(!nameCheck.test(fName.value)){
        isValid = false;
        
        if(fName.value.length < 2){
            fName.nextSibling.nextSibling.innerHTML += `<p>First name must be two letters or longer!</p>`;
        }
    }

    //Checks if last name is valid
    if(!nameCheck.test(lName.value)){
        isValid = false;
        
        if(lName.value.length < 2){
            lName.nextSibling.nextSibling.innerHTML += `<p>Last name must be two letters or longer!</p>`;
        }
    }

    //Sees if the entered email is valid AND if the email address is the preferred contact method
    if(!emailCheck.test(email.value) && email.required){
        isValid = false;
        email.nextSibling.nextSibling.innerHTML += `<p>Please enter a valid email address!</p>`;
    }

    //Sees if the entered phone is valid AND if the phone number is the preferred contact method
    if(!phoneCheck.test(phone.value) && phone.required){
        isValid = false;
        phone.nextSibling.nextSibling.innerHTML += `<p>Please enter a valid phone number!</p>`
    }

    //Check for radio input to be selected
    if(!(emailRadio.checked || phoneRadio.checked)){
        isValid = false;
        console.log(document.querySelector("fieldset .error-span"));
        document.querySelector("fieldset .error-span").innerHTML += `<p>Please choose a contact preference!</p>`;
    }

    //Sees if a comment is actually typed in to the field or not.
    if(formComment.value.length < 1){
        isValid = false;
        formComment.nextSibling.nextSibling.innerHTML += `<p>Please provide additional comments you'd like us to know!</p>`        
    }

    //This statement executes if the form is submitted with all valid data.
    //Will not submit the information and inform user if there are errors remaining.
    if(isValid){
        applicant.firstName = fName.value;
        console.log(fName.value);
        applicant.lastName = lName.value;
        applicant.phoneNumber = phone.value;
        applicant.comments = formComment.value;
        
        if(emailRadio.checked){
            applicant.contactPreference = emailRadio.value;
        }

        else{
            applicant.contactPreference = phoneRadio.value;
        }

        //Calls the debug function to show that the applicant information is properly stored.
        applicant.showApplicant();
        document.querySelector("#apply p:last-of-type").innerHTML += `Application submitted successfully! We'll reach out through your preferred method with more information once we've completed our review.`;
        
        //Built-in form funcion that resets all fields.
        document.querySelector("form").reset();
    }
}

//Creating EventListeners for all necesssary actions
checkoutButton.addEventListener("click", checkout);
themeToggle.addEventListener("click", toggleDarkMode);
emailRadio.addEventListener("change", toggleRequired);
phoneRadio.addEventListener("change", toggleRequired);
formButton.addEventListener("click", validateForm);

for(let button of buyButton){
    button.addEventListener("click", addProduct);
}