//to disaplay bloke header on top in 700px and scroll up button-------------------------

function holdOnScreen() {
  let header = document.getElementById("mainHeader");
  let scrollup = document.querySelector(".scroll-up-btn");
  let scrollDown = document.body.offsetTop;
  window.onscroll = function () {
    if (window.pageYOffset > scrollDown + 200) {
      scrollup.classList.add("show");
      scrollup.addEventListener("click", () => {
        scrollup.classList.add("move");
      });
    } else {
      scrollup.classList.remove("show");
      scrollup.classList.remove("move");
    }
    if (window.pageYOffset > scrollDown + 600) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
}
holdOnScreen();
// Function to handle dropdown behavior based on screen width-------------------
function showDropdown() {
  const dropdownButton = document.querySelector(".dropdown-here");
  const dropdownContent = document.querySelector(".product-dropdown");
  function handleResize() {
    if (window.innerWidth < 768) {
      showDropdownClick();
    } else {
      showDropdownHover();
    }
  }
  handleResize();
  window.addEventListener("resize", handleResize);

  // Event handler functions
  function handleMouseEnter() {
    dropdownContent.style.display = "block";
  }

  function handleMouseLeave() {
    dropdownContent.style.display = "none";
  }

  function handleClick() {
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  }

  // Function for hover-based dropdown
  function showDropdownHover() {
    dropdownButton.removeEventListener("click", handleClick); //remove previous event
    dropdownButton.addEventListener("mouseenter", handleMouseEnter);
    dropdownContent.addEventListener("mouseenter", handleMouseEnter);
    dropdownButton.addEventListener("mouseleave", handleMouseLeave);
    dropdownContent.addEventListener("mouseleave", handleMouseLeave);
  }
  // Function for click-based dropdown
  function showDropdownClick() {
    dropdownButton.removeEventListener("mouseenter", handleMouseEnter); //remove previous event
    dropdownContent.addEventListener("mouseenter", handleMouseEnter);
    dropdownButton.removeEventListener("mouseleave", handleMouseLeave);
    dropdownContent.removeEventListener("mouseleave", handleMouseLeave);

    dropdownButton.addEventListener("click", handleClick);
  }
}
showDropdown();

// create and display  all categories-------------------------------
function dropdownProducts() {
  // Function to handle dropdown behavior based on screen width

  // creating categoris and inner products daynamically
  let categoriesProducts = document.querySelector(".categories-products");
  categoriesProducts.innerHTML = ``;
  function dropdownProductsDaynamic(cateName) {
    let products = "";
    items.forEach((item) => {
      if (item.category === `${cateName}`) {
        products += `
      <div class="viwe-categories-item" >
      <a href="cartpage.html" onclick="showProductId('${item.id}')">
      <img src="${item.image}" alt="product image">
      <h6 class="mt-2">${item.name}</h6>
      </a>
      </div>
      `;
      } else {
        return;
      }
    });
    return products;
  }
  let categories = [
    "watch",
    "earbuds",
    "headphone",
    "toothbrush",
    "speaker",
    "btearphone",
    "charger",
  ];
  let secCategoriesProducts = document.querySelectorAll(
    ".second-categories-products"
  );

  for (let i = 0; i < categories.length; i++) {
    let getproduct = dropdownProductsDaynamic(categories[i]);
    let categoriesProductsInner1 = `
  <div class="cart-viwe-folder" id="cate${i + 1}">
        <div class="row">
            <div class="col cart-viwe">
                ${getproduct}
            </div>
        </div>
        <div class="row">
            <div class="col text-center ">
                <a href="viewall.html" class="open-categories-item" onclick="showProductCategory('${
                  categories[i]
                }')"><u>VIWE ALL</u></a>
            </div>
        </div>
  </div>
 `;
    let categoriesProductsInner2 = `
  <div class="cart-viwe-folder" id="cate${i + 8}">
        <div class="row">
            <div class="col cart-viwe">
                ${getproduct}
            </div>
        </div>
        <div class="row">
            <div class="col text-center ">
                <a href="viewall.html" class="open-categories-item" onclick="showProductCategory('${
                  categories[i]
                }')"><u>VIWE ALL</u></a>
            </div>
        </div>
  </div>
 `;
    categoriesProducts.innerHTML += categoriesProductsInner1;
    secCategoriesProducts[i].innerHTML = categoriesProductsInner2;
  }
  function showProductCategory(cate) {
    localStorage.setItem("category", cate);
  }

  // show categoris feed when hover==========================
  let categoriesName = document.querySelectorAll(".categories");
  let categoriesName2 = document.querySelectorAll(".second-categories");
  let cateViwe = document.querySelectorAll(".cart-viwe-folder");
  categoriesName.forEach((categorie) => {
    categorie.addEventListener("mouseenter", () => {
      let cateId = categorie.getAttribute("data-categorie");
      let cateElement = document.getElementById(cateId);
      cateViwe.forEach((item) => {
        item.style.display = "none";
      });
      cateElement.style.display = "flex";
    });
  });

  // show categoris manu items feed when click in 768px ==========================
  categoriesName2.forEach((categorie) => {
    categorie.addEventListener("click", () => {
      let cateId = categorie.getAttribute("data-categorie");
      let cateElement = document.getElementById(cateId);
      if (
        cateElement.style.display === "none" ||
        cateElement.style.display === ""
      ) {
        cateElement.style.display = "flex";
        categorie.style.transform = "rotatex(180deg)";
        setTimeout(() => {
          cateElement.classList.add("show");
        }, 10);
      } else {
        categorie.style.transform = "rotatex(0deg)";
        cateElement.classList.remove("show");
        setTimeout(() => {
          cateElement.style.display = "none";
        }, 300);
      }
    });
  });

  //  open and close categoris menu only under 768px

  function menuOpenAndClose() {
    let openmenu = document.querySelector(".menu-bar-icon");
    let secNavbarNav = document.querySelector(".second-navbar-nav");
    let cartPart = document.querySelector(".navbar-cart-part");
    let navbarCartBorder = document.querySelector(".navbar-cart-border");
    let blankPart = document.querySelector(".navbar-blank-part");
    let navbarClosecart = document.querySelectorAll(
      ".navbar-blank-part,.navbar-cart-close"
    );

    openmenu.addEventListener("click", openMenu);
    // for open menu
    function openMenu() {
      secNavbarNav.style.display = "flex";
      setTimeout(() => {
        navbarCartBorder.classList.add("show");
        cartPart.classList.add("show");
        blankPart.classList.add("show");
        // secNavbarNav.style.position = "fixed";
        document.body.style.overflow = "hidden";
      }, 10);
    }

    navbarClosecart.forEach((btn) => {
      btn.addEventListener("click", navbarCloseCart);
    });

    // to close open menu
    function navbarCloseCart() {
      navbarCartBorder.classList.remove("show");
      cartPart.classList.remove("show");
      blankPart.classList.remove("show");
      document.body.style.overflow = "auto";
      setTimeout(() => {
        // secNavbarNav.style.position = "unset";
        secNavbarNav.style.display = "none";
      }, 200);
    }
    // // // to hide navbar automatically when width increse in open condition of navbar =============================
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navbarCloseCart();
      }
    });
  }
  menuOpenAndClose();
}
dropdownProducts();

// search option---------------------------------------------
function searchPart() {
  // open and close-----------
  let search = document.querySelector(".search");
  let searchBar = document.querySelector(".search-bar");
  let searchCloseBtn = document.querySelector(".search-close-btn");
  let searchInput = document.querySelector(".search-input");
  let optionsList = document.querySelector(".search-bar ul");

  search.addEventListener("click", () => {
    searchBar.style.display = "block";
  });
  searchCloseBtn.addEventListener("click", () => {
    searchBar.style.display = "none";
    searchInput.value = "";
    optionsList.innerHTML = "";
  });

  // input and output-----

  searchInput.addEventListener("input", () => {
    optionsList.innerHTML = "";
    let found = false;
    items.forEach((item) => {
      if (
        item.name.includes(searchInput.value.toUpperCase()) ||
        item.category.includes(searchInput.value)
      ) {
        let options = document.createElement("li");
        options.innerHTML = `
         <a href="cartpage.html" onclick="showProductId('${item.id}')">
         <div>
           <img src="${item.image}" alt="${item.name}"> 
         </div>
         <div>
            ${item.name} <br> ${item.extrainfo} 
          </div>
          </a>
        `;
        optionsList.append(options);
        found = true;
      }
    });
    if (!found) {
      optionsList.innerHTML = "Not found";
    }
  });
}
searchPart();
