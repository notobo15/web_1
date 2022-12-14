var btn_subSP = document.querySelector(".btn_sanpham");
var show_sanpham = document.querySelector("nav ul .show_sanpham");
const btn_sanpham = document.querySelector(".btn_SP");
const btn_donhang = document.querySelector(".btn_Orders");
const btn_taikhoan = document.querySelector(".btn_User");
const btn_addSP = document.querySelector(".btn_addSP");
const pagenumber_SP = document.querySelector(".pagenumber");

//let userLoginCurrent = JSON.parse(localStorage.getItem("userLoginCurrent"));
const btn_doanhthu = document.querySelector(".btn_doanhthu");
const image_input = document.querySelector(".btn_addImage_SP");
var uploaded_image = "";
image_input.addEventListener("change", function () {
  const render = new FileReader();
  render.addEventListener("load", () => {
    uploaded_image = render.result;
    document.querySelector(
      ".view_image"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  render.readAsDataURL(this.files[0]);
});
btn_subSP.addEventListener("click", show);
// prevent FORM form reset
const prevent = (pre_ev) => {
  pre_ev.preventDefault();
};
function show() {
  show_sanpham.classList.toggle("show");
}

btn_addSP.addEventListener("click", () => {
  headerShow("form_add_sanpham");
});
btn_donhang.addEventListener("click", () => {
  headerShow("Content_Orders");
  showOrder(JSON.parse(localStorage.getItem("orders")), OrderTbody);
});
btn_sanpham.addEventListener("click", () => {
  headerShow("Content_SP");
});
btn_taikhoan.addEventListener("click", () => {
  headerShow("Content_User");
});
btn_doanhthu.addEventListener("click", () => {
  headerShow("Content_DoanhThu");
});
userLoginCurrent = JSON.parse(localStorage.getItem("userLoginCurrent"));
if (userLoginCurrent != null) {
  if (userLoginCurrent.account_type > 1){
    alert("Chào mừng bạn đến trang admin !!!");
  }else {
    alert("Bạn không có quyền truy cập !!!");
    window.location.assign("../index.html");
  }
} else {
  alert("Bạn không có quyền truy cập !!!");
  window.location.assign("../index.html");
}

function headerShow(name) {
  const listTable = document.querySelectorAll(".header_content");
  listTable.forEach((item) => {
    item.classList.remove("show");
    if (item.classList.contains(name)) {
      item.classList.add("show");
    }
  });
}

// ĐỔ DỮ LIỆU TỪ DATA.JS
const SPTbody = document.querySelector(".Content_SP table tbody");
const UserTbody = document.querySelector(".Content_User table tbody");
const OrderTbody = document.querySelector(".Content_Orders table tbody");
// Tạo biến Page
let currentPage = 1;
let perPage = 5;
let totalPage = 0;
let perBooks = [];
let countPageNumber = 1;
let StartPageNumber = 1;
let EndPageNumber = 0;
//Tạo số trang
function renderPageNumber(arr) {
  let htmls = "";
  books = arr;
  htmls += `
  <li class="pagenumber_item" onclick="backRenderPageNumber()">
      <a href="#" class="pagenumber_item_link fa fa-angle-left"></a>
  </li>
  `;
  if (arr.length % perPage == 0) {
    totalPage = arr.length / perPage;
  } else {
    totalPage = arr.length / perPage + 1;
  }
  //Start - Chặn không cho vượt quá totalPage
  if (totalPage >= 5 && StartPageNumber + 4 < totalPage) {
    countPageNumber = StartPageNumber;
    for (let i = countPageNumber; i <= countPageNumber + 4; i++) {
      htmls += `
    <li class="pagenumber_item" onclick="handlePageNumber(${i})">
      <a href="#" class="pagenumber_item_link">${i}</a>
    </li>
    `;
      EndPageNumber = i; //Lát thay thế cho StartPageNumber
    }
  } else {
    countPageNumber = StartPageNumber;
    for (let i = countPageNumber; i <= totalPage; i++) {
      htmls += `
    <li class="pagenumber_item" onclick="handlePageNumber(${i})">
      <a href="#" class="pagenumber_item_link">${i}</a>
    </li>
    `;
    }
  }
  //End -
  htmls += `
    <li class="pagenumber_item" onclick="nextRenderPageNumber()">
      <a href="#" class="pagenumber_item_link fa fa-angle-right" id="angle_right"></a>
    </li>
  `;
  pagenumber_SP.innerHTML = htmls;
}
//Set angle button
function nextRenderPageNumber(arr) {
  StartPageNumber = EndPageNumber;
  renderPageNumber(books);
}
function backRenderPageNumber(arr) {
  if (StartPageNumber >= 5) {
    StartPageNumber -= 4;
  } else {
    StartPageNumber = 1;
  }
  renderPageNumber(books);
}
//Đổ dữ liệu từng trang
function handlePageNumber(num) {
  currentPage = num; //2
  perBooks = books.slice(
    //start,end
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );
  showSP(books, SPTbody);
}
function showSP(arr, tBody) {
  let books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  if (localStorage.getItem("books") == null) {
    arr.forEach((item) => {
      books.push(item);
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
  const tempbooks = [];
  arr.forEach((item) => {
    tempbooks.push(item);
  });
  perBooks = tempbooks.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );
  let htmls = "";

  //arr.forEach((item, indx) => {
  // <td>${++indx}</td>

  perBooks.forEach((item, indx) => {
    htmls += `
    <tr>
      <td>
        ${item.id}
      </td>
      <td>${item.title}</td>
      <td ><img src=".${item.srcImg[0]}" height="95" width="95" alt=""></td>
      <td class="text">${item.description}</td>
      <td>${numbertoVND(item.currentPrice)}</td>
      <td>
          <ul class="content_btn">
            <li class="btn_Sua" onclick = "return xemThongTinSPtheoID(${
              item.id
            })"><img src="./img/btn_Sua.png" alt=""></li>
            <li class="btn_Xoa" onclick="return xoaSPtheoID(${
              item.id
            })"><img src="./img/btn_xoa.png" alt=""></li>

          </ul>
      </td>
      </tr>
    `;
  });
  tBody.innerHTML = htmls;
  renderPageNumber(tempbooks);
}
console.log(books);
showSP(JSON.parse(localStorage.getItem("books")), SPTbody);

// đổ dữ liệu User
function showUser(arr, tBody) {
  let usersAccount = localStorage.getItem("usersAccount")
    ? JSON.parse(localStorage.getItem("usersAccount"))
    : [];
  if (localStorage.getItem("usersAccount") == null) {
    arr.forEach((item) => {
      usersAccount.push(item);
    });
    localStorage.setItem("usersAccount", JSON.stringify(usersAccount));
  }
  const tempusers = [];
  usersAccount.forEach((item) => {
    tempusers.push(item);
  });
  let htmls = "";
  tempusers.forEach((item, indx) => {
    htmls += `
    <tr>
      <td>${++indx}</td>
      <td>${item.id}</td>
      <td>${item.user_name}</td>
      <td>${item.pw}</td>
      <td>${item.last_name} ${item.first_name}</td>
      <td>${item.email}</td>
      <td>${item.phone}</td>
      <td>${item.address_full}</td>
      <td>${item.birth_date}</td>

      <td><input type="checkbox" name="confirm_user" ${
        item.isActive == true ? "checked" : ""
      } onclick="return checkedUser(${item.id})"></td>

    </tr>
    `;
  });
  tBody.innerHTML = htmls;
}
showUser(JSON.parse(localStorage.getItem("usersAccount")), UserTbody);
function checkedUser(id) {
  let usersAccount = localStorage.getItem("usersAccount")
    ? JSON.parse(localStorage.getItem("usersAccount"))
    : [];
  usersAccount.forEach((item) => {
    if (item.id == id) {
      if (item.isActive == true) {
        item.isActive = false;
      } else {
        item.isActive = true;
      }
    }
  });
  localStorage.setItem("usersAccount", JSON.stringify(usersAccount));
}
// showUser(JSON.parse(localStorage.getItem("usersAccount")), UserTbody);
//Đổ dữ liệu Đơn Hàng

//function showOrder(_arr, tBody) {
//if (_arr.length == 0) {
//  alert("Danh sách rỗng ..");
//}
//let htmls = "";
//console.log(_arr);
//_arr.forEach((item, indx) => {

function showOrder(arr, tBody) {
  let orders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];
  if (localStorage.getItem("orders") == null) {
    arr.forEach((item) => {
      orders.push(item);
    });
    localStorage.setItem("orders", JSON.stringify(orders));
  }
  const temporders = [];
  arr.forEach((item) => {
    temporders.push(item);
  });
  let htmls = "";
  temporders.forEach((item, indx) => {
    htmls += `
    <tr>
    <td>${++indx}</td>
    <td>${item.order_id}</td>
    
    <td>${item.full_name}</td>
    <td>${item.phone}</td>
    <td>${item.address_delivery}</td>
    <td>${item.order_date}</td>
    <td>${numbertoVND(item.total_price)}</td>
    <td ><input value="${
      item.isConfirm
    }" class="btnConfirm" type="checkbox" name="confirm" ${
      item.isConfirm == true ? "checked" : ""
    } onclick="return checkedOrder(${item.order_id})" ${
      item.isConfirm == true ? "disabled" : ""
    }></td>
    <td class = "btn__Order_Detail" onclick = "return showDetailOfOrder(${
      item.order_id
    })"><img src="./img/Data-View-Details-icon.png" alt=""></td>
    </tr>
  `;
  });
  tBody.innerHTML = htmls;
}

//thêm sản phẩm
const btn_XacNhan_Add_SP = document.getElementById("btn_XacNhan_Add_SP");
const input_MaSP = document.getElementById("input_MaSP");
const input_LoaiSP = document.getElementById("input_LoaiSP");
const input_TenSP = document.getElementById("input_TenSP");
const input_TenTG = document.getElementById("input_TenTG");
const input_GiaSP_bandau = document.getElementById("input_GiaSP_bandau");
const input_GiaSP_banra = document.getElementById("input_GiaSP_banra");
const txtArea_ChiTiet = document.getElementById("txtArea_ChiTiet");
const btn__addImage_SP = document.querySelector(".btn__addImage_SP");
const div_add_Img_input = document.querySelector(".add_Img_input");
const input_LinkImg = document.querySelector("#linkImg");

function addSP() {
  let books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  let id = 0;
  id = books[books.length - 1].id;
  // tam = tam.replace(/^\D+/g, "");
  books.push({
    id: ++id,
    title: input_TenSP.value,
    category: input_LoaiSP.value,
    author: input_TenTG.value,
    srcImg: ["./Images/test_image.png"],
    title: input_TenSP.value,
    price: input_GiaSP_bandau.value,
    currentPrice: input_GiaSP_banra.value,
    description: txtArea_ChiTiet.value,
  });
  localStorage.setItem("books", JSON.stringify(books));
  showSP(JSON.parse(localStorage.getItem("books")), SPTbody);
}

/*
function renderSanPham() {
  const tempbooks = [];
  let books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  // Đổ hai mảng vào mảng tạm
  books.forEach((item) => {
    tempbooks.push(item);
  });
  books = tempbooks;
  console.log(books);
  showSP(books, SPTbody);
}
*/
// function renderSanPham() {
//   const tempbooks = [];
//   let books = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [];
//   books.forEach((item) => {
//     tempbooks.push(item);
//   })
//   books = tempbooks;
//   console.log(books);
//   showSP(books, SPTbody);
// }

btn_XacNhan_Add_SP.onclick = function (e) {
  e.preventDefault();
  // console.log(books);
  addSP();
  showSP(books, SPTbody);
  document.forms[0].reset(); // setText = "" for all input in form "form_add_sanpham".
};
// Xóa sản phẩm.
const btn_XoaSP = document.querySelector(".btn_Xoa");

function xoaSPtheoID(id) {
  const tempDelete = []; // mảng tạm chuẩn bị xóa
  const tempDeleted = []; // mảng tạm đã xóa
  console.log(id);

  let books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  books.forEach((item) => {
    tempDelete.push(item);
  });
  // nếu đồng ý xóa thì thực hiện
  let isConfirm = confirm("Đồng ý xóa sản phẩm " + id + " không ?");
  if (isConfirm == true) {
    tempDelete.forEach((item) => {
      if (item.id != id) {
        tempDeleted.push(item);
      }

      /*
    });
    books = tempDeleted;
    showSP(books, SPTbody);
    //đổ dữ liệu đã xóa lên ls
    localStorage.setItem("books", JSON.stringify(tempDeleted));
   */
    });
    //đổ dữ liệu đã xóa lên ls
    localStorage.setItem("books", JSON.stringify(tempDeleted));
    //Lấy data từ ls về
    showSP(JSON.parse(localStorage.getItem("books")), SPTbody);
  }
}

//Chỉnh sửa sản phẩm
const overplay_ChinhSuaSP = document.querySelector(".overplay_ChinhSuaSP");
const form__ChinhSuaSP = document.querySelector(".form__ChinhSuaSP");
const overplay__behind_ChinhSuaSP = document.querySelector(
  ".overplay__behind_ChinhSuaSP"
);
const btn_confirm_ChinhSua = document.querySelector(".btn_confirm_ChinhSua");
// const tenSP_ChinhSua = document.querySelector("#tenSP_ChinhSua");
// const tacgiaSP_ChinhSua = document.querySelector("#tacgiaSP_ChinhSua");
// const giabandauSP_ChinhSua = document.querySelector("#giabandauSP_ChinhSua");
// const giabanraSP_ChinhSua = document.querySelector("#giabanraSP_ChinhSua");
// const txtArea_ChiTiet_ChinhSua = document.querySelector("txtArea_ChiTiet_ChinhSua");
overplay__behind_ChinhSuaSP.onclick = function () {
  overplay_ChinhSuaSP.style.display = "none";
};
let srcImg;
function xemThongTinSPtheoID(id) {
  overplay_ChinhSuaSP.style.display = "block";
  let books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  books.forEach((item) => {
    if (item.id == id) {
      let id = item.id;
      let category = item.category;
      let title = item.title;
      srcImg = item.srcImg;
      let author = item.author;
      let price = item.price;
      let currentPrice = item.currentPrice;
      let description = item.description.toString();
      document.getElementById("maSP_ChinhSua").value = id;
      document.getElementById("tenSP_ChinhSua").value = title;
      document.getElementById("tacgiaSP_ChinhSua").value = author;
      document.getElementById("giabandauSP_ChinhSua").value = price;
      document.getElementById("giabanraSP_ChinhSua").value = currentPrice;
      document.getElementById("txtArea_ChiTiet_ChinhSua").value = description;
      document.getElementById("book_type_seleted").value = category;
    }
  });
}
function thaydoiThongTinSP() {
  let books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  const index = books.findIndex(
    (item) => item.id == document.getElementById("maSP_ChinhSua").value
  );
  console.log(index);
  books[index] = {
    id: +document.getElementById("maSP_ChinhSua").value,
    category: document.getElementById("book_type_seleted").value,
    title: document.getElementById("tenSP_ChinhSua").value,
    srcImg: srcImg,
    author: document.getElementById("tacgiaSP_ChinhSua").value,
    price: document.getElementById("giabandauSP_ChinhSua").value,
    currentPrice: document.getElementById("giabanraSP_ChinhSua").value,
    description: document.getElementById("txtArea_ChiTiet_ChinhSua").value,
  };
  overplay_ChinhSuaSP.style.display = "none";
  localStorage.setItem("books", JSON.stringify(books));
}
function checkedOrder(id) {
  console.log(this)
  let orders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];
  orders.forEach((item) => {
    if (item.order_id == id) {
      if (item.isConfirm == true) {
        item.isConfirm = false;
      } else {
        item.isConfirm = true;
      }
    }
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  showOrder(orders,OrderTbody);
}
/*
const listConfirm = document.querySelectorAll(".btnConfirm");
console.log(listConfirm);
listConfirm.forEach((item, index) => {
  if (item.getAttribute("value") == "true") {
    item.setAttribute("checked", "");
  } else {
    item.removeAttribute("checked", "");
  }
  let or = JSON.parse(localStorage.getItem("orders"));
  item.addEventListener("click", () => {
    if (or[index].isConfirm == "false") {
      or[index].isConfirm = "true";
      item.setAttribute("value", "true");
    } else {
      or[index].isConfirm = "false";
      item.setAttribute("value", "false");
    }
    localStorage.setItem("orders", JSON.stringify(or));
  });
});
// inputsFormEdit.forEach((item) => {
//   item.addEventListener("");
// });
// const
const btnEdit = document.querySelectorAll(".btn_Sua");
const formEdit = document.querySelector(".form__edit");
const formEditOverlay = document.querySelector(".form__overlay");
const formEditBtnCLose = document.querySelector(".form__edit__btnClose");
const formEditBtnSubmit = document.querySelector(".form__edit__btn");
const content = document.querySelector(".Content");
formEditBtnCLose.addEventListener("click", () => {
  formEditOverlay.click();
});
console.log(btnEdit);
btnEdit.forEach((item) => {
  item.addEventListener("click", () => {
    formEdit.classList.add("show");
    if (formEdit.classList.contains("show")) {
      formEdit.classList.remove("show");
    }
  });
});

formEditOverlay.addEventListener("click", () => {
  formEditOverlay.classList.remove("show");
  formEdit.classList.remove("show");
});
const contentDiv = document.querySelector(".Content");
// formEditOverlay.addEventListener("scroll", () => {
//   formEdit.style.top = 15 + contentDiv.scrollTop + "px";
// });
function handleEdit(id) {
  formEdit.classList.add("show");
  formEditOverlay.classList.add("show");
  console.log(window.pageYOffset);
  formEdit.style.top = 15 + contentDiv.scrollTop + "px";

  const inputsFormEdit = formEdit.querySelectorAll("input");
  const title = document.querySelector("textarea[id='name']");
  const desc = document.querySelector("textarea[id='desc']");
  let books = JSON.parse(localStorage.getItem("books"));
  let result = books.find((item) => {
    return item.id == id;
  });
  title.value = result.title;
  desc.value = result.description;
  inputsFormEdit[0].value = result.author;
  inputsFormEdit[1].value = result.price;
  inputsFormEdit[2].value = result.currentPrice;
  // inputsFormEdit[0].setAttribute("value", "11111");
  // inputsFormEdit[1].setAttribute("value", result.description);
  // inputsFormEdit[2].setAttribute("value", result.description);
  formEditBtnSubmit.addEventListener("click", () => {
    books.forEach((item) => {
      if (id == item.id) {
        item.title = title.value;
        item.desc = desc.value;
        item.author = inputsFormEdit[0].value;
        item.price = inputsFormEdit[1].value;
        item.currentPrice = inputsFormEdit[2].value;
        alert("Cập nhật thành công ");
        formEditOverlay.click();
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
    books = JSON.parse(localStorage.getItem("books"));
    //container__row - card - price;
  });
}

document.querySelector(".header__account__name").innerHTML =
  userLoginCurrent.user_name;
*/

btn_confirm_ChinhSua.onclick = function () {
  const id = document.getElementById("maSP_ChinhSua").value;
  let isConfirm = confirm(
    "Chấp nhận thay đổi chỉnh sửa của mã sản phẩm: " + id + " ?"
  );
  if (isConfirm == true) {
    thaydoiThongTinSP();
    showSP(books, SPTbody);
  }
};
//Lấy địa chỉ Body Table Thống Kê
const table_TK = document.querySelector(".TK_Data");
function showThongKe(nam) {
  let orders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];
  // Tạo 1 nùi biến tạm
  let tempnam = 0;
  let tempthang = 0;
  let tempdonhang = 0;
  let temptongtien = 0;
  let htmls = "";
  //Chạy mảng data đơn hàng
  orders.forEach((item) => {
    //Lấy năm từ đơn hàng
    tempnam = item.order_date.slice(
      item.order_date.lastIndexOf("/") + 1,
      item.order_date.lastIndexOf("/") + 5
    );
    //Lấy tháng từ đơn hàng
    tempthang = item.order_date.slice(
      item.order_date.indexOf("/") + 1,
      item.order_date.indexOf("/") + 3
    );
    //Xét năm đơn hàng với năm được chọn
    if (tempnam == nam) {
      //Lấy địa chỉ của tr td theo tháng.
      const Thang_TK = table_TK.getElementsByTagName("tr")[tempthang - 1];
      const value_donhang = Thang_TK.getElementsByTagName("td")[1];
      const value_tongtien = Thang_TK.getElementsByTagName("td")[2];
      //Lấy data của td và tính toán theo đơn hàng
      tempdonhang = value_donhang.innerText;
      temptongtien = parseInt(value_tongtien.innerText);
      tempdonhang++;
      temptongtien += item.total_price;
      //set lại td
      htmls = `<td>${tempdonhang}</td>`;
      value_donhang.innerHTML = htmls;
      htmls = `<td>${temptongtien}</td>`;
      value_tongtien.innerHTML = htmls;
    }
  });
}
showThongKe(2022);
const cb_thongke = document.querySelector(".cb_thongke");
cb_thongke.onclick = function () {
  htmls = `<tr>
    <td>1</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>2</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>3</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>4</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>5</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>6</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>7</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>8</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>9</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>10</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>11</td>
    <td>0</td>
    <td>0</td>
</tr>
<tr>
    <td>12</td>
    <td>0</td>
    <td>0</td>
</tr>`;
  table_TK.innerHTML = htmls;
  showThongKe(cb_thongke.value);
};

//số chi tiết đơn hàng.
const overplay_OrderDetail = document.querySelector(".overplay_OrderDetail");
const overplay__behind_OrderDetail = document.querySelector(
  ".overplay__behind_OrderDetail"
);
document.querySelector(".btn_X").addEventListener("click", function(){
  overplay_OrderDetail.style.display = "none";
})
overplay__behind_OrderDetail.onclick = function () {
  overplay_OrderDetail.style.display = "none";
};
function showDetailOfOrder(order_id) {
  console.log(order_id);
  overplay_OrderDetail.style.display = "block";
  let orders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

  orders.forEach((item) => {
    console.log(item);
    if (item.order_id == order_id) {
      document.querySelector("#maDonHang").innerHTML = item.order_id;
      document.querySelector("#tenNguoidat").innerHTML = item.full_name;
      document.querySelector("#sdtNguoidat").innerHTML = item.phone;
      document.querySelector("#diaChiGiaohang").innerHTML =
        item.address_delivery;
      document.querySelector("#chitietDonHang").innerHTML = item.details;
      let total_price = "-" + item.total_price + " VND";
      document.querySelector("#tongtien").innerHTML = total_price;
    }
  });
}
const compareDates = (d1, d2) => {
  let orders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];
  d1 = document.getElementById("fromDate").value;
  // console.log(d1);
  d2 = document.getElementById("toDate").value;
  const tempOrders = [];
  let date1 = new Date();
  let date2 = new Date();
  var date = 0,
    month = 0,
    year = 0;
  // date1 = new Date(d1).getDate();
  // // month1 = new Date(d1).getMonth();
  // year1 = new Date(d1).getFullYear();
  // date2 = new Date(d2).getDate();
  // month2 = new Date(d2).getMonth();
  // year2 = new Date(d2).getFullYear();
  let day = new Date();
  if (date1 > date2) {
    window.alert("Ngày tìm kiếm không hợp lệ !!!");
  } else {
    const tempFromday = new Date(d1).getTime();
    const tempToday = new Date(d2).getTime();
    orders.forEach((item) => {
      date = item.order_date.slice(0, 2);
      month = item.order_date.slice(3, 5);
      year = item.order_date.slice(6, 10);
      const tempday = new String(month + "/" + date + "/" + year);
      day = new Date(tempday).getTime();
      if (day >= tempFromday - 2520000000 && day <= tempToday) {
        tempOrders.push(item);
      }
    });
    console.log(tempOrders);
    fill_Orders(tempOrders, OrderTbody);
  }
};

function fill_Orders(arr, tBody) {
  let htmls = "";
  arr.forEach((item, indx) => {
    htmls += `
    <tr>
    <td>${++indx}</td>
    <td>${item.order_id}</td>
    
    <td>${item.full_name}</td>
    <td>${item.phone}</td>
    <td>${item.address_delivery}</td>
    <td>${item.order_date}</td>
    <td>${item.total_price}đ</td>
    <td><input type="checkbox" name="confirm" ${
      item.isConfirm == true ? "checked" : ""
    } onclick="return checkedOrder(${item.order_id})"></td>
    <td class = "btn__Order_Detail" onclick = "return showDetailOfOrder(${
      item.order_id
    })"><img src="./img/Data-View-Details-icon.png" alt=""></td>
    </tr>
  `;
  });
  tBody.innerHTML = htmls;
}
const btn_find_Orders = document.querySelector("#btn_find_Orders");
btn_find_Orders.onclick = function () {
  compareDates();
};
document.querySelector(".btn__backHomePage").addEventListener("click", () => {
  if (confirm("Bạn có chắc chắn muốn thoát admin ?")) {
    // localStorage.removeItem("userLoginCurrent");
    window.location.assign("../index.html");
  }
});
document.querySelector(".btn_LogOut").addEventListener("click", () => {
  if (confirm("Bạn có chắc chắn muốn thoát ?")) {
    localStorage.removeItem("userLoginCurrent");
    window.location.assign("../index.html");
  }
});

const selectLoc = document.querySelector(".select__loc")
selectLoc.onclick = function() {
  let orders =  JSON.parse(localStorage.getItem("orders"));

  let temp = selectLoc.value;
  let temptable = []
  if(temp == "chuaxacnhan"){
    temptable = orders.filter((item) => {
      if(item.isConfirm == "false") {
        return item;
      }
    })
  }else if(temp == "daxacnhan") {
    temptable = orders.filter((item) => {
      if(item.isConfirm == true) {
        return item;
      }
    })
  }else {
    temptable = orders;
  }
  showOrder(temptable, OrderTbody);
  // if(temp == "chuaxacnhan"){
  //   orders.forEach((item)=>{
  //     if (item.isActive == "false"){
  //       temptable.push(item);
  //     }
  //   })
  // }
  // if(temp == "daxacnhan") {
  //   orders.forEach((item)=>{
  //     if (item.isActive == "true"){
  //       temptable.push(item);
  //     }
  //   })
  // }
  // else {
  //   orders.forEach((item)=>{
  //       temptable.push(item);
  //   })
  // }

  // 
}