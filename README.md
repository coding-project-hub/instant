<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QuickDash – Delivered Today</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
<body>

    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="nav-left">
            <div class="logo">Inst<span>ant</span></div>

            <div class="location">
                <!-- <span class="city">Mumbai</span> -->
                 <select>
                    <option selected >Gondia</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                 </select>
                <!-- <span class="arrow">▼</span> -->
            </div>
        </div>

        <div class="nav-search">
            <input type="text" placeholder="Search shops, products..." />
            <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>

        <div class="nav-right">
            <button class="icon-btn"><i class="fa-solid fa-user"></i></button>
            <button class="icon-btn"><i class="fa-regular fa-heart"></i></button>
            <button class="icon-btn">Seller</i></button>
            <button class="icon-btn">Orders</i></button>
            <!-- <button class="icon-btn">🛒</button> -->
            <button class="login-btn">Login</button>

        </div>
    </nav>

<div class="container-1" >

    <!-- SHOP BY CATEGORY -->
<section class="category-section">
    <h2 class="category-title">Shop by Category</h2>
    <p class="category-subtitle">Find everything you need in one place</p>

   <div class="category-grid">

    <!-- Original -->
    <div class="category-card"><div class="icon-box" style="background:#dfffe8;">🛒</div><p>Groceries</p></div>
    <div class="category-card"><div class="icon-box" style="background:#e3efff;">📱</div><p>Electronics</p></div>
    <div class="category-card"><div class="icon-box" style="background:#ffe6f2;">👕</div><p>Fashion</p></div>
    <div class="category-card"><div class="icon-box" style="background:#ffe8cc;">🍔</div><p>Restaurants</p></div>
    <div class="category-card"><div class="icon-box" style="background:#ffe6ea;">💊</div><p>Pharmacy</p></div>
    <div class="category-card"><div class="icon-box" style="background:#fff6c9;">📚</div><p>Books</p></div>
    <div class="category-card"><div class="icon-box" style="background:#dbffe7;">⚽</div><p>Sports</p></div>
    <div class="category-card"><div class="icon-box" style="background:#f4e6ff;">💄</div><p>Beauty</p></div>

    <!-- Grocery & Daily -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#e8ffe3;">🥦</div><p>Vegetables</p></div> -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#fff0d9;">🍎</div><p>Fruits</p></div> -->
    <div class="category-card"><div class="icon-box" style="background:#e8f0ff;">🥛</div><p>Dairy</p></div>
    <div class="category-card"><div class="icon-box" style="background:#ffe6e6;">🍞</div><p>Bakery</p></div>
    <!-- <div class="category-card"><div class="icon-box" style="background:#e3fff7;">🍬</div><p>Snacks</p></div> -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#ffdede;">🫗</div><p>Beverages</p></div> -->

    <!-- Tech -->
    <div class="category-card"><div class="icon-box" style="background:#e3e7ff;">💻</div><p>Laptops</p></div>
    <div class="category-card"><div class="icon-box" style="background:#edf6ff;">🎧</div><p>Headphones</p></div>
    <!-- <div class="category-card"><div class="icon-box" style="background:#ffe8e8;">⌚</div><p>Smartwatch</p></div> -->
    <div class="category-card"><div class="icon-box" style="background:#f0f4ff;">🖥️</div><p>Desktop</p></div>
    <div class="category-card"><div class="icon-box" style="background:#e8faff;">🎮</div><p>Gaming</p></div>

    <!-- Fashion -->
    <div class="category-card"><div class="icon-box" style="background:#ffe0ed;">👗</div><p>Women’s Wear</p></div>
    <div class="category-card"><div class="icon-box" style="background:#ffe3fb;">🧥</div><p>Men’s Wear</p></div>
    <div class="category-card"><div class="icon-box" style="background:#fdf3d6;">👟</div><p>Footwear</p></div>
    <div class="category-card"><div class="icon-box" style="background:#fae6ff;">👜</div><p>Bags</p></div>
    <div class="category-card"><div class="icon-box" style="background:#e6f9ff;">⌚</div><p>Accessories</p></div>

    <!-- Food Delivery -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#fff0e0;">🍕</div><p>Pizza</p></div> -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#ffeee3;">🍣</div><p>Restaurants</p></div> -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#e8ffe8;">🥗</div><p>Healthy Food</p></div> -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#fff9d5;">🧁</div><p>Desserts</p></div> -->

    <!-- Pharmacy / Health -->
    <div class="category-card"><div class="icon-box" style="background:#e3fff2;">🩺</div><p>Health Care</p></div>
    <div class="category-card"><div class="icon-box" style="background:#f8e5ff;">🍼</div><p>Baby Care</p></div>
    <!-- <div class="category-card"><div class="icon-box" style="background:#fff5f7;">🩹</div><p>First Aid</p></div> -->

    <!-- Home & Living -->
    <div class="category-card"><div class="icon-box" style="background:#fff5e1;">🛋️</div><p>Furniture</p></div>
    <div class="category-card"><div class="icon-box" style="background:#e6fff2;">🍽️</div><p>Kitchen</p></div>
    <!-- <div class="category-card"><div class="icon-box" style="background:#e5f3ff;">🚿</div><p>Bathroom</p></div> -->

    <!-- Sports -->
    <div class="category-card"><div class="icon-box" style="background:#e8fff5;">🏋️</div><p>Gym</p></div>
    <!-- <div class="category-card"><div class="icon-box" style="background:#fff8e6;">🚴</div><p>Cycling</p></div> -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#eafff8;">🏕️</div><p>Outdoor</p></div> -->

    <!-- Extra Useful -->
    <div class="category-card"><div class="icon-box" style="background:#e9fffd;">🐶</div><p>Pet Supplies</p></div>
    <div class="category-card"><div class="icon-box" style="background:#fff4d7;">🎁</div><p>Gifts</p></div>
    <div class="category-card"><div class="icon-box" style="background:#e8e8ff;">🛠️</div><p>Tools</p></div>
    <!-- <div class="category-card"><div class="icon-box" style="background:#ffeaea;">🚗</div><p>Automobile</p></div> -->
    <!-- <div class="category-card"><div class="icon-box" style="background:#dff4ff;">🏠</div><p>Home Services</p></div> -->

</div>

</section>

<section class="featured-shops-section">

    <div class="featured-header">
        <div>
            <h2 class="featured-title">Featured Shops</h2>
            <p class="featured-subtitle">Top-rated stores in your city</p>
        </div>

        <span id="view-all-shopss" class="view-all-btn">View All Shops →</span>
    </div>

    <div class="featured-grid">

        <!-- SHOP 1 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1598966733535-5f9d7d6f7a70" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Fresh Mart</h3>
                <p>Your daily essentials delivered fresh</p>
                <div class="shop-info">
                    <span>⏱️ 25-35 min</span>
                    <span>📍 1.2 km</span>
                    <span>🚚 Free</span>
                </div>
                <div class="rating">⭐ 4.8</div>
            </div>
        </div>

        <!-- SHOP 2 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Tech Galaxy</h3>
                <p>Latest gadgets at best prices</p>
                <div class="shop-info">
                    <span>⏱️ 45-60 min</span>
                    <span>📍 2.5 km</span>
                    <span>🚚 ₹49</span>
                </div>
                <div class="rating">⭐ 4.6</div>
            </div>
        </div>

        <!-- SHOP 3 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>QuickBite Kitchen</h3>
                <p>Homestyle meals in minutes</p>
                <div class="shop-info">
                    <span>⏱️ 20-30 min</span>
                    <span>📍 0.8 km</span>
                    <span>🚚 Free</span>
                </div>
                <div class="rating">⭐ 4.7</div>
            </div>
        </div>

        <!-- SHOP 4 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" />
                <div class="badge-row">
                    <span class="badge featured">Popular</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Bake House</h3>
                <p>Fresh breads & premium cakes</p>
                <div class="shop-info">
                    <span>⏱️ 30-40 min</span>
                    <span>📍 1.5 km</span>
                    <span>🚚 Free</span>
                </div>
                <div class="rating">⭐ 4.9</div>
            </div>
        </div>

        <!-- SHOP 5 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1520975918318-3b1c9c8b22b8" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Style Hub</h3>
                <p>Trendy fashion & accessories</p>
                <div class="shop-info">
                    <span>⏱️ 40-55 min</span>
                    <span>📍 3.2 km</span>
                    <span>🚚 ₹29</span>
                </div>
                <div class="rating">⭐ 4.5</div>
            </div>
        </div>

        <!-- SHOP 6 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1611095564632-d5e9c976a6f1" />
                <div class="badge-row">
                    <span class="badge featured">Recommended</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Pet Palace</h3>
                <p>Food, toys & essentials for pets</p>
                <div class="shop-info">
                    <span>⏱️ 35-45 min</span>
                    <span>📍 2.0 km</span>
                    <span>🚚 ₹19</span>
                </div>
                <div class="rating">⭐ 4.7</div>
            </div>
        </div>

        <!-- SHOP 7 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" />
                <div class="badge-row">
                    <span class="badge featured">Top Rated</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>ElectroMart</h3>
                <p>Daily tech deals & gadgets</p>
                <div class="shop-info">
                    <span>⏱️ 50-70 min</span>
                    <span>📍 4.5 km</span>
                    <span>🚚 ₹59</span>
                </div>
                <div class="rating">⭐ 4.4</div>
            </div>
        </div>

        <!-- SHOP 8 -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" />
                <div class="badge-row">
                    <span class="badge featured">Trending</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Healthy Harvest</h3>
                <p>Organic products for everyone</p>
                <div class="shop-info">
                    <span>⏱️ 20-35 min</span>
                    <span>📍 1.0 km</span>
                    <span>🚚 Free</span>
                </div>
                <div class="rating">⭐ 4.9</div>
            </div>
        </div>

        <!-- SHOP 9 (NEW) -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1470338745628-171cf53de3aa" />
                <div class="badge-row">
                    <span class="badge featured">Premium</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Book World</h3>
                <p>Books, novels & study material</p>
                <div class="shop-info">
                    <span>⏱️ 15-25 min</span>
                    <span>📍 0.6 km</span>
                    <span>🚚 Free</span>
                </div>
                <div class="rating">⭐ 4.8</div>
            </div>
        </div>

        <!-- SHOP 10 (NEW) -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1556742031-c6961e8560b0" />
                <div class="badge-row">
                    <span class="badge featured">Popular</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Juice Corner</h3>
                <p>Fresh juices & smoothies</p>
                <div class="shop-info">
                    <span>⏱️ 10-20 min</span>
                    <span>📍 0.5 km</span>
                    <span>🚚 Free</span>
                </div>
                <div class="rating">⭐ 4.8</div>
            </div>
        </div>

        <!-- SHOP 11 (NEW) -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" />
                <div class="badge-row">
                    <span class="badge featured">Hot Deals</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Pizza Hub</h3>
                <p>Cheesy pizzas & Italian meals</p>
                <div class="shop-info">
                    <span>⏱️ 25-35 min</span>
                    <span>📍 1.8 km</span>
                    <span>🚚 ₹29</span>
                </div>
                <div class="rating">⭐ 4.6</div>
            </div>
        </div>

        <!-- SHOP 12 (NEW) -->
        <div class="shop-card">
            <div class="shop-image">
                <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352" />
                <div class="badge-row">
                    <span class="badge featured">New</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>
            <div class="shop-content">
                <h3>Green Leaf</h3>
                <p>Fresh salads & healthy bowls</p>
                <div class="shop-info">
                    <span>⏱️ 15-25 min</span>
                    <span>📍 1.1 km</span>
                    <span>🚚 Free</span>
                </div>
                <div class="rating">⭐ 4.9</div>
            </div>
        </div>

    </div>
</section>

</div>
<!-- contianer-1-end -->

 <!-- container-2 -->

<div class="container-2" >
   <!-- ================= ALL SHOPS SECTION ================= -->

<div class="shops-container">

    <div class="shops-header">
        <h2>All Shops</h2>
        <p>10 shops available for delivery</p>
    </div>

    <!-- FILTER TABS -->
    <div class="shop-filters">
        <button class="filter active">All</button>
        <button class="filter">🍎 Groceries</button>
        <button class="filter">💻 Electronics</button>
        <button class="filter">👕 Fashion</button>
        <button class="filter">🍔 Food</button>
        <button class="filter">💊 Pharmacy</button>
        <button class="filter">📚 Books</button>
        <button class="filter">⚽ Sports</button>
        <button class="filter">💄 Beauty</button>
        <button class="filter dropdown">Top Rated ⌄</button>
    </div>

    <!-- SCROLL BAR UNDER FILTERS -->
    <div class="filter-scroll"></div>

    <!-- ================= SHOP CARDS GRID ================= -->
    <div class="shops-grid">

        <!-- SHOP 1 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" />
                <div class="badge-row">
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>MediCare Plus</h3>
                <p>Your health essentials delivered</p>

                <div class="shop-meta">
                    <span>⏱️ 30-45 min</span>
                    <span>📍 1.8 km</span>
                    <span>🚚 Free</span>
                </div>

                <div class="rating">⭐ 4.9</div>
            </div>
        </div>

        <!-- SHOP 2 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Fresh Mart</h3>
                <p>Your daily essentials delivered fresh</p>

                <div class="shop-meta">
                    <span>⏱️ 25-35 min</span>
                    <span>📍 1.2 km</span>
                    <span>🚚 Free</span>
                </div>

                <div class="rating">⭐ 4.8</div>
            </div>
        </div>

        <!-- SHOP 3 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>QuickBite Kitchen</h3>
                <p>Homestyle meals in minutes</p>

                <div class="shop-meta">
                    <span>⏱️ 20-30 min</span>
                    <span>📍 0.8 km</span>
                    <span>🚚 Free</span>
                </div>

                <div class="rating">⭐ 4.7</div>
            </div>
        </div>

        <!-- SHOP 4 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Bake House</h3>
                <p>Freshly baked breads & cakes</p>

                <div class="shop-meta">
                    <span>⏱️ 20-40 min</span>
                    <span>📍 1.5 km</span>
                    <span>🚚 Free</span>
                </div>

                <div class="rating">⭐ 4.9</div>
            </div>
        </div>

        <!-- SHOP 5 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1520975918318-3b1c9c8b22b8" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Style Hub</h3>
                <p>Trendy fashion & accessories</p>

                <div class="shop-meta">
                    <span>⏱️ 45-55 min</span>
                    <span>📍 3.2 km</span>
                    <span>🚚 ₹29</span>
                </div>

                <div class="rating">⭐ 4.5</div>
            </div>
        </div>

        <!-- SHOP 6 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1611095564632-d5e9c976a6f1" />
                <div class="badge-row">
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Pet Palace</h3>
                <p>Food & essentials for pets</p>

                <div class="shop-meta">
                    <span>⏱️ 30-45 min</span>
                    <span>📍 2.0 km</span>
                    <span>🚚 ₹19</span>
                </div>

                <div class="rating">⭐ 4.7</div>
            </div>
        </div>

        <!-- SHOP 7 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1556742400-b5c80b5e84f2" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Juice Corner</h3>
                <p>Fresh juices & smoothies</p>

                <div class="shop-meta">
                    <span>⏱️ 10-20 min</span>
                    <span>📍 0.5 km</span>
                    <span>🚚 Free</span>
                </div>

                <div class="rating">⭐ 4.8</div>
            </div>
        </div>

        <!-- SHOP 8 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Pizza Hub</h3>
                <p>Delicious pizzas & sides</p>

                <div class="shop-meta">
                    <span>⏱️ 25-35 min</span>
                    <span>📍 1.8 km</span>
                    <span>🚚 ₹29</span>
                </div>

                <div class="rating">⭐ 4.6</div>
            </div>
        </div>

        <!-- SHOP 9 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1470338745628-171cf53de3aa" />
                <div class="badge-row">
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Book World</h3>
                <p>Books, novels & study material</p>

                <div class="shop-meta">
                    <span>⏱️ 15-25 min</span>
                    <span>📍 0.6 km</span>
                    <span>🚚 Free</span>
                </div>

                <div class="rating">⭐ 4.8</div>
            </div>
        </div>

        <!-- SHOP 10 -->
        <div class="shop-card">
            <div class="shop-img">
                <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352" />
                <div class="badge-row">
                    <span class="badge featured">Featured</span>
                    <span class="badge free">Free Delivery</span>
                    <span class="badge open">● Open</span>
                </div>
            </div>

            <div class="shop-info-box">
                <h3>Green Leaf</h3>
                <p>Healthy salads & bowls</p>

                <div class="shop-meta">
                    <span>⏱️ 15-25 min</span>
                    <span>📍 1.1 km</span>
                    <span>🚚 Free</span>
                </div>

                <div class="rating">⭐ 4.9</div>
            </div>
        </div>

    </div>
</div>

</div>

<!-- container-3 -->
<div class="container-3" >
  
    <!-- <section class="banner-section">
    <button class="back-btn">← Back</button>

    <div class="banner-img"></div>

    <div class="restaurant-card">
        <div class="left-info">
            <img src="https://media.istockphoto.com/id/2163171014/photo/commercial-kitchen.jpg?s=2048x2048&w=is&k=20&c=QE2vkIR_NfHPoob2y_iF5dAbRwn6gnZVwB53NWfMEEs=" class="rest-logo">

            <div class="details">
                <h2 class="rest-title">
                    QuickBite Kitchen
                    <span class="open-badge">Open</span>
                </h2>
                <p class="rest-sub">Homestyle meals in minutes</p>

                <div class="meta-row">
                    <span class="meta-item">⏱ 20-30 min</span>
                    <span class="meta-item">📍 0.8 km</span>
                    <span class="meta-item">🚚 Free Delivery</span>
                </div>

                <span class="food-tag">Food</span>
            </div>
        </div>

        <div class="rating-box">
            ⭐ 4.7 <span class="reviews">(3,241 reviews)</span>
        </div>
    </div>
</section>


<section class="section-title">Main Course</section>

<div class="menu-grid">
    <div class="menu-card">
        <img src="https://images.unsplash.com/photo-1707616954324-99c89a78a20d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="menu-img">
        <h3 class="menu-title">Butter Chicken Meal</h3>
        <p class="menu-desc">Creamy butter chicken with naan</p>
        <div class="menu-rating">⭐ 4 (0)</div>

        <div class="price-row">
            <span class="menu-price">₹249</span>
            <button class="add-btn">+ Add</button>
        </div>
    </div>

    <div class="menu-card">
        <img src="https://media.istockphoto.com/id/1393066617/photo/veg-biryani.jpg?s=2048x2048&w=is&k=20&c=8GCQx9bM8jzakh7fd6lZKsp2riR5RZdhc84HGRecEV4=" class="menu-img">
        <h3 class="menu-title">Veg Biryani</h3>
        <p class="menu-desc">Aromatic vegetable biryani</p>
        <div class="menu-rating">⭐ 4 (0)</div>

        <div class="price-row">
            <span class="menu-price">₹199</span>
            <button class="add-btn">+ Add</button>
        </div>
    </div>
</div>


<section class="section-title">Desserts</section>

<div class="menu-grid">
    <div class="menu-card">
        <img src="https://media.istockphoto.com/id/1130692246/photo/homemade-chocolate-brownies-shot-from-above.jpg?s=2048x2048&w=is&k=20&c=JAnlr9RsdNyXP-B8lXBXloNKA5PUpXqUxkRMfQRyVSg=" class="menu-img">
        <h3 class="menu-title">Chocolate Brownie</h3>
        <p class="menu-desc">Rich chocolate brownie</p>
        <div class="menu-rating">⭐ 4 (0)</div>

        <div class="price-row">
            <span class="menu-price">₹149</span>
            <button class="add-btn">+ Add</button>
        </div>
    </div>
</div> -->


</div>

<div class="container-4" >

</div>

<section class="offers-section">
  <div class="offers-header">
    <h2>Today's Best Offers</h2>
    <a href="#" class="all-offers">All Offers →</a>
  </div>
  <p class="subtitle">Don't miss out on these amazing deals</p>

  <div class="offers-container">

    <!-- Offer Card 1 -->
    <div class="offer-card green">
      <h3>50% OFF</h3>
      <p>On your first order</p>
      <div class="code-box">
        <span class="tag-icon">🏷️</span>
        <span class="code">FIRST50</span>
        <span class="tap">Tap to copy</span>
      </div>
    </div>

    <!-- Offer Card 2 -->
    <div class="offer-card orange">
      <h3>Free Delivery</h3>
      <p>On orders above ₹299</p>
      <div class="code-box">
        <span class="tag-icon">🏷️</span>
        <span class="code">FREEDEL</span>
        <span class="tap">Tap to copy</span>
      </div>
    </div>

    <!-- Offer Card 3 -->
    <div class="offer-card blue">
      <h3>20% Cashback</h3>
      <p>Pay via UPI</p>
      <div class="code-box">
        <span class="tag-icon">🏷️</span>
        <span class="code">UPI20</span>
        <span class="tap">Tap to copy</span>
      </div>
    </div>

  </div>
</section>




<!-- HOW IT WORKS -->
<section class="how-it-works">
    <h2>How It Works</h2>
    <p>Get anything delivered in 4 simple steps</p>

    <div class="steps-container">
        <div class="step-box">
            <div class="icon-box icon-blue">
                🔍
            </div>
            <h3>Browse Shops</h3>
            <p>Explore thousands of local shops and find exactly what you need</p>
        </div>

        <div class="step-line"></div>

        <div class="step-box">
            <div class="icon-box icon-green">
                🛍️
            </div>
            <h3>Add to Cart</h3>
            <p>Select your favorite products and add them to your cart</p>
        </div>

        <div class="step-line"></div>

        <div class="step-box">
            <div class="icon-box icon-purple">
                💳
            </div>
            <h3>Easy Checkout</h3>
            <p>Pay securely with multiple payment options available</p>
        </div>

        <div class="step-line"></div>

        <div class="step-box">
            <div class="icon-box icon-orange">
                📦
            </div>
            <h3>Fast Delivery</h3>
            <p>Get your order delivered to your doorstep in hours</p>
        </div>
    </div>
</section>

<!-- FOOTER -->
<footer class="footer">
    <div class="footer-container">
        <div class="footer-col">
            <h2 class="brand"><span class="brand-icon">Q</span> QuickDash</h2>
            <p>Your city's fastest delivery platform. Get anything delivered to your doorstep within hours.</p>

            <div class="social-icons">
                <span>📘</span>
                <span>🐦</span>
                <span>📸</span>
                <span>💼</span>
            </div>
        </div>

        <div class="footer-col">
            <h3>Quick Links</h3>
            <a href="#">About Us</a>
            <a href="#">How It Works</a>
            <a href="#">Partner With Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
        </div>

        <div class="footer-col">
            <h3>Support</h3>
            <a href="#">Help Center</a>
            <a href="#">FAQs</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
        </div>

        <div class="footer-col">
            <h3>Contact Us</h3>
            <p>📧 support@quickdash.com</p>
            <p>📞 +91 1800 123 4567</p>
            <p>📍 123 Business Hub, Tech Park,<br>Mumbai 400001</p>
        </div>
    </div>

    <div class="footer-bottom">
        © 2024 QuickDash. All rights reserved.
        <div class="payments">💳 VISA • MasterCard • Secure Payments</div>
    </div>
</footer>





<script src="script.js"></script>
</body>
</html>
