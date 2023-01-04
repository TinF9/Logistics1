const batchSelection = document.getElementById("batchSelection");
const flexContainer = document.querySelector(".flex-container");
const fileInput = document.getElementById("fileInput");
const batchIndicator = document.getElementById("batchIndicator");
const excelProducts = [];
let products = "";

fileInput.addEventListener("change", async function () {
  const excelData = await readXlsxFile(fileInput.files[0]);
  let fileName = fileInput.files[0].name;

  for (let i = 1; i < excelData.length; i++) {
    const product = {
      "Product Code": excelData[i][0],
      Quantity: excelData[i][1],
      Placed: excelData[i][2],
      "Not Placed": excelData[i][3],
      "Destination List": excelData[i][4],
    };
    excelProducts.push(product);
  }

  products = [...excelProducts];
  initialCount();
  createOptionsList();
  createTableContent();

  batchIndicator.innerHTML = `<p style="color:#888;">Working with: '${fileName}' batch.</p>`;

  batchSelection.style.display = "none";
  flexContainer.style.display = "flex";
});

const form1 = document.getElementById("form1");
const searcher = document.getElementById("searcher");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const productDetails = document.getElementById("productDetails");

const noProduct = {
  "Product Code": "Unregistered product",
  Quantity: "------",
  Placed: "------",
  "Not Placed": "------",
  "Destination List": "------",
};

const initialProduct = `
   <ul>
      <li><b>Product:</b>  Select a product to see its values.</li>
      <li><b>Quantity:  ------</b></li>
      <li><b>Placed:  ------</b></li>
      <li><b>Not Placed:  ------</b></li>
      <li><b>Destination List:  ------</b></li>
   </ul>`;

productDetails.innerHTML = initialProduct;

const disableButtons = () => {
  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;

  button1.classList.add("disabled");
  button2.classList.add("disabled");
  button3.classList.add("disabled");
  button4.classList.add("disabled");
};

disableButtons();

const enableButtons = () => {
  button1.disabled = false;
  button2.disabled = false;
  button3.disabled = false;
  button4.disabled = false;

  button1.classList.remove("disabled");
  button2.classList.remove("disabled");
  button3.classList.remove("disabled");
  button4.classList.remove("disabled");
};

const disableSubtractButton = (selectedProduct) => {
  if (selectedProduct["Placed"] <= 0) {
    button2.disabled = true;
    button2.classList.add("disabled");
  }
};

const disableInput = () => {
  searcher.disabled = true;
  searcher.classList.add("disabled");
};

const initialCount = () => {
  products.forEach(function (product) {
    if (product["Placed"] === null) {
      product["Placed"] = 0;
      product["Not Placed"] = product["Quantity"];
    }
  });
};

const countToZeroAll = () => {
  products.forEach(function (product) {
    product["Placed"] = 0;
    product["Not Placed"] = product["Quantity"];
  });
};

const checkSelectedP = (searcherValue) => {
  let selectedProduct;
  for (let i = 0; i < products.length; i++) {
    if (products[i]["Product Code"] == searcherValue) {
      selectedProduct = products[i];
      enableButtons();
      break;
    } else {
      selectedProduct = noProduct;
      disableButtons();
    }
  }
  return selectedProduct;
};

const alertCompleted = document.querySelector(".alert--fully-placed");
const alertSurpassed = document.querySelector(".alert--overstock");

const alertCount = (selectedProduct) => {
  if (selectedProduct["Not Placed"] <= 0) {
    alertCompleted.style.display = "inline-block";
  } else {
    alertCompleted.style.display = "none";
  }

  if (selectedProduct["Not Placed"] < 0) {
    alertSurpassed.style.display = "inline-block";
  } else {
    alertSurpassed.style.display = "none";
  }

  disableSubtractButton(selectedProduct);
};

const resetCount = (searcherValue) => {
  let confirmation = confirm(`The counting of all products will be restarted.
Do you want to continue?`);
  if (confirmation) {
    countToZeroAll();
    showProduct(searcher.value);
    for (let i = 0; i < products.length; i++) {
      let iD = "product" + i;
      let selectedRow = document.getElementById(iD);
      selectedRow.innerHTML = `
            <td>${products[i]["Product Code"]}</td>
            <td>${products[i]["Quantity"]}</td>
            <td>${products[i]["Placed"]}</td>
            <td>${products[i]["Not Placed"]}</td>
            <td>${products[i]["Destination List"]}</td>`;
    }
  }
};

const resetProduct = (searcherValue) => {
  let confirmation = confirm(`The counting of this product will be restarted.
Do you want to continue?`);
  if (confirmation) {
    let selectedProduct = checkSelectedP(searcherValue);
    selectedProduct["Placed"] = 0;
    selectedProduct["Not Placed"] = selectedProduct["Quantity"];
    showProduct(searcher.value);
  }
};

const addProduct = (searcherValue) => {
  let selectedProduct = checkSelectedP(searcherValue);
  selectedProduct["Placed"] += 1;
  selectedProduct["Not Placed"] -= 1;
  showProduct(searcher.value);
};

const subtractProduct = (searcherValue) => {
  let selectedProduct = checkSelectedP(searcherValue);
  selectedProduct["Placed"] -= 1;
  selectedProduct["Not Placed"] += 1;
  showProduct(searcher.value);
};

const checkSelectedPi = (searcherValue) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]["Product Code"] == searcherValue) {
      return i;
    }
  }
};

const replaceRow = (searcherValue) => {
  let i = checkSelectedPi(searcherValue);
  let iD = "product" + i;
  if (i != undefined) {
    let selectedRow = document.getElementById(iD);
    if (products[i]["Not Placed"] == 0) {
      selectedRow.innerHTML = `
            <td>${products[i]["Product Code"]}</td>
            <td>${products[i]["Quantity"]}</td>
            <td>${products[i]["Placed"]}</td>
            <td style="color:#ffff00; background:#ff0000; font-weight:bolder; font-family:sans-serif">${products[i]["Not Placed"]}</td>
            <td>${products[i]["Destination List"]}</td>`;
    } else if (products[i]["Not Placed"] < 0) {
      selectedRow.innerHTML = `
            <td>${products[i]["Product Code"]}</td>
            <td>${products[i]["Quantity"]}</td>
            <td>${products[i]["Placed"]}</td>
            <td style="color:#f3f3f3; background:#0000ff; font-weight:bolder; font-family:sans-serif">${products[i]["Not Placed"]}</td>
            <td>${products[i]["Destination List"]}</td>`;
    } else {
      selectedRow.innerHTML = `
            <td>${products[i]["Product Code"]}</td>
            <td>${products[i]["Quantity"]}</td>
            <td>${products[i]["Placed"]}</td>
            <td>${products[i]["Not Placed"]}</td>
            <td>${products[i]["Destination List"]}</td>`;
    }
  }
};

const showProduct = (searcherValue) => {
  let selectedProduct = checkSelectedP(searcherValue);
  productDetails.innerHTML = `
   <ul>
      <li><b>Product:</b>   <b style="color:red">
      ${selectedProduct["Product Code"]}</b></li>
      <li><b>Quantity:</b>   ${selectedProduct["Quantity"]}</li>
      <li><b>Placed:</b>   ${selectedProduct["Placed"]}</li>
      <li><b>Not Placed:</b>   ${selectedProduct["Not Placed"]}</li>
      <li><b>Destination List:</b>  <b style="color:blue;
      font-family:sans-serif">${selectedProduct["Destination List"]}</b></li>
   </ul>`;
  alertCount(selectedProduct);
  replaceRow(searcherValue);
};

const newSearch = () => {
  if (searcher.value) {
    searcher.value = "";
  }
};

const createOptionsList = () => {
  const dataList = document.getElementById("optionsList");
  const dataListFragment = document.createDocumentFragment();

  for (let i = 0; i < products.length; i++) {
    const item = document.createElement("OPTION");
    item.setAttribute("value", `${products[i]["Product Code"]}`);
    dataListFragment.appendChild(item);
  }

  dataList.appendChild(dataListFragment);
};

const createTableContent = () => {
  const table = document.getElementById("table");
  const tableFragment = document.createDocumentFragment();

  for (let i = 0; i < products.length; i++) {
    const rowItem = document.createElement("TR");
    let iD = "product" + i;
    rowItem.setAttribute("id", iD);

    if (products[i]["Not Placed"] == 0) {
      rowItem.innerHTML = `
            <td>${products[i]["Product Code"]}</td>
            <td>${products[i]["Quantity"]}</td>
            <td>${products[i]["Placed"]}</td>
            <td style="color:#ffff00; background:#ff0000; font-weight:bolder; font-family:sans-serif">${products[i]["Not Placed"]}</td>
            <td>${products[i]["Destination List"]}</td>`;
    } else if (products[i]["Not Placed"] < 0) {
      rowItem.innerHTML = `
            <td>${products[i]["Product Code"]}</td>
            <td>${products[i]["Quantity"]}</td>
            <td>${products[i]["Placed"]}</td>
            <td style="color:#f3f3f3; background:#0000ff; font-weight:bolder; font-family:sans-serif">${products[i]["Not Placed"]}</td>
            <td>${products[i]["Destination List"]}</td>`;
    } else {
      rowItem.innerHTML = `
            <td>${products[i]["Product Code"]}</td>
            <td>${products[i]["Quantity"]}</td>
            <td>${products[i]["Placed"]}</td>
            <td>${products[i]["Not Placed"]}</td>
            <td>${products[i]["Destination List"]}</td>`;
    }

    tableFragment.appendChild(rowItem);
  }

  table.appendChild(tableFragment);
};

form1.addEventListener("input", function () {
  showProduct(searcher.value);
});
searcher.addEventListener("click", newSearch);
button1.addEventListener("click", function () {
  addProduct(searcher.value);
});
button2.addEventListener("click", function () {
  subtractProduct(searcher.value);
});
button3.addEventListener("click", function () {
  resetCount(searcher.value);
});
button4.addEventListener("click", function () {
  resetProduct(searcher.value);
});
button5.addEventListener("click", function () {
  window.print();
});
