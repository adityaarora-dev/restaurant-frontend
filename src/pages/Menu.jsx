// src/pages/Menu.jsx
// REQUIRES: npm install framer-motion lucide-react
// Customer URL: http://localhost:5173/?table=3

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Minus,
  Plus,
  UtensilsCrossed,
  PartyPopper,
  ShoppingCart,
  X,
  MapPin,
} from "lucide-react";
import "../styles/menu.css";

// ── MENU DATA ──────────────────────────────────────────────────────────────
const MENU_DATA = {
  Breakfast: [
    {
      id: "b1",
      name: "Aloo Puri",
      desc: "3 pcs · golden puri with spiced aloo sabzi",
      price: 120,
    },
    {
      id: "b2",
      name: "Paneer Stuffed Paratha",
      desc: "Crisp layered paratha · pickle & curd",
      price: 90,
    },
    {
      id: "b3",
      name: "Chole Bhature",
      desc: "Fluffy bhature · tangy Punjabi chole · onion salad",
      price: 180,
    },
    {
      id: "b4",
      name: "Poha with Sev",
      desc: "Light flattened rice · mustard tempering · coriander",
      price: 70,
    },
    {
      id: "b5",
      name: "Mixed Veg Cutlet",
      desc: "Pan-fried potato patties · mint chutney",
      price: 110,
    },
    {
      id: "b6",
      name: "Bedmi Poori",
      desc: "Urad dal stuffed pooris · classic Banaras style",
      price: 130,
    },
    {
      id: "b7",
      name: "Sweet Lassi",
      desc: "Clay pot · chilled · full-cream milk · rose water",
      price: 80,
    },
  ],
  Snacks: [
    {
      id: "s1",
      name: "Hara Bhara Kabab",
      desc: "Spinach & peas patties · grilled · tamarind dip",
      price: 160,
    },
    {
      id: "s2",
      name: "Dahi Ke Sholay",
      desc: "Bread triangles · hung curd filling · golden fried",
      price: 190,
    },
    {
      id: "s3",
      name: "Crispy Corn Chaat",
      desc: "Sweet corn · peppers · chaat masala · lemon",
      price: 140,
    },
    {
      id: "s4",
      name: "Paneer Tikka Classic",
      desc: "Marinated cottage cheese · tandoor charred · 4 pcs",
      price: 220,
    },
    {
      id: "s5",
      name: "Veg Spring Rolls",
      desc: "Crispy rolls · mixed vegetables · schezwan dip",
      price: 150,
    },
    {
      id: "s6",
      name: "Chilli Mushroom",
      desc: "Indo-Chinese wok-tossed mushrooms · spring onion",
      price: 180,
    },
    {
      id: "s7",
      name: "Soya Chaap Afghani",
      desc: "Creamy malai marinade · charcoal grilled · 3 pcs",
      price: 210,
    },
  ],
  Lunch: [
    {
      id: "l1",
      name: "Dal Makhani",
      desc: "Slow-cooked overnight · black lentils · butter & cream",
      price: 220,
    },
    {
      id: "l2",
      name: "Paneer Butter Masala",
      desc: "Rich tomato gravy · cottage cheese · kasuri methi",
      price: 260,
    },
    {
      id: "l3",
      name: "Mix Veg Handi",
      desc: "Seasonal vegetables · dum cooked · mild spices",
      price: 190,
    },
    {
      id: "l4",
      name: "Jeera Rice",
      desc: "Basmati · tempered cumin · ghee finish",
      price: 140,
    },
    {
      id: "l5",
      name: "Malai Kofta",
      desc: "Paneer & potato dumplings · silky makhani sauce",
      price: 240,
    },
    {
      id: "l6",
      name: "Hyderabadi Dum Biryani",
      desc: "Aged basmati · whole spices · saffron · raita aside",
      price: 280,
    },
    {
      id: "l7",
      name: "Garlic Naan",
      desc: "2 pcs · tandoor baked · butter & fresh garlic",
      price: 90,
    },
  ],
  Dinner: [
    {
      id: "d1",
      name: "Shahi Paneer",
      desc: "Cashew & cream gravy · mild aromatic · royal prep",
      price: 250,
    },
    {
      id: "d2",
      name: "Kadhai Paneer",
      desc: "Bell peppers · onion · bold kadhai masala",
      price: 260,
    },
    {
      id: "d3",
      name: "Amritsari Kulcha Combo",
      desc: "Stuffed kulcha · chole · lassi · full platter",
      price: 220,
    },
    {
      id: "d4",
      name: "Veg Pulao",
      desc: "Fragrant basmati · fresh vegetables · whole spices",
      price: 180,
    },
    {
      id: "d5",
      name: "Tandoori Roti Basket",
      desc: "4 pcs whole wheat roti · hand-patted · live tandoor",
      price: 140,
    },
    {
      id: "d6",
      name: "Gulab Jamun",
      desc: "2 pcs · khoya dumplings · warm rose sugar syrup",
      price: 90,
    },
    {
      id: "d7",
      name: "Sizzling Brownie",
      desc: "Warm chocolate brownie · vanilla ice cream · caramel",
      price: 160,
    },
  ],
};

const CATEGORIES = Object.keys(MENU_DATA);
const TABLE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ── HELPERS ────────────────────────────────────────────────────────────────
function getTableId() {
  const p = new URLSearchParams(window.location.search);
  const n = Number(p.get("table"));
  return !isNaN(n) && n >= 1 && n <= 10 ? "Table " + n : "Table 0";
}
function getActiveOrderCount() {
  try {
    const all = JSON.parse(localStorage.getItem("chef_orders")) || [];
    return all.filter((o) => o.status === "cooking" && o.endTime > Date.now())
      .length;
  } catch (_) {
    return 0;
  }
}
function calcWaitTime() {
  return Math.floor(Math.random() * 5) + 5 + getActiveOrderCount() * 3;
}
function getQueuePosition(placedAt) {
  let pos = 1;
  try {
    const all = JSON.parse(localStorage.getItem("chef_orders")) || [];
    all.forEach((o) => {
      if (o.status === "cooking" && o.placedAt < placedAt) pos++;
    });
  } catch (_) {}
  return pos;
}
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function pushOrderToChef(order) {
  try {
    const ex = JSON.parse(localStorage.getItem("chef_orders")) || [];
    ex.push(order);
    localStorage.setItem("chef_orders", JSON.stringify(ex));
  } catch (_) {}
}

// ── TABLE SELECTOR POPUP ───────────────────────────────────────────────────
// Shown when "Order more items" is clicked from tracking screen
function TableSelector({ onSelect }) {
  return (
    <motion.div
      className="ack-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="table-selector-card"
        initial={{ scale: 0.78, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <div className="ts-header">
          <MapPin size={20} className="ts-icon" />
          <div>
            <h2 className="ts-title">Select Your Table</h2>
            <p className="ts-sub">Which table are you sitting at?</p>
          </div>
        </div>

        <div className="ts-grid">
          {TABLE_NUMBERS.map((n) => (
            <motion.button
              key={n}
              className="ts-btn"
              onClick={() => onSelect(n)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.12 }}
            >
              {n}
            </motion.button>
          ))}
        </div>

        <p className="ts-note">
          This will start a fresh order for the selected table
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── FLOATING CART BUBBLE ───────────────────────────────────────────────────
// Always visible top-right when cart has items; opens a mini cart drawer
function FloatingCart({ cartEntries, totalItems, totalPrice, onPlace }) {
  const [open, setOpen] = useState(false);

  // Close on outside click
  const overlayRef = useRef(null);

  if (totalItems === 0) return null;

  return (
    <>
      {/* The bubble button */}
      <motion.button
        className="float-cart-btn"
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        title="View cart"
      >
        <ShoppingCart size={20} />
        <span className="float-cart-count">{totalItems}</span>
      </motion.button>

      {/* Mini cart panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              className="float-cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="float-cart-panel"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="fcp-header">
                <span className="fcp-title">Your Cart</span>
                <button className="fcp-close" onClick={() => setOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <div className="fcp-items">
                {cartEntries.map(({ item, qty }) => (
                  <div key={item.id} className="fcp-item">
                    <span className="fcp-item-name">{item.name}</span>
                    <span className="fcp-item-right">
                      <span className="fcp-item-qty">x{qty}</span>
                      <span className="fcp-item-price">
                        &#8377;{item.price * qty}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="fcp-footer">
                <div className="fcp-total">
                  <span>Total</span>
                  <span>&#8377;{totalPrice}</span>
                </div>
                <motion.button
                  className="fcp-place-btn"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setOpen(false);
                    onPlace();
                  }}
                >
                  Place Order <ChevronRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── ACK POPUP ─────────────────────────────────────────────────────────────
function AckPopup({ tableId, waitMins, itemCount, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <motion.div
      className="ack-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="ack-card"
        initial={{ scale: 0.72, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        <motion.div
          className="ack-icon-wrap"
          animate={{ rotate: [0, -12, 12, -7, 7, 0] }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <PartyPopper size={40} className="ack-icon" />
        </motion.div>
        <h2 className="ack-title">Order Placed!</h2>
        <p className="ack-table">{tableId}</p>
        <div className="ack-stats">
          <div className="ack-stat">
            <span className="ack-stat-val">{itemCount}</span>
            <span className="ack-stat-lbl">
              {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="ack-stat-sep" />
          <div className="ack-stat">
            <span className="ack-stat-val">~{waitMins}m</span>
            <span className="ack-stat-lbl">wait time</span>
          </div>
        </div>
        <p className="ack-msg">
          Your order is with the kitchen. Sit back and relax!
        </p>
        <div className="ack-bar-track">
          <motion.div
            className="ack-bar-fill"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 4.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── MENU ITEM ──────────────────────────────────────────────────────────────
function MenuItem({ item, qty, onAdd, onRemove, index }) {
  return (
    <motion.div
      className="menu-item"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.038,
        duration: 0.32,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <div className="item-info">
        <span className="item-name">{item.name}</span>
        <span className="item-desc">{item.desc}</span>
        <span className="item-price">&#8377;{item.price}</span>
      </div>
      <div className="item-controls">
        {qty === 0 ? (
          <motion.button
            className="btn-add"
            onClick={() => onAdd(item)}
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={13} strokeWidth={2.8} /> Add
          </motion.button>
        ) : (
          <div className="qty-control">
            <motion.button
              className="qty-btn"
              onClick={() => onRemove(item)}
              whileTap={{ scale: 0.85 }}
            >
              <Minus size={13} strokeWidth={2.5} />
            </motion.button>
            <span className="qty-number">{qty}</span>
            <motion.button
              className="qty-btn"
              onClick={() => onAdd(item)}
              whileTap={{ scale: 0.85 }}
            >
              <Plus size={13} strokeWidth={2.5} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── CATEGORY BAR ──────────────────────────────────────────────────────────
function CategoryBar({ active, onSelect }) {
  return (
    <div className="category-bar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={"cat-pill" + (active === cat ? " cat-pill--active" : "")}
          onClick={() => onSelect(cat)}
        >
          {active === cat && (
            <motion.div
              className="pill-bg"
              layoutId="pillBg"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            />
          )}
          <span className="pill-text">{cat}</span>
        </button>
      ))}
    </div>
  );
}

// ── BOTTOM CART BAR ────────────────────────────────────────────────────────
function CartBar({ total, itemCount, cartEntries, onPlace }) {
  return (
    <AnimatePresence>
      {total > 0 && (
        <motion.div
          className="cart-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
        >
          <div className="cart-left">
            <span className="cart-count">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <span className="cart-total">&#8377;{total}</span>
          </div>
          <div className="cart-items-preview">
            {cartEntries.slice(0, 4).map(({ item, qty }) => (
              <span key={item.id} className="cart-chip">
                {item.name} x{qty}
              </span>
            ))}
            {cartEntries.length > 4 && (
              <span className="cart-chip">+{cartEntries.length - 4} more</span>
            )}
          </div>
          <div className="cart-right">
            <motion.button
              className="btn-place"
              onClick={onPlace}
              whileTap={{ scale: 0.96 }}
            >
              Place Order <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── COUNTDOWN ─────────────────────────────────────────────────────────────
function CountdownTimer({ endTime }) {
  const totalRef = useRef(
    Math.max(1, Math.floor((endTime - Date.now()) / 1000)),
  );
  const [secsLeft, setSecsLeft] = useState(() => {
    const d = Math.floor((endTime - Date.now()) / 1000);
    return d > 0 ? d : 0;
  });
  useEffect(() => {
    if (secsLeft <= 0) return;
    const t = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [endTime]);
  const mins = Math.floor(secsLeft / 60);
  const secs = secsLeft % 60;
  const done = secsLeft === 0;
  const pct = done ? 0 : (secsLeft / totalRef.current) * 100;
  return (
    <div className={"countdown" + (done ? " countdown--done" : "")}>
      <div className="countdown-row">
        {done ? (
          <span className="done-label">
            <CheckCircle size={16} /> Your order is ready!
          </span>
        ) : (
          <>
            <Clock size={14} />
            <span>
              {mins}m {String(secs).padStart(2, "0")}s remaining
            </span>
          </>
        )}
      </div>
      {!done && (
        <div className="cdown-track">
          <div className="cdown-fill" style={{ width: pct + "%" }} />
        </div>
      )}
    </div>
  );
}

// ── TRACKING SCREEN ────────────────────────────────────────────────────────
function TrackingScreen({ tableId, order, onOrderMore }) {
  const queuePos = getQueuePosition(order.placedAt);
  return (
    <motion.div
      className="tracking-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="tracking-band">
        <UtensilsCrossed size={28} />
        <div>
          <h1 className="tracking-title">Order Received</h1>
          <p className="tracking-table">{tableId}</p>
        </div>
      </div>
      <div className="tracking-body">
        <div className="tracking-left">
          <div className="queue-block">
            <span className="queue-pos">{ordinal(queuePos)}</span>
            <p className="queue-label">in the kitchen queue</p>
          </div>
          <CountdownTimer endTime={order.endTime} />
          {/* "Order more" now triggers table selector */}
          <button className="btn-new-order" onClick={onOrderMore}>
            &#8592; Order more items
          </button>
        </div>
        <div className="tracking-right">
          <div className="order-summary">
            <p className="summary-heading">Your order</p>
            {order.items.map(({ item, qty }) => (
              <div key={item.id} className="summary-row">
                <span>
                  {item.name} x {qty}
                </span>
                <span>&#8377;{item.price * qty}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>&#8377;{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function Menu() {
  const tableId = getTableId();
  const storageKey = "order_" + tableId.replace(" ", "_").toLowerCase();

  const [cart, setCart] = useState({});
  const [view, setView] = useState("menu");
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [showAck, setShowAck] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [showTableSelector, setShowTableSelector] = useState(false);
  const sectionRefs = useRef({});

  // Restore persisted order
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && saved.status === "cooking" && saved.endTime > Date.now()) {
        setActiveOrder(saved);
        setView("tracking");
      }
    } catch (_) {}
  }, [storageKey]);

  // Scroll-spy
  useEffect(() => {
    if (view !== "menu") return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveCategory(e.target.dataset.category);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [view]);

  const addItem = (item) =>
    setCart((p) => ({
      ...p,
      [item.id]: { item, qty: (p[item.id]?.qty ?? 0) + 1 },
    }));
  const removeItem = (item) =>
    setCart((p) => {
      if ((p[item.id]?.qty ?? 0) <= 1) {
        const n = { ...p };
        delete n[item.id];
        return n;
      }
      return { ...p, [item.id]: { item, qty: p[item.id].qty - 1 } };
    });

  const cartEntries = Object.values(cart);
  const totalItems = cartEntries.reduce((s, e) => s + e.qty, 0);
  const totalPrice = cartEntries.reduce((s, e) => s + e.item.price * e.qty, 0);

  const placeOrder = () => {
    const waitMins = calcWaitTime();
    const placedAt = Date.now();
    const orderData = {
      orderId: "ORD-" + placedAt,
      tableId,
      items: cartEntries,
      total: totalPrice,
      waitMins,
      placedAt,
      endTime: placedAt + waitMins * 60 * 1000,
      status: "cooking",
    };
    localStorage.setItem(storageKey, JSON.stringify(orderData));
    pushOrderToChef(orderData);
    setPendingOrder(orderData);
    setCart({});
    setShowAck(true);
  };

  // When "Order more items" is clicked on tracking screen
  const handleOrderMore = () => {
    setShowTableSelector(true);
  };

  // When a table is selected from the picker
  const handleTableSelect = (tableNum) => {
    // Change URL to new table
    window.location.href = window.location.pathname + "?table=" + tableNum;
    // This causes a full page reload which:
    // 1. Sets the new table ID from URL
    // 2. Checks localStorage for that table's order
    // 3. If no active order → shows menu fresh
    // 4. If active order → shows tracking for that table
  };

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {/* TRACKING VIEW */}
        {view === "tracking" && activeOrder && (
          <TrackingScreen
            key="tracking"
            tableId={tableId}
            order={activeOrder}
            onOrderMore={handleOrderMore}
          />
        )}

        {/* MENU VIEW */}
        {view === "menu" && (
          <motion.div
            key="menu"
            className="menu-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <header className="menu-header">
              <div className="header-left">
                <div className="header-table-badge">{tableId}</div>
                <h1 className="menu-brand">The Kitchen</h1>
                <p className="menu-tagline">
                  Fresh &middot; Seasonal &middot; North Indian
                </p>
              </div>
              <div className="header-right">
                <div className="header-meta">
                  <p className="header-meta-label">Items in cart</p>
                  <p className="header-meta-val">
                    {totalItems > 0 ? totalItems + " items" : "\u2014"}
                  </p>
                </div>
              </div>
            </header>

            <CategoryBar
              active={activeCategory}
              onSelect={(cat) => {
                setActiveCategory(cat);
                sectionRefs.current[cat]?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            />

            <main className="menu-body">
              {CATEGORIES.map((cat) => (
                <section
                  key={cat}
                  data-category={cat}
                  ref={(el) => (sectionRefs.current[cat] = el)}
                  className="menu-section"
                >
                  <h2 className="section-title">{cat}</h2>
                  <div className="section-items">
                    {MENU_DATA[cat].map((item, i) => (
                      <MenuItem
                        key={item.id}
                        item={item}
                        qty={cart[item.id]?.qty ?? 0}
                        onAdd={addItem}
                        onRemove={removeItem}
                        index={i}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </main>

            {/* Floating cart bubble — always on top-right */}
            <AnimatePresence>
              {totalItems > 0 && (
                <FloatingCart
                  cartEntries={cartEntries}
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                  onPlace={placeOrder}
                />
              )}
            </AnimatePresence>

            {/* Bottom cart bar */}
            <CartBar
              total={totalPrice}
              itemCount={totalItems}
              cartEntries={cartEntries}
              onPlace={placeOrder}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACK POPUP */}
      <AnimatePresence>
        {showAck && pendingOrder && (
          <AckPopup
            key="ack"
            tableId={tableId}
            waitMins={pendingOrder.waitMins}
            itemCount={pendingOrder.items.reduce((s, e) => s + e.qty, 0)}
            onClose={() => {
              setShowAck(false);
              setActiveOrder(pendingOrder);
              setView("tracking");
            }}
          />
        )}
      </AnimatePresence>

      {/* TABLE SELECTOR POPUP */}
      <AnimatePresence>
        {showTableSelector && (
          <TableSelector key="table-sel" onSelect={handleTableSelect} />
        )}
      </AnimatePresence>
    </div>
  );
}
