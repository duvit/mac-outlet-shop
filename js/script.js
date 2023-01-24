const filterArr = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < filterArr.length; i++) {
  filterArr[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = "100%";
    }
  });
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

const itemsArr = [...items2];

const cardTemplate = document.querySelector("#cardTemplate");
const htmlContainer = document.querySelector(".container");

function renderItemCard(item) {
  let template = cardTemplate.content.cloneNode(true);

  template.querySelector("#itemImg").src = "./img/" + item.imgUrl;
  template.querySelector("#itemTitle").innerText = item.name;
  template.querySelector("#itemStockLeft").innerText = item.orderInfo.inStock;
  template.querySelector("#itemStockLeftIcon").src =
    item.orderInfo.inStock > 0
      ? "/img/icons/in_stock.svg"
      : "/img/icons/none_in_stock.svg";
  template.querySelector("#itemStockLeftIcon").style =
    item.orderInfo.inStock == 0 ? "border: none" : "border: 1px solid rgba(44, 185, 1, 0.808)";
  template.querySelector("#itemPrice").innerText = item.price;
  template.querySelector("#itemReview").innerText = item.orderInfo.reviews;
  template.querySelector("#orders").innerText = item.orderInfo.orders;

  return template;
}

itemsArr.forEach((item) => {
  let card = renderItemCard(item);
  htmlContainer.append(card);
});

const bannersArr = [...banners];

const bannerTemplate = document.querySelector("#bannerTemplate");
const bannerPlace = document.querySelector("#headerBanner");

function renderBanner(item) {
  let template = bannerTemplate.content.cloneNode(true);
  console.log(
    (template.querySelector("#bannerImage").src = "./img/" + item.imgUrl)
  );
  template.querySelector("#bannerImage").src = "./img/" + item.imgUrl;
  template.querySelector("#bannerTitle").innerText = item.name;

  return template;
}

// bannersArr.forEach((item) => {
//   let banner = renderBanner(item);
//   bannerPlace.append(banner);
// });
