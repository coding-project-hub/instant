
// Container-2
let viewAllShop = document.getElementById("view-all-shopss");
let container1 = document.getElementsByClassName("container-1")[0];
let container2 = document.getElementsByClassName("container-2")[0];

viewAllShop.addEventListener("click", () => {
    container1.style.display = "none";
    container2.style.display = "block";
});

let shopCard = document.querySelectorAll(".shop-card");
let container3 = document.getElementsByClassName("container-3")[0];

shopCard.forEach(card => {
    card.addEventListener("click", () => {
        
        container1.style.display = "none";
        container2.style.display = "none";

        // show container-3 using CSS class
        container3.classList.add("active");

        fetch("container-3.html")
            .then(res => res.text())
            .then(data => {
                container3.innerHTML = data;
            });
    });
});





/* -----------------------------
  script.js — Full e-commerce logic
  - Loads Firebase (compat) dynamically
  - Auth: SignUp / SignIn / SignOut (email/password)
  - Cart: add/remove, localStorage per-user fallback
  - Products & Shops rendering (sample data)
  - Search, offers copy, checkout (saves to Realtime DB)
  - Persists cart & listens to auth state
-------------------------------*/

/* ====== Put your firebaseConfig here (you already provided it) ====== */
const firebaseConfig = {
  apiKey: "AIzaSyCq4ZIbnyK4hsY41YyUug0f_WArOnQes2A",
  authDomain: "earning-470f0.firebaseapp.com",
  databaseURL: "https://earning-470f0-default-rtdb.firebaseio.com",
  projectId: "earning-470f0",
  storageBucket: "earning-470f0.firebasestorage.app",
  messagingSenderId: "917952272358",
  appId: "1:917952272358:web:615000692616215acce827",
  measurementId: "G-DQRGKH7711"
};

/* ===========================
   1) Load Firebase compat SDKs (dynamically)
   =========================== */
(function loadFirebaseThenInit() {
  const libs = [
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-database-compat.js",
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage-compat.js"
  ];

  let idx = 0;
  function next() {
    if (idx >= libs.length) return initApp();
    const s = document.createElement("script");
    s.src = libs[idx++];
    s.onload = next;
    s.onerror = () => {
      console.error("Failed loading firebase lib:", s.src);
      next();
    };
    document.head.appendChild(s);
  }
  next();
})();

/* ===========================
   2) Main App (runs after Firebase libs loaded)
   =========================== */
function initApp() {
  if (!window.firebase) {
    console.error("Firebase not loaded.");
    return;
  }

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();

  /* --------------------------
     Sample product & shop data
     (In a real app you'd fetch from DB)
     -------------------------- */
  const SAMPLE_PRODUCTS = [
    { id: "p1", title: "Bananas (1 kg)", price: 40, shop: "Fresh Mart", category: "Groceries", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800" },
    { id: "p2", title: "iPhone Case", price: 499, shop: "Tech Galaxy", category: "Electronics", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800" },
    { id: "p3", title: "Men's T-Shirt", price: 299, shop: "Fashion Hub", category: "Fashion", img: "https://images.unsplash.com/photo-1520975923203-7c9e7fffbf6b?w=800" },
    { id: "p4", title: "Paneer (250g)", price: 120, shop: "Fresh Mart", category: "Groceries", img: "https://images.unsplash.com/photo-1604908177522-ccfdb6b15d05?w=800" },
    { id: "p5", title: "Protein Bar", price: 149, shop: "QuickBite Kitchen", category: "Food", img: "https://images.unsplash.com/photo-1602332311041-6c040d0a9a7c?w=800" }
  ];

  const SAMPLE_SHOPS = [
    { id: "s1", name: "Fresh Mart", rating: 4.8, eta: "25-35 min", dist: "1.2 km", img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc" },
    { id: "s2", name: "Tech Galaxy", rating: 4.6, eta: "45-60 min", dist: "2.5 km", img: "https://images.unsplash.com/photo-1587825140708-74f0a58b395e" },
    { id: "s3", name: "QuickBite Kitchen", rating: 4.7, eta: "20-30 min", dist: "0.8 km", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" }
  ];

  /* --------------------------
     App State
     -------------------------- */
  let currentUser = null;
  let CART = {}; // { productId: { id, title, price, qty, shop } }
  const STORAGE_KEY = () => `quickdash_cart_${currentUser ? currentUser.uid : "guest"}`;

  /* --------------------------
     DOM Elements cached
     -------------------------- */
  const loginBtn = document.querySelector(".login-btn");
  const navRight = document.querySelector(".nav-right");
  const primaryBtn = document.querySelector(".primary-btn");
  const viewAllBtn = document.querySelector(".view-all-btn");
  const navSearchInput = document.querySelector(".nav-search input");
  const heroSection = document.querySelector(".hero-section");
  const featuredGrid = document.querySelector(".featured-grid");
  const categoryGrid = document.querySelector(".category-grid");
  const offersContainer = document.querySelector(".offers-container");

  /* --------------------------
     Helpers
     -------------------------- */
  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY(), JSON.stringify(CART));
    } catch (e) { console.warn("Could not save cart", e); }
    updateCartBadge();
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY());
      CART = raw ? JSON.parse(raw) : {};
    } catch (e) { CART = {}; }
    updateCartBadge();
  }

  function formatCurrency(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function uid() {
    return currentUser ? currentUser.uid : "guest";
  }

  function generateId(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
  }

  /* --------------------------
     Cart functions
     -------------------------- */
  function addToCart(product, qty = 1) {
    if (!product || !product.id) return;
    if (!CART[product.id]) {
      CART[product.id] = { id: product.id, title: product.title, price: product.price, qty: 0, shop: product.shop, img: product.img || "" };
    }
    CART[product.id].qty += qty;
    if (CART[product.id].qty < 1) delete CART[product.id];
    saveCart();
    showToast(`${product.title} added to cart`);
  }

  function removeFromCart(productId) {
    delete CART[productId];
    saveCart();
    renderCartModal(); // if open
  }

  function updateQty(productId, qty) {
    if (!CART[productId]) return;
    CART[productId].qty = Number(qty);
    if (CART[productId].qty <= 0) delete CART[productId];
    saveCart();
    renderCartModal();
  }

  function cartTotal() {
    return Object.values(CART).reduce((s, it) => s + it.price * it.qty, 0);
  }

  function updateCartBadge() {
    // ensure there's a cart icon; if not, create one
    let cartBtn = document.querySelector(".nav-right .cart-btn");
    if (!cartBtn) {
      cartBtn = document.createElement("button");
      cartBtn.className = "icon-btn cart-btn";
      cartBtn.innerHTML = "🛒 <span class='cart-count'>0</span>";
      cartBtn.addEventListener("click", openCartModal);
      const favBtn = document.querySelector(".nav-right .icon-btn");
      // append first icon-btn found or at end
      navRight.insertBefore(cartBtn, document.querySelector(".nav-right .login-btn"));
    }
    const count = Object.values(CART).reduce((s, it) => s + it.qty, 0);
    const countEl = cartBtn.querySelector(".cart-count");
    if (countEl) countEl.textContent = count;
    cartBtn.setAttribute("title", `${count} items in cart`);
  }

  /* --------------------------
     Toast (simple)
     -------------------------- */
  function showToast(msg, timeout = 2200) {
    let t = document.querySelector(".qd-toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "qd-toast";
      Object.assign(t.style, {
        position: "fixed",
        bottom: "22px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#111",
        color: "#fff",
        padding: "10px 18px",
        borderRadius: "20px",
        zIndex: 9999,
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        fontWeight: 600
      });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(t._to);
    t._to = setTimeout(() => t.style.opacity = "0", timeout);
  }

  /* --------------------------
     Modal utilities
     -------------------------- */
  function createModal({ title = "", bodyEl, onClose = null, width = "900px" }) {
    const overlay = document.createElement("div");
    overlay.className = "qd-modal-overlay";
    Object.assign(overlay.style, {
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 9998
    });

    const box = document.createElement("div");
    box.className = "qd-modal";
    Object.assign(box.style, {
      width, maxWidth: "96%", background: "#fff", borderRadius: "12px", padding: "20px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.25)", position: "relative", maxHeight: "88%", overflow: "auto"
    });

    const header = document.createElement("div");
    Object.assign(header.style, { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" });
    const h = document.createElement("h3"); h.textContent = title; Object.assign(h.style, { margin: 0 });
    const closeBtn = document.createElement("button"); closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, { background: "transparent", border: "none", fontSize: "16px", cursor: "pointer" });
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(overlay);
      if (onClose) onClose();
    });

    header.appendChild(h); header.appendChild(closeBtn);
    box.appendChild(header);
    if (bodyEl) box.appendChild(bodyEl);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    return { overlay, box, close: () => { document.body.removeChild(overlay); if (onClose) onClose(); } };
  }

  /* --------------------------
     Auth UI (modal): SignIn / SignUp
     -------------------------- */
  function buildAuthModal(defaultTab = "signin") {
    const container = document.createElement("div");
    container.style.padding = "6px 2px 12px";

    const tabs = document.createElement("div");
    tabs.style.display = "flex"; tabs.style.gap = "10px"; tabs.style.marginBottom = "12px";

    const tabSignIn = document.createElement("button");
    const tabSignUp = document.createElement("button");
    [tabSignIn, tabSignUp].forEach(b => Object.assign(b.style, { padding: "8px 12px", borderRadius: "8px", cursor: "pointer", border: "1px solid #eee" }));
    tabSignIn.textContent = "Sign In"; tabSignUp.textContent = "Sign Up";
    tabs.appendChild(tabSignIn); tabs.appendChild(tabSignUp);
    container.appendChild(tabs);

    const formWrap = document.createElement("div");
    container.appendChild(formWrap);

    function renderForm(tab) {
      formWrap.innerHTML = "";
      if (tab === "signin") {
        tabSignIn.style.background = "#12c26b"; tabSignIn.style.color = "#fff";
        tabSignUp.style.background = "transparent"; tabSignUp.style.color = "#333";
        const f = document.createElement("form");
        f.innerHTML = `
          <label style="font-weight:700">Email</label><input required name="email" type="email" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ddd;margin:6px 0 12px"/><br/>
          <label style="font-weight:700">Password</label><input required name="password" type="password" minlength="6" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ddd;margin:6px 0 12px"/><br/>
          <button type="submit" style="background:#12c26b;color:#fff;padding:10px 16px;border-radius:10px;border:none;cursor:pointer">Sign In</button>
          <button type="button" id="forgot" style="margin-left:8px;background:transparent;border:none;color:#12c26b;cursor:pointer">Forgot?</button>
        `;
        f.addEventListener("submit", async (e) => {
          e.preventDefault();
          const email = f.email.value.trim();
          const password = f.password.value;
          try {
            await auth.signInWithEmailAndPassword(email, password);
            modal.close();
            showToast("Signed in ✔️");
          } catch (err) {
            console.error(err); showToast(err.message || "Sign-in failed");
          }
        });
        formWrap.appendChild(f);

        formWrap.querySelector("#forgot").addEventListener("click", async () => {
          const email = prompt("Enter your email to receive a reset link:");
          if (!email) return;
          try {
            await auth.sendPasswordResetEmail(email);
            showToast("Password reset sent to " + email);
          } catch (err) {
            showToast(err.message || "Could not send reset");
          }
        });
      } else {
        tabSignUp.style.background = "#12c26b"; tabSignUp.style.color = "#fff";
        tabSignIn.style.background = "transparent"; tabSignIn.style.color = "#333";
        const f = document.createElement("form");
        f.innerHTML = `
          <label style="font-weight:700">Full name</label><input required name="name" type="text" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ddd;margin:6px 0 12px"/><br/>
          <label style="font-weight:700">Email</label><input required name="email" type="email" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ddd;margin:6px 0 12px"/><br/>
          <label style="font-weight:700">Password (6+ chars)</label><input required name="password" type="password" minlength="6" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ddd;margin:6px 0 12px"/><br/>
          <button type="submit" style="background:#12c26b;color:#fff;padding:10px 16px;border-radius:10px;border:none;cursor:pointer">Create account</button>
        `;
        f.addEventListener("submit", async (e) => {
          e.preventDefault();
          const name = f.name.value.trim();
          const email = f.email.value.trim();
          const password = f.password.value;
          try {
            const res = await auth.createUserWithEmailAndPassword(email, password);
            // Save profile to realtime DB
            const uref = db.ref(`users/${res.user.uid}`);
            await uref.set({ name, email, createdAt: Date.now() });
            modal.close();
            showToast("Account created — logged in ✔️");
          } catch (err) {
            console.error(err); showToast(err.message || "Sign-up failed");
          }
        });
        formWrap.appendChild(f);
      }
    }

    tabSignIn.addEventListener("click", () => renderForm("signin"));
    tabSignUp.addEventListener("click", () => renderForm("signup"));
    renderForm(defaultTab);

    const modal = createModal({ title: "Welcome to QuickDash", bodyEl: container, width: "420px" });
    return modal;
  }

  /* --------------------------
     Auth state listener
     -------------------------- */
  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    loadCart(); // load cart for new user/guest
    updateNavForUser();
    // fetch user name if available and show small welcome
    if (user) {
      const snap = await db.ref(`users/${user.uid}`).once("value");
      const profile = snap.exists() ? snap.val() : { email: user.email };
      showToast(`Welcome back${profile.name ? ", " + profile.name.split(" ")[0] : ""}!`);
    }
  });

  function updateNavForUser() {
    if (currentUser) {
      loginBtn.textContent = (currentUser.displayName || currentUser.email || "User");
      // show small dropdown with sign out
      loginBtn.onclick = (e) => {
        // simple dropdown
        if (document.querySelector(".qd-user-drop")) {
          document.querySelector(".qd-user-drop").remove();
          return;
        }
        const d = document.createElement("div");
        d.className = "qd-user-drop";
        Object.assign(d.style, { position: "absolute", right: "18px", top: "62px", background: "#fff", padding: "8px", borderRadius: "8px", boxShadow: "0 6px 18px rgba(0,0,0,0.12)", zIndex: 1000 });
        d.innerHTML = `<div style="padding:8px 12px;font-weight:700">${currentUser.email}</div>
                       <button id="signout" style="background:#efefef;border:none;padding:8px 12px;border-radius:8px;cursor:pointer">Sign out</button>`;
        document.body.appendChild(d);
        document.getElementById("signout").addEventListener("click", async () => {
          await auth.signOut();
          showToast("Signed out");
          d.remove();
        });
      };
    } else {
      loginBtn.textContent = "Login";
      loginBtn.onclick = () => buildAuthModal();
    }
    updateCartBadge();
  }

  /* --------------------------
     Render sample shops/cards
     -------------------------- */
  function renderFeaturedShops() {
    featuredGrid.innerHTML = "";
    SAMPLE_SHOPS.forEach(shop => {
      const el = document.createElement("div");
      el.className = "shop-card";
      el.innerHTML = `
        <div class="shop-image">
          <img src="${shop.img}" />
          <div class="badge-row">
            <span class="badge featured">Featured</span>
            <span class="badge free">Free Delivery</span>
            <span class="badge open">● Open</span>
          </div>
        </div>
        <div class="shop-content">
          <h3>${shop.name}</h3>
          <p>Top picks from ${shop.name}</p>
          <div class="shop-info">
            <span>⏱️ ${shop.eta}</span>
            <span>📍 ${shop.dist}</span>
            <span>🚚 Free</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
            <div class="rating">⭐ ${shop.rating}</div>
            <button class="open-shop-btn" data-shop="${shop.name}" style="padding:8px 10px;border-radius:8px;border:none;cursor:pointer;background:#12c26b;color:#fff">Open</button>
          </div>
        </div>
      `;
      featuredGrid.appendChild(el);
    });

    // attach shop open handlers
    document.querySelectorAll(".open-shop-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const shopName = btn.dataset.shop;
        openShopProducts(shopName);
      });
    });
  }

  /* --------------------------
     Render categories (cards exist in HTML, but ensure click behavior)
     -------------------------- */
  function attachCategoryClicks() {
    document.querySelectorAll(".category-card").forEach(card => {
      const title = (card.querySelector("p") || {}).textContent;
      card.style.cursor = "pointer";
      card.addEventListener("click", () => openCategory(title));
    });
  }

  /* --------------------------
     Product listing UI (modal)
     -------------------------- */
  function openShopProducts(shopName) {
    const body = document.createElement("div");
    body.style.display = "grid";
    body.style.gridTemplateColumns = "1fr 320px";
    body.style.gap = "16px";

    // left: product list
    const left = document.createElement("div");
    const list = document.createElement("div");
    list.style.display = "grid";
    list.style.gap = "12px";

    const products = SAMPLE_PRODUCTS.filter(p => p.shop === shopName);
    if (products.length === 0) {
      list.innerHTML = `<div style="padding:18px;background:#fff;border-radius:8px">No items yet in ${shopName}</div>`;
    } else {
      products.forEach(p => {
        const item = document.createElement("div");
        Object.assign(item.style, { display: "flex", gap: "12px", background: "#fff", padding: "12px", borderRadius: "10px", alignItems: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.04)" });
        item.innerHTML = `
          <img src="${p.img}" style="width:86px;height:86px;object-fit:cover;border-radius:8px"/>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;align-items:center"><b>${p.title}</b><div style="font-weight:700">${formatCurrency(p.price)}</div></div>
            <div style="color:#666;margin-top:6px;font-size:14px">${p.category} • ${p.shop}</div>
            <div style="margin-top:10px">
              <button class="add-quick" data-id="${p.id}" style="padding:8px 10px;border-radius:8px;border:none;background:#12c26b;color:#fff;cursor:pointer">Add</button>
              <button class="add-qty" data-id="${p.id}" style="padding:8px 10px;border-radius:8px;border:1px solid #ddd;background:transparent;margin-left:8px;cursor:pointer">+ Qty</button>
            </div>
          </div>
        `;
        list.appendChild(item);
      });
    }
    left.appendChild(list);

    // right: shop info + cart summary
    const right = document.createElement("div");
    right.style.background = "#fff";
    right.style.borderRadius = "12px";
    right.style.padding = "12px";
    right.style.boxShadow = "0 6px 18px rgba(0,0,0,0.04)";
    right.innerHTML = `<h3 style="margin:0 0 8px">${shopName}</h3>
      <div style="color:#777;margin-bottom:12px">Delivery: 20-40 min • Free</div>
      <div class="mini-cart" style="margin-top:10px"></div>
      <div style="margin-top:12px"><button class="goto-cart" style="padding:10px 12px;border-radius:10px;border:none;background:#12c26b;color:#fff;cursor:pointer;width:100%">Go to Cart</button></div>
    `;

    body.appendChild(left); body.appendChild(right);

    const m = createModal({ title: `Shop — ${shopName}`, bodyEl: body, width: "960px" });

    // attach add-to-cart handlers
    m.box.querySelectorAll(".add-quick").forEach(btn => {
      btn.addEventListener("click", () => {
        const pid = btn.dataset.id;
        const p = SAMPLE_PRODUCTS.find(x => x.id === pid);
        addToCart(p, 1);
      });
    });
    m.box.querySelectorAll(".add-qty").forEach(btn => {
      btn.addEventListener("click", () => {
        const pid = btn.dataset.id;
        const p = SAMPLE_PRODUCTS.find(x => x.id === pid);
        const q = Number(prompt("Enter quantity:", "1")) || 1;
        addToCart(p, q);
      });
    });

    m.box.querySelector(".goto-cart").addEventListener("click", () => {
      m.close();
      openCartModal();
    });
  }

  function openCategory(category) {
    const prods = SAMPLE_PRODUCTS.filter(p => p.category === category);
    if (!prods.length) return showToast("No items in " + category);
    // reuse shop product modal style but show all products
    const body = document.createElement("div");
    const grid = document.createElement("div");
    Object.assign(grid.style, { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "12px" });

    prods.forEach(p => {
      const c = document.createElement("div");
      Object.assign(c.style, { background: "#fff", padding: "12px", borderRadius: "10px", boxShadow: "0 8px 18px rgba(0,0,0,0.04)" });
      c.innerHTML = `<img src="${p.img}" style="width:100%;height:140px;object-fit:cover;border-radius:8px"/><h4 style="margin:8px 0">${p.title}</h4><div style="display:flex;justify-content:space-between;align-items:center"><b>${formatCurrency(p.price)}</b><button class="addp" data-id="${p.id}" style="padding:8px 10px;border-radius:8px;border:none;background:#12c26b;color:#fff;cursor:pointer">Add</button></div>`;
      grid.appendChild(c);
    });
    body.appendChild(grid);
    const modal = createModal({ title: `Category — ${category}`, bodyEl: body, width: "900px" });
    modal.box.querySelectorAll(".addp").forEach(b => {
      b.addEventListener("click", () => {
        const p = SAMPLE_PRODUCTS.find(x => x.id === b.dataset.id);
        addToCart(p, 1);
        modal.close();
      });
    });
  }

  /* --------------------------
     Cart modal (checkout flow)
     -------------------------- */
  function renderCartModal() {
    const body = document.createElement("div");
    body.style.minWidth = "420px";

    const entries = Object.values(CART);
    if (!entries.length) {
      body.innerHTML = `<div style="padding:28px;text-align:center">Your cart is empty</div>`;
      return createModal({ title: "Cart", bodyEl: body, width: "520px" });
    }

    const list = document.createElement("div");
    list.style.display = "grid";
    list.style.gap = "10px";

    entries.forEach(item => {
      const el = document.createElement("div");
      Object.assign(el.style, { display: "flex", gap: "12px", alignItems: "center", background: "#fff", padding: "10px", borderRadius: "10px" });
      el.innerHTML = `<img src="${item.img}" style="width:74px;height:74px;object-fit:cover;border-radius:8px"/><div style="flex:1"><b>${item.title}</b><div style="color:#666">${formatCurrency(item.price)} • ${item.shop}</div><div style="margin-top:8px"><input type="number" min="1" value="${item.qty}" data-id="${item.id}" style="width:82px;padding:6px;border-radius:8px;border:1px solid #ddd"/> <button data-id="${item.id}" class="remove" style="margin-left:8px;padding:8px;border-radius:8px;border:none;background:#ff5252;color:#fff;cursor:pointer">Remove</button></div></div></div>`;
      list.appendChild(el);
    });

    const summary = document.createElement("div");
    summary.style.marginTop = "12px";
    summary.innerHTML = `<div style="display:flex;justify-content:space-between;font-weight:700"><div>Subtotal</div><div>${formatCurrency(cartTotal())}</div></div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <button class="checkout" style="flex:1;padding:12px;border-radius:10px;border:none;background:#12c26b;color:#fff;cursor:pointer">Checkout</button>
        <button class="continue" style="padding:12px;border-radius:10px;border:1px solid #ddd;background:transparent;cursor:pointer">Continue</button>
      </div>`;

    body.appendChild(list); body.appendChild(summary);

    const modal = createModal({ title: "Your Cart", bodyEl: body, width: "720px" });

    // attach qty change
    modal.box.querySelectorAll("input[type=number]").forEach(inp => {
      inp.addEventListener("change", () => updateQty(inp.dataset.id, Number(inp.value)));
    });

    modal.box.querySelectorAll(".remove").forEach(b => {
      b.addEventListener("click", () => {
        removeFromCart(b.dataset.id);
        modal.close();
        renderCartModal();
      });
    });

    modal.box.querySelector(".continue").addEventListener("click", () => {
      modal.close();
    });

    modal.box.querySelector(".checkout").addEventListener("click", async () => {
      if (!currentUser) {
        showToast("Please sign in to checkout");
        modal.close();
        buildAuthModal("signin");
        return;
      }
      // gather order
      const orderId = generateId("ord_");
      const items = Object.values(CART).map(i => ({ id: i.id, title: i.title, qty: i.qty, price: i.price, shop: i.shop }));
      const total = cartTotal();

      // save to DB under orders/{uid}/{orderId}
      try {
        await db.ref(`orders/${currentUser.uid}/${orderId}`).set({
          id: orderId, user: currentUser.uid, items, total, status: "pending", createdAt: Date.now()
        });
        // clear cart
        CART = {};
        saveCart();
        modal.close();
        showToast("Order placed ✔️ — tracking in Orders");
      } catch (err) {
        console.error(err);
        showToast("Could not place order");
      }
    });

    return modal;
  }

  function openCartModal() {
    renderCartModal();
  }

  /* --------------------------
     Search behaviour (search shops & products)
     -------------------------- */
  function performSearch(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return showToast("Type to search shops or products");
    // find matching shops
    const matchedShops = SAMPLE_SHOPS.filter(s => s.name.toLowerCase().includes(q));
    const matchedProducts = SAMPLE_PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    const body = document.createElement("div");
    body.style.display = "grid"; body.style.gap = "12px";

    if (matchedShops.length) {
      const sg = document.createElement("div");
      sg.innerHTML = `<h4>Shops</h4>`;
      matchedShops.forEach(s => {
        const el = document.createElement("div");
        el.style.padding = "10px"; el.style.background = "#fff"; el.style.borderRadius = "8px";
        el.innerHTML = `<b>${s.name}</b><div style="color:#666">${s.eta} • ${s.dist}</div><button style="margin-top:8px;padding:8px;border-radius:8px;border:none;background:#12c26b;color:#fff;cursor:pointer" data-shop="${s.name}" class="openshop">Open</button>`;
        sg.appendChild(el);
      });
      body.appendChild(sg);
    }

    if (matchedProducts.length) {
      const pg = document.createElement("div");
      pg.innerHTML = `<h4>Products</h4>`;
      const grid = document.createElement("div"); grid.style.display = "grid"; grid.style.gap = "8px";
      matchedProducts.forEach(p => {
        const it = document.createElement("div");
        it.style.padding = "10px"; it.style.background = "#fff"; it.style.borderRadius = "8px";
        it.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><b>${p.title}</b><div style="color:#666;font-size:13px">${p.shop} • ${p.category}</div></div><div><b>${formatCurrency(p.price)}</b></div></div><div style="margin-top:8px"><button class="addp" data-id="${p.id}" style="padding:8px;border-radius:8px;border:none;background:#12c26b;color:#fff;cursor:pointer">Add to cart</button></div>`;
        grid.appendChild(it);
      });
      pg.appendChild(grid); body.appendChild(pg);
    }

    if (!matchedShops.length && !matchedProducts.length) {
      body.innerHTML = `<div style="padding:18px;background:#fff;border-radius:8px">No results for "${q}"</div>`;
    }

    const modal = createModal({ title: `Search — "${q}"`, bodyEl: body, width: "760px" });
    modal.box.querySelectorAll(".openshop").forEach(b => b.addEventListener("click", () => { modal.close(); openShopProducts(b.dataset.shop); }));
    modal.box.querySelectorAll(".addp").forEach(b => {
      b.addEventListener("click", () => {
        const p = SAMPLE_PRODUCTS.find(x => x.id === b.dataset.id);
        addToCart(p, 1);
        modal.close();
      });
    });
  }

  /* --------------------------
     Offers copy handlers
     -------------------------- */
  function attachOfferCopy() {
    if (!offersContainer) return;
    offersContainer.querySelectorAll(".tap").forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        const code = el.previousElementSibling ? el.previousElementSibling.textContent : null;
        if (!code) return;
        navigator.clipboard?.writeText(code).then(() => showToast(`Copied ${code}`)).catch(() => showToast("Copy failed"));
      });
    });
  }

  /* --------------------------
     Misc: Start shopping button opens a product browser with all products
     -------------------------- */
  function openAllProducts() {
    const body = document.createElement("div");
    body.style.minWidth = "680px";
    const grid = document.createElement("div");
    Object.assign(grid.style, { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "12px" });
    SAMPLE_PRODUCTS.forEach(p => {
      const card = document.createElement("div");
      card.style.background = "#fff"; card.style.padding = "10px"; card.style.borderRadius = "10px";
      card.innerHTML = `<img src="${p.img}" style="width:100%;height:140px;object-fit:cover;border-radius:8px"/><h4 style="margin:8px 0">${p.title}</h4><div style="display:flex;justify-content:space-between;align-items:center"><b>${formatCurrency(p.price)}</b><button class="addp" data-id="${p.id}" style="padding:8px;border-radius:8px;border:none;background:#12c26b;color:#fff;cursor:pointer">Add</button></div>`;
      grid.appendChild(card);
    });
    body.appendChild(grid);
    const modal = createModal({ title: "All products", bodyEl: body, width: "960px" });
    modal.box.querySelectorAll(".addp").forEach(b => {
      b.addEventListener("click", () => {
        const p = SAMPLE_PRODUCTS.find(x => x.id === b.dataset.id);
        addToCart(p, 1);
        showToast("Added to cart");
      });
    });
  }

  /* --------------------------
     Initial setup: render UI, attach handlers
     -------------------------- */
  function initUI() {
    // attach login click
    loginBtn.addEventListener("click", () => {
      if (!currentUser) buildAuthModal();
      else {
        // if user logged in, clicking shows small dropdown handled in updateNavForUser
        updateNavForUser();
      }
    });

    // primary start shopping
    primaryBtn.addEventListener("click", (e) => { e.preventDefault(); openAllProducts(); });

    // view all shops — open first shop if none
    if (viewAllBtn) viewAllBtn.addEventListener("click", (e) => { e.preventDefault(); openAllProducts(); });

    // search action on Enter
    if (navSearchInput) {
      navSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") performSearch(navSearchInput.value);
      });
    }

    // offers copy attach
    attachOfferCopy();

    // attach category clicks
    attachCategoryClicks();

    // update initial nav
    updateNavForUser();

    // cart badge
    updateCartBadge();

    // render shops into UI
    renderFeaturedShops();

    // make badges clickable to copy codes for offer cards (also covered earlier)
    document.querySelectorAll(".offer-card .tap").forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        const c = el.previousElementSibling ? el.previousElementSibling.textContent : "";
        navigator.clipboard?.writeText(c).then(() => showToast("Copied: " + c)).catch(() => showToast("Copy error"));
      });
    });

    // checkout from other places (listen for cart icon click already set)
  }

  // ensure cart loads for guest initially
  loadCart();
  initUI();

  /* ===========================
     Extra: Expose some helpers for debugging in console
     =========================== */
  window.QD = {
    addToCart, removeFromCart, CART, getCurrentUser: () => currentUser, openCartModal, openAllProducts,
    performSearch, SAMPLE_PRODUCTS, SAMPLE_SHOPS
  };

  /* ===========================
     Accessibility / small polish:
     - Close stray user dropdown on body click
     =========================== */
  document.addEventListener("click", (e) => {
    const drop = document.querySelector(".qd-user-drop");
    if (drop && !drop.contains(e.target) && e.target !== loginBtn) drop.remove();
  });
}
/* -----------------------
   CITY BY PINCODE
------------------------- */
const pincodeCityMap = {
    "400001": "Mumbai",
    "110001": "Delhi",
    "560001": "Bengaluru",
    "411001": "Pune",
    "440001": "Nagpur",
    "500001": "Hyderabad"
};

document.getElementById("pincodeInput").addEventListener("input", function () {
    const pin = this.value;

    if (pin.length === 6 && pincodeCityMap[pin]) {
        document.getElementById("citySelect").value = pincodeCityMap[pin];
    }
});


/* -----------------------
   SHOP DATA (12 shops)
------------------------- */
const shops = [
    { name: "Fresh Mart", time: "25-35 min", km: "1.2 km", fee: "Free", rating: 4.8, img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc" },
    { name: "Tech Galaxy", time: "45-60 min", km: "2.5 km", fee: "₹49", rating: 4.6, img: "https://images.unsplash.com/photo-1587825140708-74f0a58b395e" },
    { name: "QuickBite Kitchen", time: "20-30 min", km: "0.8 km", fee: "Free", rating: 4.7, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
    { name: "Mega Electronics", time: "40-55 min", km: "3.2 km", fee: "₹25", rating: 4.5, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { name: "Daily Fresh Veggies", time: "15-20 min", km: "0.6 km", fee: "Free", rating: 4.9, img: "https://images.unsplash.com/photo-1542838687-2d9b4e89b271" },
    { name: "City Fashion Hub", time: "35-45 min", km: "1.8 km", fee: "₹30", rating: 4.3, img: "https://images.unsplash.com/photo-1520974699644-7791d5e5c0de" },
    { name: "Book Paradise", time: "20-30 min", km: "2.1 km", fee: "Free", rating: 4.7, img: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
    { name: "Beauty Bliss", time: "25-35 min", km: "1.5 km", fee: "Free", rating: 4.8, img: "https://images.unsplash.com/photo-1526045478516-99145907023c" },
    { name: "Sports Zone", time: "35-45 min", km: "3.0 km", fee: "₹20", rating: 4.4, img: "https://images.unsplash.com/photo-1507643179773-3e975d7ac515" },
    { name: "Kitchen Essentials", time: "30-40 min", km: "2.2 km", fee: "Free", rating: 4.6, img: "https://images.unsplash.com/photo-1505576965402-c5232cf3d1c9" },
    { name: "Smart Phones Store", time: "45-55 min", km: "4.0 km", fee: "₹50", rating: 4.5, img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35ec" },
    { name: "Pet Food & Care", time: "20-25 min", km: "1.0 km", fee: "Free", rating: 4.9, img: "https://images.unsplash.com/photo-1558944351-c4e26a6b61f4" }
];

/* Render Shops */
const shopList = document.getElementById("shopList");
shopList.innerHTML = shops.map(shop => `
    <div class="shop-card">
        <div class="shop-image">
            <img src="${shop.img}">
            <div class="badge-row">
                <span class="badge featured">Featured</span>
                <span class="badge free">Free Delivery</span>
                <span class="badge open">● Open</span>
            </div>
        </div>
        <div class="shop-content">
            <h3>${shop.name}</h3>
            <p>Top picks for you</p>
            <div class="shop-info">
                <span>⏱️ ${shop.time}</span>
                <span>📍 ${shop.km}</span>
                <span>🚚 ${shop.fee}</span>
            </div>
            <div class="rating">⭐ ${shop.rating}</div>
        </div>
    </div>
`).join("");



/* -----------------------
   PRODUCT DATA (20+)
------------------------- */
const products = [
    { name: "Apple iPhone Case", price: 299, img: "https://images.unsplash.com/photo-1606813907291-d86efa7be9bd" },
    { name: "Organic Tomatoes", price: 89, img: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a" },
    { name: "Headphones", price: 899, img: "https://images.unsplash.com/photo-1518449105430-5f1c1d46b00f" },
    { name: "Sports Shoes", price: 1299, img: "https://images.unsplash.com/photo-1528701800489-20be3c47c6c2" },
    { name: "Shampoo Bottle", price: 149, img: "https://images.unsplash.com/photo-1585386959984-a41552261a96" },
    { name: "Bluetooth Speaker", price: 499, img: "https://images.unsplash.com/photo-1574172366993-af3fcead870b" },
    { name: "Chocolate Cookies", price: 59, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0" },
    { name: "School Notebook", price: 40, img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353" },
    { name: "Noodles Pack", price: 30, img: "https://images.unsplash.com/photo-1528731708534-816fe59f90cb" },
    { name: "Cold Drink", price: 40, img: "https://images.unsplash.com/photo-1584267385494-3fce0f98b42a" },
];

const productList = document.getElementById("productList");

productList.innerHTML = products.map(p => `
    <div class="product-card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <span>₹${p.price}</span>
    </div>
`).join("");



/* -----------------------
   OFFER COPY TO CLIPBOARD
------------------------- */

document.querySelectorAll(".code-box").forEach(box => {
    box.addEventListener("click", () => {
        const code = box.querySelector(".code").innerText;
        navigator.clipboard.writeText(code);

        box.classList.add("copied");
        box.querySelector(".tap").innerText = "Copied!";

        setTimeout(() => {
            box.classList.remove("copied");
            box.querySelector(".tap").innerText = "Tap to copy";
        }, 1500);
    });
});



