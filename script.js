function clicktButton(clickedButton) {
    let buttons = document.querySelectorAll(".pickup button");
    buttons.forEach((button) => {
      if (button === clickedButton) {
        button.classList.add("active-btn");
      } else {
        button.classList.remove("active-btn");
      }
    });
    renderBasket();
    renderResponsiveBasketButton();
    changestyleDeliveryPickup();
  }
  