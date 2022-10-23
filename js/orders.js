const containerTable = document.querySelector(".order__container");
const table = containerTable.querySelector("table");
const mess = containerTable.querySelector("h3");
const btnClose = document.querySelector(".order__container-btn-close");
const orderOverlay = document.querySelector(".order__overlay");
const order = document.querySelector(".header__login-order");
const tableBody = document.querySelector(".order tbody");
console.log(table);
// table.style.display = "none";
order.addEventListener("click", () => {
  orderOverlay.classList.toggle("show");
  containerTable.classList.toggle("show");
  let orders = JSON.parse(localStorage.getItem("orders"));
  let infoAcc = JSON.parse(localStorage.getItem("userLoginCurrent"));
  let findOrders = orders.filter((item) => {
    return item.user_name == infoAcc.user_name;
  });
  orders = findOrders;
  renderTableOrders(orders);
});
btnClose.addEventListener("click", () => {
  order.click();
});
orderOverlay.addEventListener("click", () => {
  order.click();
});
let id = 1;
function renderTableOrders(userCart) {
  let infoAcc = JSON.parse(localStorage.getItem("userLoginCurrent"));
  let result = userCart.filter((item) => {
    return item.user_name == infoAcc.user_name;
  });
  console.log(result);
  userCart = result;
  if (userCart.length > 0) {
    table.classList.add("show");
    mess.classList.add("disable");
    let htmls = "";
    userCart.forEach((item) => {
      let conFirm;
      if (item.isConfirm == "false") {
        conFirm = "Đang chờ xác nhận";
      } else {
        conFirm = "Đã xác nhận";
      }
      htmls += `
      <tr>
        <th scope="row">${id++}</th>
        <td>${item.order_id}</td>
        <td class="text-left">${item.details}</td>
        <td>${item.order_date}</td>
        <td class="text-left">GiaoHangNhanh</td>
        <td>${numbertoVND(item.total_price)}</td>
        <td >${conFirm}</td>
      </tr>
        `;
    });
    tableBody.innerHTML = htmls;
  }
}
