// src/pages/ChefDashboard.jsx
// Chef/Owner URL: http://localhost:5173/chef
// Reads "chef_orders" from localStorage — auto-polls every 4 seconds

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Flame,
  CheckCircle2,
  ArchiveX,
  Clock,
  ChefHat,
  TrendingUp,
  Users,
  IndianRupee,
} from "lucide-react";
import "../styles/chef.css";

// ── HELPERS ────────────────────────────────────────────────────────────────
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem("chef_orders")) || [];
  } catch (_) {
    return [];
  }
}
function saveOrders(orders) {
  localStorage.setItem("chef_orders", JSON.stringify(orders));
}
function timeAgo(ts) {
  const d = Math.floor((Date.now() - ts) / 1000);
  if (d < 60) return d + "s ago";
  if (d < 3600) return Math.floor(d / 60) + "m ago";
  return Math.floor(d / 3600) + "h ago";
}
function todayRevenue(orders) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return orders
    .filter((o) => o.placedAt >= start.getTime())
    .reduce((s, o) => s + o.total, 0);
}

// ── STAT CARD ─────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color, index }) {
  return (
    <motion.div
      className={"stat-card stat-card--" + color}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
    >
      <div className={"stat-icon stat-icon--" + color}>
        <Icon size={20} />
      </div>
      <div>
        <p className="stat-val">{value}</p>
        <p className="stat-lbl">{label}</p>
      </div>
    </motion.div>
  );
}

// ── ORDER CARD ─────────────────────────────────────────────────────────────
function OrderCard({ order, onMarkReady, onMarkDone, index }) {
  const isUrgent =
    order.status === "cooking" && order.endTime < Date.now() + 3 * 60 * 1000;
  return (
    <motion.div
      className={
        "order-card" +
        (isUrgent ? " order-card--urgent" : "") +
        (order.status === "ready" ? " order-card--ready" : "") +
        (order.status === "done" ? " order-card--done" : "")
      }
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: order.status === "done" ? 30 : -30 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
      }}
      layout
    >
      {/* Header */}
      <div className="ocard-head">
        <span className="ocard-table">{order.tableId}</span>
        <div className="ocard-head-right">
          {isUrgent && order.status === "cooking" && (
            <span className="ocard-urgent-badge">URGENT</span>
          )}
          {order.status === "ready" && (
            <span className="ocard-ready-badge">READY</span>
          )}
          <span className="ocard-time">
            <Clock size={11} /> {timeAgo(order.placedAt)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="ocard-items">
        {order.items.map(({ item, qty }) => (
          <div key={item.id} className="ocard-item">
            <span className="ocard-item-name">{item.name}</span>
            <span className="ocard-item-qty">x{qty}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="ocard-footer">
        <span className="ocard-total">
          <IndianRupee size={12} />
          {order.total}
        </span>
        <div className="ocard-actions">
          {order.status === "cooking" && (
            <button
              className="ocard-btn ocard-btn--ready"
              onClick={() => onMarkReady(order.orderId)}
            >
              Mark Ready
            </button>
          )}
          {order.status === "ready" && (
            <button
              className="ocard-btn ocard-btn--done"
              onClick={() => onMarkDone(order.orderId)}
            >
              Served ✓
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function ChefDashboard() {
  const [orders, setOrders] = useState(getOrders);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Poll every 4 seconds for new customer orders
  useEffect(() => {
    const t = setInterval(() => {
      setOrders(getOrders());
      setLastRefresh(Date.now());
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const markReady = (id) => {
    const u = orders.map((o) =>
      o.orderId === id ? { ...o, status: "ready" } : o,
    );
    saveOrders(u);
    setOrders(u);
  };
  const markDone = (id) => {
    const u = orders.map((o) =>
      o.orderId === id ? { ...o, status: "done" } : o,
    );
    saveOrders(u);
    setOrders(u);
  };
  const clearDone = () => {
    const u = orders.filter((o) => o.status !== "done");
    saveOrders(u);
    setOrders(u);
  };

  const cooking = orders.filter((o) => o.status === "cooking");
  const ready = orders.filter((o) => o.status === "ready");
  const done = orders.filter((o) => o.status === "done");
  const revenue = todayRevenue(orders);

  return (
    <div className="chef-shell">
      {/* ── TOP HEADER ─────────────────────────────────────── */}
      <header className="chef-header">
        <div className="chef-header-brand">
          <div className="chef-logo">
            <ChefHat size={22} />
          </div>
          <div>
            <h1 className="chef-title">Kitchen Display</h1>
            <p className="chef-sub">Live order management</p>
          </div>
        </div>

        <div className="chef-pulse">
          <span className="pulse-dot" />
          <span className="pulse-label">Live</span>
        </div>
      </header>

      {/* ── STATS ROW ──────────────────────────────────────── */}
      <div className="stats-row">
        <StatCard
          icon={Flame}
          label="Cooking"
          value={cooking.length}
          color="fire"
          index={0}
        />
        <StatCard
          icon={CheckCircle2}
          label="Ready"
          value={ready.length}
          color="green"
          index={1}
        />
        <StatCard
          icon={Users}
          label="Served Today"
          value={done.length}
          color="blue"
          index={2}
        />
        <StatCard
          icon={TrendingUp}
          label="Today Revenue"
          value={"₹" + revenue}
          color="gold"
          index={3}
        />
      </div>

      {/* ── KANBAN BOARD ───────────────────────────────────── */}
      <div className="chef-board">
        {/* COOKING */}
        <div className="chef-col">
          <div className="col-header col-header--fire">
            <Flame size={15} /> Cooking
            <span className="col-count">{cooking.length}</span>
          </div>
          <div className="col-cards">
            <AnimatePresence>
              {cooking.length === 0 && (
                <motion.p
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No active orders
                </motion.p>
              )}
              {cooking.map((order, i) => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  onMarkReady={markReady}
                  onMarkDone={markDone}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* READY */}
        <div className="chef-col">
          <div className="col-header col-header--green">
            <CheckCircle2 size={15} /> Ready to Serve
            <span className="col-count">{ready.length}</span>
          </div>
          <div className="col-cards">
            <AnimatePresence>
              {ready.length === 0 && (
                <motion.p
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Nothing ready yet
                </motion.p>
              )}
              {ready.map((order, i) => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  onMarkReady={markReady}
                  onMarkDone={markDone}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* DONE */}
        <div className="chef-col">
          <div className="col-header col-header--muted">
            <ArchiveX size={15} /> Served
            <span className="col-count">{done.length}</span>
            {done.length > 0 && (
              <button className="btn-clear" onClick={clearDone}>
                Clear
              </button>
            )}
          </div>
          <div className="col-cards">
            {done.length === 0 && <p className="empty-state">—</p>}
            <AnimatePresence>
              {done
                .slice()
                .reverse()
                .slice(0, 6)
                .map((order, i) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    onMarkReady={markReady}
                    onMarkDone={markDone}
                    index={i}
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="chef-footer">
        <span className="footer-dot" />
        Auto-refreshes every 4 seconds &nbsp;·&nbsp; {orders.length} total
        orders today
      </footer>
    </div>
  );
}
