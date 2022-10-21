const container_content = document.querySelector(".container-content");
const pagination_element = document.getElementById("pagination");

let current_page = 1;
let rows = 10;

function DisplayList(items, rows_per_page, page) {
  page--;
  console.log(rows_per_page, page);

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  console.log(start, end);
  let paginatedItems = items.slice(start, end);

  renderData(paginatedItems);
}
/* ======================== */
function renderData(dataArr) {
  const container = document.querySelector(".container-content");
  let htmls = "";
  dataArr.forEach((item) => {
    htmls += `<div class="card element${item.id}" onclick="showItemDetail(${
      item.id
    })"  >
                <img class="card__img" src="${item.srcImg[0]}" />  
                <div class="card__title">${item.title}</div>
                <div class="card__item__currentPrice">${numbertoVND(
                  item.currentPrice
                )}</div>
            </div>
        `;
  });
  return (container.innerHTML = htmls);
}
function SetupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";
  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items, rows_per_page);
    console.log(111111);
    wrapper.appendChild(btn);
  }
}
/* ======================== */
function PaginationButton(page, items, rowss) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    DisplayList(items, rowss, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

/* goi ham */
/* DisplayList(books, rows, current_page);
SetupPagination(books, pagination_element, rows); */

//
function changeImg(srcImg) {
  let imgPath = document.querySelector(".modal-body-left .card__img");
  imgPath.setAttribute("src", srcImg);
}
function showItemDetail(id) {
  books.forEach((item) => {
    if (item.id === id) {
      const e = document.querySelector(".element" + id);
      const modal_container = document.querySelector("#modal-container");

      let htmls = `
        <div id="modal">
          <div class="modal-header">
            <p class="btn-close">
              <i class="fa-solid fa-xmark"> </i>
            </p>
            </div>
            <div class="modal-body">
              <div class="modal-body-left">
              <img class="card__img" src="${item.srcImg[0]}" />  
              <div class="modal__img-list">
              </div>
            </div>

            <div class="modal-body-right">
            <div class="card__title">${item.title}</div>
              <p class="card__author">Tác giả: ${item.author}</p>
              <div>
                <div class="card__currentPrice">${numbertoVND(
                  item.currentPrice
                )}</div>
                <div class="card__price">${numbertoVND(item.price)}</div>
              </div>
              <p>Số Lượng</p>
              <div class="card__quantityInput" >
              <button class="cart__btn__down"><img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg" alt="remove-icon"></button>
              <input type="text" class="cart__input__quantity" value="1">
              <button class="cart__btn__up"><img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg" alt="add-icon"></button>
              
              </div>
              <button class="btn-add-to-cart" onclick="getIdCart(${
                item.id
              })">Thêm vào giỏ hàng</button>
          </div>

          </div>
          </div>
          <div class="modal-overlay"></div>
        `;
      modal_container.innerHTML = htmls;

      const overlay = document.querySelector(".modal-overlay");
      const modal = document.querySelector("#modal");
      const body = document.querySelector("html");
      getSrcImg(item);
      overlay.classList.add("show");
      modal.classList.add("show");
      // body.classList.add("show");
      modal.style.top = 15 + window.pageYOffset + "px";
      window.addEventListener("scroll", () => {
        setTopModal();
      });
      function setTopModal() {
        modal.style.top = 20 + window.pageYOffset + "px";
      }

      var btn_close = document.querySelector(".btn-close");
      btn_close.addEventListener("click", () => {
        overlay.classList.remove("show");
        modal.classList.remove("show");
        // body.classList.remove("show");
      });

      overlay.addEventListener("click", () => {
        overlay.classList.remove("show");
        modal.classList.remove("show");
        // body.classList.remove("show");
      });
      // btn down up quantity
      const btnDown = document.querySelector(".cart__btn__down");
      const inputQuantity = document.querySelector(".cart__input__quantity");
      const btnUp = document.querySelector(".cart__btn__up");
      console.log(btnDown, inputQuantity, btnUp);
      btnDown.addEventListener("click", () => {
        if (inputQuantity.value <= 1) {
          inputQuantity.value = 1;
        } else {
          inputQuantity.value--;
        }
      });
      btnUp.addEventListener("click", () => {
        inputQuantity.value++;
      });
    }
  });

  function getSrcImg(item) {
    // let imgCount = 0;
    const imgList = document.querySelector(".modal__img-list");
    let htmls = "";
    item.srcImg.forEach((img, index) => {
      // imgCount++;
      return (htmls += `
      <img class="card__img" src="${item.srcImg[index]}" onclick="changeImg('${item.srcImg[index]}')"/>  
      `);
    });
    imgList.innerHTML = htmls;
    // const imgThumpnalList = document.querySelector(
    //   ".modal__img-list .card__img"
    // );
    // let widthCardList = (1 / imgCount) * 100;
    // console.log(imgThumpnalList);
    // console.log(widthCardList);
    // imgThumpnalList.style.width = widthCardList + "%";
  }
}
function Banner(status) {
  const banner = document.querySelector(".banner");
  if (status === "disable") return banner.classList.add("disable");
  else {
    return banner.classList.remove("disable");
  }
}
function products_list(status) {
  const productList = document.querySelector(".product__container");
  if (status === "disable") return productList.classList.add("disable");
  else {
    return productList.classList.remove("disable");
  }
}
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let result = parts.join(",");
  return result;
}
function numbertoVND(x) {
  return numberWithCommas(x) + " đ";
}

/* ============search range */

const searchData = [];
const inputSearch = document.querySelector(".header__search__input");
inputSearch.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    btnSearchSubmit.click();
  }
});
const btnSearchSubmit = document.querySelector(".header__search__btn");
const container_header = document.querySelector(".container-header");

inputSearch.addEventListener("input", (e) => {
  const inputSearchValue = inputSearch.value;
  console.log(inputSearchValue);
  let searchItems = books.filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(inputSearchValue.toLocaleLowerCase());
  });
  console.log(searchItems);
  Banner("disable");
  products_list("disable");

  if (searchItems.length === 0) {
    container_content.innerHTML = `
      <div class="search__no-result-found">
          <p>Xin lỗi 😔 không có kểt quả với:<h3>${inputSearchValue}</h3></p>
          <img class="search__no-result-found__img" src="./images/no_result_found.png" alt="">
      </div>
    `;
    pagination_element.style.display = "none";
    container_header.innerHTML = "";
  } else {
    toolbarForm.style.display = "block";
    const btnSearch = document.querySelector(".toolbar__search-icon");

    btnSearch.style.display = "none";
    container_header.innerHTML = `Có ${searchItems.length} kết quả tìm kiếm với: <b>${inputSearchValue}</b>`;
    container_content.style.display = "flex";
    pagination_element.style.display = "flex";
    DisplayList(searchItems, rows, current_page);
    SetupPagination(searchItems, pagination_element, rows);

    const btnB = document.querySelector(".controler");
    btnB.addEventListener("click", () => {
      Banner("show");
      products_list("show");
      inputSearch.value = "";
      toolbarForm.style.display = "none";
      container_content.style.display = "none";
      pagination_element.style.display = "none";
      document.querySelector(".container-header").style.display = "none";
    });
  }
});
