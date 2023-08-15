window.onload = () => {
  const userInput = document.querySelector("#user_input");
  const productCont = document.querySelectorAll(".product_container");
  let pName = document.querySelectorAll("h2");
  let productDiv = document.querySelector("#product_div");
  let popUp = document.querySelector("#pop_up");
  let details = document.querySelector(".details");
  let del = document.querySelector("#del");
  let imgg = document.querySelector("#imgg");
  let form = document.querySelector("form");
  let button = document.querySelector("button");

  // EventListeners
  userInput.addEventListener("keyup", () => {
    search();
  });

  del.addEventListener("click", () => {
    click("auto");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  button.addEventListener("click", () => {
    Swal.fire({
      icon: "success",
      title: "Well done",
      text: "item purchased magically, check your wardrobe😁 ",
    });

    click("auto");
  });
  // End of EventLISTENERS.

  // CASE 1: A () that loops through all h2 elements in HTML which is the product names. its checks if what the user entered is equal to h2.innerHTML(product names). it will only display the ones that bears True. indexof() must be > than -1 to be true because -1 means not found in the string.
  function search() {
    let value = userInput.value.toUpperCase();
    try {
      for (let i = 0; i < pName.length; i++) {
        let h2 = productCont[i].querySelector("h2");

        if (h2) {
          let h2Values = h2.textContent || h2.innerHTML;

          if (h2Values.toUpperCase().indexOf(value) > -1) {
            productCont[i].style.display = "flex";
            productDiv.style.marginTop = `50px`;
          } else {
            productCont[i].style.display = "none";
            productDiv.style.marginTop = `50px`;
          } //End of inner if.
        } //End of If.
      } // End of For loop.
    } catch (error) {
      // console.log(error);
    }
  } //End of CASE 1 Search();

  /* CASE 2: This forEach gives function to each of the productContainer class.
   
   ***its work***
   
 1) it set popup to display block.
 
 2) it clones the main image in each product container and adds it to pop up. after adding clone, it replaces the previous clone with a new clone. this is to avoid repetition of image clones in our pop up.
 
 3) it takes the h2 and h3 respectively and transfer to pop up.
 */
  productCont.forEach((value) => {
    value.addEventListener("click", () => {
      display(value);
    });
  });

  function display(value) {
    click("none");
    popUp.style.display = "flex";

    let h2 = value.querySelector("h2");
    let h3 = value.querySelector("h3");
    let img = value.querySelector("img");
    let clone = img.cloneNode(true);
    clone.setAttribute("class", "clone");

    let popUpH2 = details.querySelector("h2");
    let popUpH3 = details.querySelector("h3");
    let popUpImg = popUp.querySelector("#imgg");

    popUpImg.appendChild(clone);

    const element = popUpImg.children[0];

    popUpH2.innerHTML = `${h2.innerHTML}`;
    popUpH3.innerHTML = `${h3.innerHTML}`;

    popUpH3.style.color = `limegreen`;

    popUpImg.replaceChild(clone, element);

    //CASE 2.1: A mini () that adds animation to the cloned elements by adding drop shadow. it assigns a new class to the cloned element and remove the new class back to its old class in 3secs. This () would be call every 10secs.

    setInterval(() => {
      shadow(clone);
    }, 10000); // ()call each sec

    function shadow(clone) {
      clone.className = `shadow`;

      setTimeout(() => {
        clone.className = clone.className.replace(`shadow`, `clone`);
      }, 3000);
    }
  } // End of Case 2 display();

  //CASE 3: A () that sets popup to display:none and makes productDiv not clickable when pop up is activated.

  function click(value) {
    productDiv.style.pointerEvents = `${value}`;
    popUp.style.display = "none";
  } // End of Case 3 click();
}; // End of General ()✅
