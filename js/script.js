//Accordion script
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

//Slider script
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
  setTimeout(showSlides, 3000);
}

const itemsArr = [...items2];
const htmlContainer = document.querySelector(".container");

const cardTemplate = document.querySelector("#cardTemplate");

function renderItemCard(item) {
  let template = cardTemplate.content.cloneNode(true);

  template.querySelector("#itemImg").src = "./img/" + item.imgUrl;
  template.querySelector("#itemTitle").innerText = item.name;
  template.querySelector("#itemStockLeft").innerText = item.orderInfo.inStock;
  template.querySelector("#itemStockLeft").innerText = item.orderInfo.inStock;
  template.querySelector("#itemStockLeftIcon").src =
    item.orderInfo.inStock > 0
      ? "./img/icons/in_stock.svg"
      : "./img/icons/not_in_stock.svg";
  template.querySelector("#itemStockLeftIcon").style =
    item.orderInfo.inStock > 0
      ? "border: 1px solid green; border-radius: 50%;"
      : "border: none";
  template.querySelector("#itemPrice").innerText = item.price;
  template.querySelector("#itemReview").innerText =
    item.orderInfo.reviews + "%";
  template.querySelector("#orders").innerText = item.orderInfo.orders;
  template.querySelector("#itemBoxbtn").classList +=
    item.orderInfo.inStock > 0
      ? " item-box__btn-active"
      : " item-box__btn-disable";
  template.querySelector(".item-box__img").dataset.dataId = item.id;
  // console.log(template.querySelector(".item-box").dataset.dataId)

  return template;
}

itemsArr.forEach((item) => {
  let card = renderItemCard(item);
  htmlContainer.append(card);
});

const modalTeamplate = document.querySelector("#modalTeamplate");
const wrapper = document.querySelector(".wrapper");

const container = document.querySelectorAll(".item-box");

function createModalWindow(actingItem) {
  let template = modalTeamplate.content.cloneNode(true);
  // console.log(e.target);

  // const actingItem = array.find((el) => {
  //   return el.id === +e.target.dataset.dataId;
  // });

  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";

  template.querySelector("#detailCartImg").src = "./img/" + actingItem.imgUrl;
  template.querySelector("#itemTitle").innerText = actingItem.name;
  template.querySelector("#itemPrice").innerText = actingItem.price;
  template.querySelector("#itemReview").innerText =
    actingItem.orderInfo.reviews + "%";
  template.querySelector("#detailCharColor").innerText = actingItem.color;

  if (actingItem.os) {
    template.querySelector("#detailCharOS").innerText = actingItem.os;
  } else {
    template.querySelector("#detailCharOS").parentNode.style.display = "none";
  }

  template.querySelector("#detailCharChip").innerText = actingItem.chip.name;
  template.querySelector("#detailCharHeight").innerText =
    actingItem.size.height;
  template.querySelector("#detailCharWidth").innerText = actingItem.size.width;
  template.querySelector("#detailCharDepth").innerText = actingItem.size.depth;
  template.querySelector("#detailCharWeight").innerText =
    actingItem.size.weight;
    
  modalContent.append(template);
  modal.style.display = "block";
}

// const chlidrenArr = [...elem.children];

// chlidrenArr.forEach((el) =>
// el.addEventListener("click", createModalWindow(e))
// );

container.forEach((elem) =>
  elem.addEventListener("click", function (e) {
    const actingItem = itemsArr.find((el) => {
      return el.id === +e.target.dataset.dataId;
    });

    createModalWindow(actingItem);
  })
);

const modal = document.getElementById("myModal");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
