let foodMenu = [
  {
    image: "./img/burger.jpeg",
    title: "Burger",
    dishes: [
      {
        name: "Burger Heisenberg",
        ingredients:
          "mit Hamburgerfleisch, Tomaten,Salat, Zwiebeln und saure Gurken",
        price: twoDecimals(8.3),
      },
      {
        name: "Burger Jeassi",
        ingredients: "mit Hamburgerfleisch, Tomaten,Salat, Oliven und Spek",
        price: twoDecimals(9.5),
      },
      {
        name: "Burger Salamaka",
        ingredients:
          "mit Hamburgerfleisch, Tomaten,Salat, Mozzarela und Rostige Paprika",
        price: twoDecimals(7.5),
      },
      {
        name: "Burger Soll",
        ingredients: "mit Hamburgerfleisch, Tomaten,Salat, Käse und Chili",
        price: twoDecimals(9.3),
      },
    ],
  },
  {
    image: "./img/pizza.jpeg",
    title: "Pizza",
    dishes: [
      {
        name: "Pizza Heisenberg",
        ingredients:
          "mit Tomatensauce, Mozzarella, Fior di Latte und scharfer Salami",
        price: twoDecimals(13.3),
      },
      {
        name: "Pizza Jeassi",
        ingredients:
          "mit Tomatensauce, Büffel Mozzarella, Rucola, Cherry Tomaten und Olivenöl",
        price: twoDecimals(15.9),
      },
      {
        name: "Pizza Salamanka",
        ingredients:
          "mit Tomatensauce, Mozzarella Fior di Latte, Champignons und Schinken",
        price: twoDecimals(14.7),
      },
      {
        name: "Pizza Soll",
        ingredients:
          "mit Mozzarella Fior di Latte, Cherry Tomaten, Pesto Genovese",
        price: twoDecimals(12.5),
      },
    ],
  },
  {
    image: "./img/pasta.jpeg",
    title: "Pasta",
    dishes: [
      {
        name: "Pasta Heisenberg",
        ingredients:
          "mit Ananas, Hühnerstreifen, Curry, Rahmsauce, Zwiebeln und Champignons",
        price: twoDecimals(13.9),
      },
      {
        name: "Pasta Jeassi",
        ingredients: "mit Scampis, Knoblauch, Rucola und Cherrytomaten",
        price: twoDecimals(11.9),
      },
      {
        name: "Pasta Salamanka",
        ingredients: "Gnochi mit Gorgonzolasauce, Büffel Mozzarella",
        price: twoDecimals(12.9),
      },
      {
        name: "Pasta Soll",
        ingredients:
          "mit Shrimps, Rucola, Cherrytomaten, Knoblauch und Tomatensauce",
        price: twoDecimals(14.5),
      },
    ],
  },
];

let basket = [
  {
    dishTitles: [],
    dishIngredients: [],
    dishPrices: [],
    totalPrices: [],
    amounts: [],
  },
];

function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < foodMenu.length; i++) {
    const food = foodMenu[i];
    content.innerHTML += renderImagesTitlesHtml(food, i);

    for (let j = 0; j < food.dishes.length; j++) {
      const dish = food.dishes[j];
      content.innerHTML += renderDishesHtml(dish, i, j);
    }
  }
  renderBasket();
  renderResponsiveBasketButton();
}

function renderBasket() {
  let itemBasket = document.getElementById("basket");

  itemBasket.innerHTML = "";

  if (basket[0].dishTitles.length < 1) {
    itemBasket.innerHTML += generateBasketInfoHtml();
  } else {
    itemBasket.innerHTML += generateBasketItems();
    if (!pickUpButtonActive()) {
      itemBasket.innerHTML += generateMinimumOrderOrCheckout();
    } else {
      itemBasket.innerHTML += generatePickUpOrder();
    }
  }
}

function generateBasketItems() {
  let itemsContent = "";
  for (let i = 0; i < basket[0].dishTitles.length; i++) {
    let dishTitle = basket[0].dishTitles[i];
    let dishIngredient = basket[0].dishIngredients[i];
    let dishPrice = basket[0].totalPrices[i];
    let dishAmount = basket[0].amounts[i];

    itemsContent += generateFilledBasketHtml(
      dishTitle,
      dishIngredient,
      dishPrice,
      dishAmount,
      i
    );
  }
  return itemsContent;
}

function renderResponsiveBasketButton() {
  let deliveryFee = twoDecimals(6.0);
  let subTotalPrice = calcTotalBasketPrice();
  let totalPrice = twoDecimals(+subTotalPrice + +deliveryFee);
  let totalPricenoDelivery = twoDecimals(+subTotalPrice);
  let responsiveBasketButton = document.getElementById(
    "responsiveBasketButton"
  );

  responsiveBasketButton.innerHTML = generateResponsiveBasketButton(
    subTotalPrice,
    totalPrice,
    totalPricenoDelivery
  );
}

function generateResponsiveBasketButton(
  subTotalPrice,
  totalPrice,
  totalPricenoDelivery
) {
  if (subTotalPrice < 18) {
    return responsiveBasketButtonNoDeliveryHtml(totalPricenoDelivery);
  }
  if (pickUpButtonActive()) {
    return responsiveBasketButtonPickUpHtml(subTotalPrice);
  }
  return responsiveBasketButtonDeliveryHtml(totalPrice);
}

function pickUpButtonActive() {
  let pickUpButton = document.getElementById("pickUpButton");
  return pickUpButton.classList.contains("active-button");
}

function generatePickUpOrder() {
  let subTotalPrice = calcTotalBasketPrice();
  let totalPricenoDelivery = twoDecimals(+subTotalPrice);
  return generatePickUpOrderHtml(subTotalPrice, totalPricenoDelivery);
}

function generateMinimumOrderOrCheckout() {
  let deliveryFee = twoDecimals(6.0);
  let subTotalPrice = calcTotalBasketPrice();
  let minimumOrderValue = calcMinimumValueOrder();
  let totalPrice = twoDecimals(+subTotalPrice + +deliveryFee);

  if (subTotalPrice < 18) {
    return generateMinimumOrderValueHtml(minimumOrderValue, subTotalPrice);
  } else {
    return generateCheckoutHtml(deliveryFee, subTotalPrice, totalPrice);
  }
}


function addToBasket(i, j) {
  let dish = foodMenu[i].dishes[j];
  let basketIndex = getBasketIndex(dish.name);

  if (basketIndex === -1) {
    addDishToBasket(dish);
  } else {
    increaseDishAmount(basketIndex);
  }
  renderBasket();
  renderResponsiveBasketButton();
}

function addDishToBasket(dish) {
  basket[0].dishTitles.push(dish.name);
  basket[0].dishIngredients.push(dish.ingredients);
  basket[0].dishPrices.push(dish.price);
  basket[0].totalPrices.push(dish.price);
  basket[0].amounts.push(1);
}

function getBasketIndex(dishName) {
  let basketIndex = basket[0].dishTitles.indexOf(dishName);
  return basketIndex;
}

function increaseDishAmount(basketIndex) {
  basket[0].amounts[basketIndex]++;
  calcSingleDishTotalPrice(basketIndex);
  renderBasket();
  renderResponsiveBasketButton();
}

function decreaseDishAmount(basketIndex) {
  if (basket[0].amounts[basketIndex] > 1) {
    basket[0].amounts[basketIndex]--;
    calcSingleDishTotalPrice(basketIndex);
  } else {
    deleteDishFromBasket(basketIndex);
  }
  renderBasket();
  renderResponsiveBasketButton();
}

function deleteDishFromBasket(basketIndex) {
  basket[0].dishTitles.splice(basketIndex, 1);
  basket[0].dishIngredients.splice(basketIndex, 1);
  basket[0].dishPrices.splice(basketIndex, 1);
  basket[0].totalPrices.splice(basketIndex, 1);
  basket[0].amounts.splice(basketIndex, 1);
}

function calcSingleDishTotalPrice(basketIndex) {
  basket[0].totalPrices[basketIndex] = twoDecimals(
    basket[0].amounts[basketIndex] * basket[0].dishPrices[basketIndex]
  );
}

function calcTotalBasketPrice() {
  let totalBasketPrice = 0;
  let totalPrices = basket[0].totalPrices;

  for (let number = 0; number < totalPrices.length; number++) {
    totalBasketPrice += +totalPrices[number];
  }
  return twoDecimals(totalBasketPrice);
}

function calcMinimumValueOrder() {
  let subTotal = calcTotalBasketPrice();
  let minimumOrderValue = +18;
  let remainingSum = minimumOrderValue - subTotal;
  return twoDecimals(remainingSum);
}

function sendOrder() {
  basket[0].dishTitles = [];
  basket[0].dishIngredients = [];
  basket[0].dishPrices = [];
  basket[0].totalPrices = [];
  basket[0].amounts = [];

  openPopup();
  renderBasket();
  renderResponsiveBasketButton();
}

function twoDecimals(price) {
  return price.toFixed(2);
}


window.onscroll = function () {
  let navContainer = document.getElementById("navContainer");
  if (window.scrollY > 592) {
    navContainer.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
};

function toggleButton(clickedButton) {
  let buttons = document.querySelectorAll(".delivery-pickup button");
  buttons.forEach((button) => {
    if (button === clickedButton) {
      button.classList.add("active-button");
    } else {
      button.classList.remove("active-button");
    }
  });
  renderBasket();
  renderResponsiveBasketButton();
  changestyleDeliveryPickup();
}

function changestyleDeliveryPickup() {
  let location = document.getElementById("location");
  let minOrderDelivery = document.getElementById("minOrderDeliveryCost");

  minOrderDelivery.classList.toggle("d-none", pickUpButtonActive());
  location.classList.toggle("d-none", !pickUpButtonActive());
}

function toggleResponsiveBasket() {
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  responsiveBasket.classList.toggle("show-responsive-basket");
  body.classList.toggle("remove-scrollbar");
}

window.onresize = function () {
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  if (window.innerWidth > 1025) {
    responsiveBasket.classList.remove("show-responsive-basket");
    body.classList.remove("remove-scrollbar");
  }
};

function openPopup() {
  let orderPopup = document.getElementById("orderPopup");
  let responsiveBasket = document.getElementById("sideBasket");
  let body = document.body;

  if (responsiveBasket.classList.contains("show-responsive-basket")) {
    responsiveBasket.classList.remove("show-responsive-basket");
    body.classList.remove("remove-scrollbar");
  }
  orderPopup.classList.toggle("display-none");
}

function closePopup() {
  let orderPopup = document.getElementById("orderPopup");
  orderPopup.classList.toggle("display-none");
}

function doNotClose(event) {
  event.stopPropagation();
}

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
