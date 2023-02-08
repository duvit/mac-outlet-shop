const searchBtnCategories = document.querySelector(".search-btn-categories");
const searchBtnSort = document.querySelector(".search-btn-sort");

searchBtnCategories.addEventListener("click", () => {
  let block = searchBtnCategories.nextElementSibling;

  if (block.style.display === "none") {
    block.style.display = "block";
    searchBtnCategories.style = "background: #102243;";
  } else {
    searchBtnCategories.style = "background: #0e49b5;";
    block.style.display = "none";
  }
});

searchBtnSort.addEventListener("click", () => {
  let block = searchBtnSort.nextElementSibling;

  if (block.style.display === "none") {
    block.style.display = "block";
    searchBtnSort.style = "background: #102243;";
  } else {
    searchBtnSort.style = "background: #0e49b5;";
    block.style.display = "none";
  }
});

function showCart() {
  const cartBtn = document.querySelector(".header__panel__cart");
  const cart = document.querySelector(".shop-cart");

  cartBtn.addEventListener("click", () => {
    if (cart.style.display === "none") {
      cart.style.display = "block";
    } else {
      cart.style.display = "none";
    }
  });
}
showCart();

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

  div.dataset.id = item.id;

  div.addEventListener("click", function () {
    createModalWindow(item);
  });

  return div;
}

itemsArr.forEach((item) => {
  let card = renderItemCard(item);
  htmlContainer.append(card);
});

const addCartBtn = [...document.querySelectorAll(".add-cart-btn")];
const shopCartBox = document.querySelector(".shop-cart");

const shopCartArr = [];

addCartBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();

    // const itemsToCart = itemsArr.forEach((item) => item.toCart = 0);
    const itemsToCart = [...itemsArr];

    let itemToCart = null;

    let div = document.createElement("div");

    const shopCartContainer = document.querySelector("#shop-cart__holder");

    if (shopCartArr.length < 4) {
      itemsToCart.forEach((item) => {
        if (item.id === +e.target.parentElement.dataset.id) {
          itemToCart = item;
        }
      });

      if (shopCartArr.includes(itemToCart)) {
        itemToCart.inCart++;
      } else if (itemToCart.orderInfo.inStock > 0) {
        shopCartContainer.innerHTML = "";
        itemToCart.inCart = 1;
        shopCartArr.push(itemToCart);
      }

      if (shopCartArr.length) {
        shopCartArr.forEach((itemInCart) => {
          div.innerHTML = `
        
        <div class="shop-cart__item">
        <img class="shop-cart__item-img" src="./img/${itemInCart.imgUrl}" />
          <div class="shop-cart__item-info">
            <h4 class="shop-cart__item-title">${itemInCart.name}</h4>
            <p class="shop-cart__item-price">$ ${itemInCart.price}</p>
          </div>
          <div class="shop-cart__item-btns">
            <button class="shop-cart__item-btn"><</button>
            <span>${itemInCart.inCart}</span>
            <button class="shop-cart__item-btn">></button>
            <button class="shop-cart__item-btn shop-cart__item-close-btn">
              x
            </button>
          </div>`;

          shopCartContainer.append(div);
        });
      }
    }

    console.log(shopCartArr);
  });
});

const container = document.querySelectorAll(".item-box");

function createModalWindow(item) {
  let detailCart = document.createElement("div");
  detailCart.classList = "detail-cart";

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

  detailCart.innerHTML = `<div class="detail-cart__item">
  <img
    class="detail-cart__img"
    src="./img/${item.imgUrl}"
  />
  </div>
    <div class="detail-cart__item detail-cart__stats">
      <h3
        class="item-box__title item-box__title-detail-cart">
        ${item.name}</h3>
      <div class="item-box__stats item-box__stats-detail-cart">
        <div class="item-box__reviews detail-cart__rewiev">
          <p><span >${item.orderInfo.reviews}%</span> Positive reviews</p>
          <p>Above avarage</p>
        </div>
        <div class="item-box__orders">
          <p><span>${item.orderInfo.orders}</span></p>
          <p>orders</p>
        </div>
      </div>
      <div class="detail-cart__chars">
        <p class="detail-cart__char">
          Color: <span id="detailCharColor">${item.color.join(", ")}</span>
        </p>
        <p class="detail-cart__char">
          ${itemOs}
        </p>
        <p class="detail-cart__char">
          Chip: <span>${item.chip.name}</span>
        </p>
        <p class="detail-cart__char">
          Height: <span>${item.size.height} cm</span>
        </p>
        <p class="detail-cart__char">
          Width: <span>${item.size.width} cm</span>
        </p>
        <p class="detail-cart__char">
          Depth: <span>${item.size.depth} cm</span>
        </p>
        <p class="detail-cart__char">
          Weight: <span>${item.size.weight} g</span>
        </p>
      </div>
    </div>
      <div class="detail-cart__item">
          <h5 class="detail-cart__price">$ <span>${item.price}</span></h5>
          <p class="item-stock-left">
            Stock:
            <span class="item-stock-span">${item.orderInfo.inStock}</span> pcs.
          </p>
          <button class="add-cart-btn add-cart-btn_detail-cart ${btnActivity}">
            Add to cart
          </button>
        </div>`;
  modalContent.append(detailCart);
  modal.style.display = "block";
}

const modal = document.getElementById("myModal");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function createShopCart() {}

const shopCart = document.getElementById("shopCart");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function filterItems() {}

function createFilters() {
  const filterObjs = [
    {
      displayName: "Color",
      name: "color",
      options: [],
    },
    {
      displayName: "Memory",
      name: "storage",
      options: [],
    },
    {
      displayName: "OS",
      name: "os",
      options: [],
    },
    {
      displayName: "Display",
      name: "display",
      options: [],
    },
  ];

  itemsArr.forEach((item) => {
    for (let i = 0; i < filterObjs.length; i++) {
      filterObjs[i].options.push(item[filterObjs[i].name]);

      filterObjs[i].options = filterObjs[i].options
        .flat()
        .filter(
          (item, index, array) => array.indexOf(item) === index && item != null
        );
    }
  });

  const filterContainer = document.querySelector(".filter-panel");

  const filterPanelItem = document.createElement("div");
  filterPanelItem.classList = "filter-panel__item";

  const filterPanelBlock = document.createElement("div");
  filterPanelBlock.classList = "filter-panel__block";

  for (const key in filterObjs) {
    let valueLabel = "";

    switch (filterObjs[key].displayName) {
      case "Memory":
        valueLabel = "Gb";
        break;
      case "Display":
        valueLabel = "inch";
        break;

      default:
        break;
    }

    filterPanelItem.innerHTML += `<button class="accordion">${filterObjs[key].displayName}</button>`;

    filterPanelBlock.innerHTML = "";

    for (const iterator of filterObjs[key].options) {
      filterPanelBlock.innerHTML += `
      <label class="filter-panel filter-panel__checkbox"
        >${iterator} ${valueLabel}
         <input data-value=${iterator.toString().replace(" ", "-")} data-type=${
        filterObjs[key].name
      } type="checkbox" />
         <span class="filter-panel__checkmark"></span>
       </label>
      `;
    }

    filterPanelItem.append(filterPanelBlock);
    filterContainer.append(filterPanelItem);
  }

  const minPrice = document.querySelector("#price-from");
  const maxPrice = document.querySelector("#price-to");

  const filterObj = {
    color: [],
    storage: [],
    os: [],
    display: [],
    price: [],
  };

  const filterPanel = document.querySelector(".filter-panel");

  filterPanel.addEventListener("change", (e) => {
    htmlContainer.innerHTML = "";

    const items = [...itemsArr];

    items.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });

    const targetType = e.target.dataset.type;
    const targetValue = e.target.dataset.value
      ? e.target.dataset.value.toString().replace("-", " ")
      : e.target.value;

    if (e.target.checked) {
      if (typeof targetValue === "string") {
        filterObj[targetType].push(targetValue);
      }
    } else if (minPrice.value || maxPrice.value) {
      filterObj[targetType][0] =
        minPrice.value >= items[0].price ? +minPrice.value : items[0].price;
      filterObj[targetType][1] =
        maxPrice.value == 0 || maxPrice.value >= items[items.length - 1].price
          ? items[items.length - 1].price
          : +maxPrice.value;
    } else {
      filterObj[targetType].splice(
        filterObj[targetType].indexOf(targetValue),
        1
      );
    }

    const filteredArr = itemsArr.filter((item) => {
      let acc = true;

      for (const type in filterObj) {
        if (filterObj[type].length) {
          if (typeof filterObj[type][0] === "number") {
            acc =
              acc &&
              item.price >= filterObj[type][0] &&
              item.price <= filterObj[type][1];
          } else if (Array.isArray(item[type])) {
            acc = acc && filterObj[type].some((it) => item[type].includes(it));
          } else if (item[type]) {
            acc = acc && filterObj[type].includes(item[type].toString());
          } else {
            acc = false;
          }
        }
      }
      return acc;
    });

    filteredArr.forEach((item) => {
      let card = renderItemCard(item);
      htmlContainer.append(card);
    });
  });
}

createFilters();

//Accordion script
const filterArr = document.getElementsByClassName("accordion");

for (let i = 0; i < filterArr.length; i++) {
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
