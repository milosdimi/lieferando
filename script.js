// window.onscroll = function() {
//     let shoppingCart = document.getElementById('shoppingCart');
//     if(window.scrollY > 0) {
//         shoppingCart.style = 'top: 0';
//     } else {
//         shoppingCart.style = 'top: 100px';
//     }
// }

function toggleMenu() {
    let links = document.getElementById("burger-links");
    if (links.style.display === "block") {
      links.style.display = "none";
    } else {
      links.style.display = "block";
    }
  }