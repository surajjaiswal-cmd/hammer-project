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
    if (window.pageYOffset > scrollDown + 800) {
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
      <a href="../html/cartpage.html" onclick="showProductId('${item.id}')">
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
  for (let i = 0; i < categories.length; i++) {
    let getproduct = dropdownProductsDaynamic(categories[i]);
    categoriesProducts.innerHTML += `
  <div class="cart-viwe-folder" id="cate${i + 1}">
        <div class="row">
            <div class="col cart-viwe">
                ${getproduct}
            </div>
        </div>
        <div class="row">
            <div class="col text-center ">
                <a href="../html/viewall.html" class="open-categories-item" onclick="showProductCategory('${
                  categories[i]
                }')"><u>VIWE ALL</u></a>
            </div>
        </div>
  </div>
 `;
  }
  function showProductCategory(cate) {
    localStorage.setItem("category", cate);
  }

  // show categoris feed when hover==========================
  let categoriesName = document.querySelectorAll(".categories");
  let cateViwe = document.querySelectorAll(".cart-viwe-folder");
  categoriesName.forEach((categorie) => {
    categorie.addEventListener("mouseenter", () => {
      let cateId = categorie.getAttribute("data-categorie");
      cateViwe.forEach((item) => {
        item.style.display = "none";
      });
      document.getElementById(cateId).style.display = "flex";
    });
  });

  // to open navbar in 768px width ==============
  let menuBarIcon = document.querySelector(".menu-bar-icon");
  let navbar = document.querySelector(".navbar-nav");
  const dropdownContent = document.querySelector(".product-dropdown");

  menuBarIcon.addEventListener("click", (event) => {
    event.stopPropagation();

    if (!navbar.classList.contains("shownav")) {
      navbar.classList.add("shownav");
      document.body.style.overflow = "hidden";
    } else {
      navbar.classList.remove("shownav");
      document.body.style.overflow = "auto";
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    }

    // Close the navbar when clicking outside of it
    document.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!navbar.contains(event.target)) {
        navbar.classList.remove("shownav");
        document.body.style.overflow = "auto";
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        }
      }
    });
  });

  // to hide navbar automatically when width increse in open condition of navbar =============================
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove("shownav");
      document.body.style.overflow = "auto";
    }
  });
}
dropdownProducts();

// search option---------------------------------------------
function searchPart() {
  // open and close-----------
  let search = document.querySelector(".search");
  let searchBar = document.querySelector(".search-bar");
  let searchCloseBtn = document.querySelector(".search-close-btn");

  search.addEventListener("click", () => {
    searchBar.style.display = "block";
  });
  searchCloseBtn.addEventListener("click", () => {
    searchBar.style.display = "none";
  });

  // input and output-----
  let searchInput = document.querySelector(".search-input");
  let optionsList = document.querySelector(".search-bar ul");

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
         <a href="../html/cartpage.html" onclick="showProductId('${item.id}')">
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
//to create product card for section 2 5 and 9==================================
function DynamicCard(productCards, str, start, end) {
  if (productCards) {
    productCards.innerHTML = "";
    for (let i = start; i < end; i++) {
      const item = items[i];
      productCards.innerHTML += `
      <div class="${str} bg-light rounded mx-2 text-center" id="${item.id}">
        <a href="../html/cartpage.html" onclick="showProductId('${item.id}')">
        <img class="s2-card-img" src="${item.image}" alt="Product Image")>
        </a>
        <div class="img-details mb-2 rounded">
          <h6 class="pt-2">${item.name}</h6>
          <p class="s2-price">Rs. ${item.price} <strike class="text-muted">Rs. ${item.actualprice}</strike></p>
          <p class="mt-1">${item.rating}</p>
          <p>${item.extrainfo}</p>
          <button type="button" class="s2-buyitnow" onclick="addToCart('${item.id}')">BUY IT NOW</button>
        </div>
      </div>`;
    }
  }
  // visite cart.js
}

// For section 2 top selling cards=========================

const topSellingCards = document.querySelector(".s2-card-part");
DynamicCard(topSellingCards, "s2-card", 0, 4);

// section 3 top categories ============================

function s3Daynamic() {
  let topCategories = document.querySelector(".s3-inner");

  if (topCategories) {
    topCategories.innerHTML = "";
    s3SlidesData.forEach((slide) => {
      topCategories.innerHTML += `
    <div class="carousel-item ${slide.isActive}">
     <img src="${slide.imgSrc}" class="s3-slide img-fluid">
            <img src="${slide.imgCutSrc}" class="s31-slide img-fluid">
            <div class="carousel-caption">
              <p>${slide.caption}</p>
            <a href="../html/viewall.html" class="s3-buy-button" onclick="showProductCategory('${slide.category}')"> BUY NOW</a>
        </div>
    </div>`;
    });
  }
}
s3Daynamic();

// section 4 hammer grab list==============================

function s4Daynamic() {
  let grabList1 = document.querySelector(".s4-inner-1");
  if (grabList1) {
    grabList1.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const slide = s4SlideData[i];
      grabList1.innerHTML += `<div class="carousel-item 1.1 ${slide.active}">
    <div class="row">
      <div class="col-6">
        <div class="s4-img-div">
          <a href="../html/cartpage.html" onclick="showProductId('${slide.id1}')"><img class="s4-slide-img" src="${slide.img1}" alt="section-4 slide imgs">
          <div class="carousel-caption">
            <p class="s4-big-img-details ${slide.textColor1} ">${slide.img1info}</p>
            <button type="button" class="s4-shop-now">Shop Now</button>
          </div>
          </a>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col">
            <div class="s4-img-div">
              <a href="../html/cartpage.html" onclick="showProductId('${slide.id2}')"><img class="s4-slide-img" src="${slide.img2}" alt="section-4 slide imgs">
              <div class="carousel-caption">
                <p class="s4-small-img-details ${slide.textColor2} ">${slide.img2info}</p>
                <button type="button" class="s4-shop-now">Shop Now</button>
              </div>
              </a>
            </div>
          </div>
          <div class="col">
            <div class="s4-img-div">
              <a href="../html/cartpage.html" onclick="showProductId('${slide.id3}')"><img class="s4-slide-img" src="${slide.img3}" alt="section-4 slide imgs">
              <div class="carousel-caption">
                <p class="s4-small-img-details ${slide.textColor3} ">${slide.img3info}</p>
                <button type="button" class="s4-shop-now">Shop Now</button>
              </div>
              </a>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <div class="s4-img-div">
              <a href="../html/cartpage.html" onclick="showProductId('${slide.id4}')"><img class="s4-slide-img" src="${slide.img4}" alt="section-4 slide imgs">
              <div class="carousel-caption">
                <p class="s4-small-img-details ${slide.textColor4} ">${slide.img4info}</p>
                <button type="button" class="s4-shop-now">Shop Now</button>
              </div>
              </a>
            </div>
          </div>
          <div class="col">
            <div class="s4-img-div">
              <a href="../html/cartpage.html" onclick="showProductId('${slide.id5}')"><img class="s4-slide-img" src="${slide.img5}" alt="section-4 slide imgs">
              <div class="carousel-caption">
                <p class="s4-small-img-details ${slide.textColor5} ">${slide.img5info}</p>
                <button type="button" class="s4-shop-now">Shop Now</button>
              </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
       </div>`;
    }
  }

  let grabList2 = document.querySelector(".s4-inner-2");
  if (grabList2) {
    grabList2.innerHTML = "";

    for (let i = 3; i < 6; i++) {
      const slide = s4SlideData[i];
      grabList2.innerHTML += `
  <div class="carousel-item 2.2 ${slide.active}">
   <div class="row">
     <div class="col">
       <div class="s4-img-div">
         <a href="../html/cartpage.html" onclick="showProductId('${slide.id1}')"><img class="s4-slide-img" src="${slide.img1}" alt="section-4 slide imgs">
         <div class="carousel-caption">
           <p class="s4-big-img-details ${slide.textColor1}">${slide.img1info}</p>
           <button type="button" class="s4-shop-now">Shop Now</button>
         </div>
         </a>
       </div>
     </div>
   </div>
   <div class="row mt-4">
     <div class="col">
       <div class="s4-img-div">
         <a href="../html/cartpage.html" onclick="showProductId('${slide.id2}')"><img class="s4-slide-img" src="${slide.img2}" alt="section-4 slide imgs">
         <div class="carousel-caption">
           <p class="s4-small-img-details ${slide.textColor2}">${slide.img2info}</p>
           <button type="button" class="s4-shop-now">Shop Now</button>
         </div>
         </a>
       </div>
     </div>
     <div class="col"2>
       <div class="s4-img-div">
         <a href="../html/cartpage.html" onclick="showProductId('${slide.id3}')"><img class="s4-slide-img" src="${slide.img3}" alt="section-4 slide imgs">
         <div class="carousel-caption">
           <p class="s4-small-img-details ${slide.textColor3}">${slide.img3info}</p>
           <button type="button" class="s4-shop-now">Shop Now</button>
         </div>
         </a>
       </div>
     </div>
   </div>
   <div class="row mt-4">
     <div class="col">
       <div class="s4-img-div">
         <a href="../html/cartpage.html" onclick="showProductId('${slide.id4}')"><img class="s4-slide-img" src="${slide.img4}" alt="section-4 slide imgs">
         <div class="carousel-caption">
           <p class="s4-small-img-details ${slide.textColor4}">${slide.img4info}</p>
           <button type="button" class="s4-shop-now">Shop Now</button>
         </div>
         </a>
       </div>
     </div>
     <div class="col">
       <div class="s4-img-div">
         <a href="../html/cartpage.html" onclick="showProductId('${slide.id5}')"><img class="s4-slide-img" src="${slide.img5}" alt="section-4 slide imgs">
         <div class="carousel-caption">
           <p class="s4-small-img-details ${slide.textColor5}">${slide.img5info}</p>
           <button type="button" class="s4-shop-now">Shop Now</button>
         </div>
         </a>
       </div>
     </div>
   </div>
 </div>`;
    }
  }
}
s4Daynamic();

//section 5 featured collection ============================

let featuredCollectionCard = document.querySelector(".s5-card-part");
DynamicCard(featuredCollectionCard, "s5-card", 4, 12);

// for section 6 card collection=============================
// Function to dynamically create the cards and scroll and flipe

function s6DynamicCard() {
  let collectionListCard = document.querySelector(".s6-card-part");
  if (collectionListCard) {
    collectionListCard.innerHTML = "";
    s6items.forEach((item) => {
      let backCard = "";
      if (item.s6cardback) {
        item.s6cardback.forEach((backitem) => {
          backCard += `<a href="../html/cartpage.html" onclick="showProductId('${backitem.id}')">
          <div class="s6-card1" id="${backitem.id}">
            <img src="${backitem.image}" alt="slide back imgs ">
            <div>
              <div class="s6-card-details">
                <p class="s6-card-title my-0">${backitem.name}</p>
                <p class="text-muted my-0">${backitem.extrainfo}</p>
                <p><strike class="text-muted my-0">Rs. ${backitem.actualprice}</strike> Rs. ${backitem.price}</p>
              </div>
            </div>
          </div>
        </a>`;
        });
      }
      collectionListCard.innerHTML += `
      <div class="card-container" id="${item.id}">
        <div class="s6-card">
          <div class="card-side card-front">
            <img class="s6-card-img" src="${item.image}" alt="ACE 2">
            <button type="button" class="s6-quickview">Quick View</button>
          </div>
          <div class="card-side card-back">
            ${backCard}
            <div class="row">
              <a href="../html/viewall.html" class="col text-center mt-1">
                <h6>see more</h6>
              </a>
            </div>
            <button type="button" class="s6-backreturn">✕</button>
          </div>
        </div>
      </div>`;
    });
  }
  // Horizontal scrolling
  scrollLeftSide(collectionListCard);
  function scrollLeftSide(scroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    scroll.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - scroll.offsetLeft;
      scrollLeft = scroll.scrollLeft;
      e.preventDefault(); // Prevent default action (context menu)
    });

    scroll.addEventListener("mouseleave", () => {
      isDown = false;
    });

    scroll.addEventListener("mouseup", () => {
      isDown = false;
    });

    scroll.addEventListener("mousemove", (e) => {
      if (isDown) {
        let x = e.pageX - scroll.offsetLeft;
        const walk = x - startX;
        scroll.scrollLeft = scrollLeft - walk;
      }
    });
  }
  rotetcart();
  // to rotate cart 180 deegre
  function rotetcart() {
    let activeCard = null;
    document.querySelectorAll(".s6-quickview").forEach((container) => {
      container.addEventListener("click", function (e) {
        e.stopPropagation();
        const currentCard = this.closest(".s6-card");

        if (activeCard && activeCard !== currentCard) {
          activeCard.classList.remove("flipped");
        }
        currentCard.classList.toggle("flipped");

        activeCard = currentCard.classList.contains("flipped")
          ? currentCard
          : null;
      });
    });
    // Flip back any active card when clicking backside X button
    document.querySelectorAll(".s6-backreturn").forEach((container) => {
      container.addEventListener("click", function () {
        if (activeCard) {
          activeCard.classList.remove("flipped");
          activeCard = null;
        }
      });
    });
  }
}
s6DynamicCard();

// for section 7 img comparison========================

function imgComparison() {
  const slider = document.querySelector(".image-comparison .slider");
  const beforeImage = document.querySelector(".image-comparison .before-image");
  const sliderLine = document.querySelector(".image-comparison .slider-line");
  const sliderIcon = document.querySelector(".image-comparison .slider-icon");

  slider.addEventListener("input", (e) => {
    let sliderValue = e.target.value + "%";

    beforeImage.style.width = sliderValue;
    sliderLine.style.left = sliderValue;
    sliderIcon.style.left = sliderValue;
  });
}
imgComparison();

// section 9 shop the look=============================

let shopTheLook = document.querySelector(".s9-card-part");
DynamicCard(shopTheLook, "s9-card", 12, 15);

//section 10 read what innterests=====================
let details = document.querySelectorAll(".s10-details");
let images = document.querySelectorAll(".s10-img-part img");
details.forEach((detail) => {
  detail.addEventListener("mouseenter", () => {
    let imgId = detail.getAttribute("data-img");
    images.forEach((img) => {
      img.style.display = "none"; // Hide all images
    });
    document.getElementById(imgId).style.display = "block"; // Show the corresponding image
  });
});

//save image id to send in next page to open full details ==================================

function showProductId(Id) {
  localStorage.setItem("pid", Id);
}
//save category to send in next page to open item with match category

function showProductCategory(cate) {
  localStorage.setItem("category", cate);
}
