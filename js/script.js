//Accordion script
const filterArr = document.getElementsByClassName("accordion");

for (let i = 0; i < filterArr.length; i++) {
  filterArr[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    // console.log(this.nextElementSibling)
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
  let i;
  let slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
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
  setTimeout(showSlides, 3000);
}

const itemsArr = [...items2];
const htmlContainer = document.querySelector(".container");

const cardTemplate = document.querySelector("#cardTemplate");

function renderItemCard(item) {
  let div = document.createElement("div");
  div.classList = "item-box";

  const itemStockLeftIcon =
    item.orderInfo.inStock > 0
      ? "icons/in_stock.svg"
      : "icons/not_in_stock.svg";

  let itemStockLeftIconBorder = null;

  if (item.orderInfo.inStock > 0) {
    itemStockLeftIconBorder = "item-stockleft-icon-is";
  } else {
    itemStockLeftIconBorder = "item-stockleft-icon-none;";
  }

  let btnActivity = null;
  if (item.orderInfo.inStock > 0) {
    btnActivity = "item-box__btn-active";
  } else {
    btnActivity = "item-box__btn-disable";
  }

  div.innerHTML = `<button class="item-box__like">
  <img src="./img/icons/like_empty.svg" alt="" />
    </button>
  <img
  class="item-box__img"
  src="./img/${item.imgUrl}"
  alt="item image"
  />
  <h3 class="item-box__title">${item.name}</h3>
  <div class="item-box__status">
    <div class="item-box__amount">
     <img
       class="item-stockleft-icon ${itemStockLeftIconBorder}"
       src="./img/${itemStockLeftIcon}"
      />
      <span id="">${item.orderInfo.inStock}</span> left in stock
    </div>
    <h5 class="item-box__price">Price: <span id="itemPrice">${item.price}</span> $</h5>
  </div>
  <button class="add-cart-btn ${btnActivity}" id="itemBoxbtn">Add to cart</button>
  <div class="item-box__stats">
    <div class="item-box__reviews">
      <p><span>${item.orderInfo.reviews}</span> Positive reviews</p>
      <p>Above avarage</p>
    </div>
    <div class="item-box__orders">
      <p><span>${item.orderInfo.orders}</span></p>
      <p>orders</p>
    </div>
  </div>`;

  div.addEventListener("click", function () {
    createModalWindow(item);
  });

  return div;
}

itemsArr.forEach((item) => {
  let card = renderItemCard(item);
  htmlContainer.append(card);
});

const container = document.querySelectorAll(".item-box");

function createModalWindow(item) {
  let div = document.createElement("div");
  div.classList = "detail-cart";

  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";

  let btnActivity = null;
  if (item.orderInfo.inStock > 0) {
    btnActivity = "item-box__btn-active";
  } else {
    btnActivity = "item-box__btn-disable";
  }

  let itemOs = null;
  if (item.os) {
    itemOs = `Operating System: <span id="detailCharOS">${item.os}</span>`;
  } else {
    itemOs = "";
  }

  div.innerHTML = `<div class="detail-cart__item">
  <img
    class="detail-cart__img"
    id="detailCartImg"
    src="./img/${item.imgUrl}"
  />
  </div>
    <div class="detail-cart__item detail-cart__stats">
      <h3
        class="item-box__title item-box__title-detail-cart"
        id="itemTitle">
        ${item.name}</h3>
      <div class="item-box__stats item-box__stats-detail-cart">
        <div class="item-box__reviews detail-cart__rewiev">
          <p><span id="itemReview">${item.orderInfo.reviews}%</span> Positive reviews</p>
          <p>Above avarage</p>
        </div>
        <div class="item-box__orders">
          <p><span id="orders">${item.orderInfo.orders}</span></p>
          <p>orders</p>
        </div>
      </div>
      <div class="detail-cart__chars">
        <p class="detail-cart__char">
          Color: <span id="detailCharColor">${item.color}</span>
        </p>
        <p class="detail-cart__char">
          ${itemOs}
        </p>
        <p class="detail-cart__char">
          Chip: <span id="detailCharChip">${item.chip.name}</span>
        </p>
        <p class="detail-cart__char">
          Height: <span id="detailCharHeight">${item.size.height}</span>
        </p>
        <p class="detail-cart__char">
          Width: <span id="detailCharWidth">${item.size.width}</span>
        </p>
        <p class="detail-cart__char">
          Depth: <span id="detailCharDepth">${item.size.depth}</span>
        </p>
        <p class="detail-cart__char">
          Weight: <span id="detailCharWeight">${item.size.weight}</span>
        </p>
      </div>
    </div>
      <div class="detail-cart__item">
          <h5 class="detail-cart__price">$ <span id="itemPrice">${item.price}</span></h5>
          <p class="item-stock-left">
            Stock:
            <span class="item-stock-span" id="itemStockLeft">${item.orderInfo.inStock}</span> pcs.
          </p>
          <button class="add-cart-btn add-cart-btn_detail-cart ${btnActivity}" id="itemBoxbtn">
            Add to cart
          </button>
        </div>`;
  modalContent.append(div);
  modal.style.display = "block";
}

const modal = document.getElementById("myModal");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function filterItems(event) {}

const createFiltersPanel = () => {
  const filterObj = {};
  const filterContainer = document.querySelector(".filter-panel");

  const filterPanelItem = document.createElement("div");
  filterPanelItem.classList = "filter-panel__item";

  const filterSectionLabel = document.createElement("button");
  filterSectionLabel.classList = "accordion";

  const filterPanelBlock = document.createElement("div");
  filterPanelBlock.classList = "filter-panel__block";

  const filterPanelLabel = document.createElement("label");
  filterPanelLabel.classList = "filter-panel filter-panel__checkbox";

  const filterPanelInput = document.createElement("input");
  filterPanelInput.type = "checkbox";

  const filterPanelCheckmark = document.createElement("span");
  filterPanelCheckmark.classList = "filter-panel__checkmark";

  filterPanelItem.append(filterSectionLabel);
  filterPanelItem.append(filterPanelBlock);
  filterPanelBlock.append(filterPanelLabel);
  filterPanelLabel.append(filterPanelInput, filterPanelCheckmark);

  itemsArr.forEach((item) => {
    color;
    storage;
    os;
    display;
  });
};

// const filterContainer = document.querySelector(".filter-panel");
// const filterPanelItem = document.createElement("div");
// filterPanelItem.classList = "filter-panel__item";

// const filterSectionLabel = document.createElement("button");
// filterSectionLabel.classList = "accordion";

// const filterPanelBlock = document.createElement("div");
// filterPanelBlock.classList = "filter-panel__block";

// const filterPanelLabel = document.createElement("label");
// filterPanelLabel.classList = "filter-panel filter-panel__checkbox";

// const filterPanelInput = document.createElement("input");
// filterPanelInput.type = "checkbox";

// const filterPanelCheckmark = document.createElement("span");
// filterPanelCheckmark.classList = "filter-panel__checkmark";

// filterPanelItem.append(filterSectionLabel);
// filterPanelItem.append(filterPanelBlock);
// filterPanelBlock.append(filterPanelLabel);
// filterPanelLabel.append(filterPanelInput, filterPanelCheckmark);

// filterContainer.append(filterPanelItem)
