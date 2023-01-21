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

const itemsArr = [...items];
const htmlContainer = document.querySelector(".container");

const cardTemplate = document.querySelector("#cardTemplate");

function remderItemCard(item) {
  let template = cardTemplate.content.cloneNode(true);

  template.querySelector("#itemImg").src = './img/' + item.imgUrl
  template.querySelector("#itemTitle").innerText = item.name;
  template.querySelector("#itemStockLeft").innerText = item.orderInfo.inStock;
  template.querySelector("#itemPrice").innerText = item.price;
  template.querySelector("#itemReview").innerText = item.orderInfo.reviews;

  return template;
}

itemsArr.forEach((item) => {
  let card = remderItemCard(item);
  htmlContainer.append(card);
});
