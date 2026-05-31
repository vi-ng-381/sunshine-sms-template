import { useState, useEffect } from "react";

const TODAY = new Date().toLocaleDateString("en-AU");

const MENU = {
  riceBowls: {
    label: "Rice bowls", icon: "🍚", askSize: true, askSauce: true, askSeasoning: true,
    items: [
      { id: "beef_bowl", name: "Beef bowl", prices: { S: 14.5, L: 16.5 } },
      { id: "lamb_bowl", name: "Lamb bowl", prices: { S: 14.5, L: 16.5 } },
      { id: "chicken_wing_bowl", name: "Chicken wing bowl", prices: { S: 15.9, L: 17.9 } },
      { id: "squid_bowl", name: "Squid bowl (Fri–Sun only)", prices: { L: 19.5 }, noSmall: true },
    ],
  },
  sides: {
    label: "On the side", icon: "➕",
    items: [
      { id: "tare_sauce", name: "House-made tare sauce", prices: { one: 2 } },
      { id: "spicy_mayo", name: "Spicy mayo", prices: { one: 2 } },
      { id: "pickled_radish", name: "Pickled radish", prices: { one: 2 } },
      { id: "extra_spices", name: "Extra spices", prices: { one: 2 } },
    ],
  },
  melts: {
    label: "Melts", icon: "🥪", note: "served with potato chips",
    items: [
      { id: "pastrami_melt", name: "Pastrami melt", prices: { one: 14 } },
      { id: "cheesy_tuna_melt", name: "Cheesy tuna melt", prices: { one: 14 } },
      { id: "smokey_pesto_melt", name: "Smokey pesto melt", prices: { one: 14 } },
      { id: "ham_cheese_melt", name: "Ham cheese melt", prices: { one: 8 } },
    ],
  },
  bites: {
    label: "Bites & sides", icon: "🍗", askSpice: true,
    items: [
      { id: "beef_bites", name: "Beef bites", prices: { one: 8.5 } },
      { id: "lamb_bites", name: "Lamb bites", prices: { one: 8.5 } },
      { id: "chicken_wings", name: "Chicken wings (6x)", prices: { one: 9.9 } },
      { id: "fried_squid", name: "Fried squid (Fri–Sun only)", prices: { one: 12.9 } },
      { id: "spring_rolls", name: "Spring rolls (6x)", prices: { one: 12 } },
      { id: "plum_fries", name: "Plum fries", prices: { one: 5 } },
      { id: "sweet_potato_fries", name: "Sweet potato fries", prices: { one: 7 } },
      { id: "nem_nuong", name: "Nem nuong", prices: { one: 6 } },
      { id: "bo_la_lot", name: "Bo la lot", prices: { one: 6 } },
    ],
  },
  combo: {
    label: "Combo deal", icon: "🏷️",
    items: [{ id: "combo", name: "Fries + Any small refreshment", prices: { one: 8 } }],
  },
  matcha: {
    label: "Kohiki matcha", icon: "🍵", askSize: true,
    items: [
      { id: "iced_matcha", name: "Iced matcha", prices: { S: 7.5, L: 9.5 } },
      { id: "iced_strawberry_matcha", name: "Iced strawberry matcha", prices: { S: 8.5, L: 10.5 } },
      { id: "iced_jasmine_matcha", name: "Iced jasmine matcha", prices: { S: 8.5, L: 10.5 } },
      { id: "iced_coconut_matcha", name: "Iced coconut matcha", prices: { S: 8.5, L: 10.5 } },
    ],
  },
  refreshments: {
    label: "Refreshments", icon: "🥤", askSize: true,
    items: [
      { id: "mint_lemonade", name: "Mint lemonade", prices: { S: 4.5, L: 5.7 } },
      { id: "mint_straw_lemonade", name: "Mint strawberry lemonade", prices: { S: 5.5, L: 6.7 } },
      { id: "iced_lychee", name: "Iced lychee", prices: { S: 6, L: 7.2 } },
      { id: "iced_jasmine_tea", name: "Iced jasmine tea", prices: { S: 6, L: 7.2 } },
      { id: "iced_straw_jasmine", name: "Iced strawberry jasmine tea", prices: { S: 6, L: 7.2 } },
      { id: "viet_iced_coffee", name: "Vietnamese iced coffee", prices: { S: 6, L: 8 } },
    ],
  },
  toppings: {
    label: "Toppings", icon: "🌿",
    items: [
      { id: "aloe_vera", name: "Aloe vera", prices: { one: 0.8 } },
      { id: "lychee_popping_pearls", name: "Lychee popping pearls", prices: { one: 0.8 } },
      { id: "rainbow_jelly", name: "Rainbow jelly", prices: { one: 0.8 } },
      { id: "herbal_jelly", name: "Herbal jelly", prices: { one: 0.8 } },
    ],
  },
};

const FRIES_IDS = new Set(["plum_fries", "sweet_potato_fries"]);

const REFRESHMENT_OPTIONS = [
  { id: "mint_lemonade", name: "Mint lemonade" },
  { id: "mint_straw_lemonade", name: "Mint strawberry lemonade" },
  { id: "iced_lychee", name: "Iced lychee" },
  { id: "iced_jasmine_tea", name: "Iced jasmine tea" },
  { id: "iced_straw_jasmine", name: "Iced strawberry jasmine tea" },
  { id: "viet_iced_coffee", name: "Vietnamese iced coffee" },
];

function getPrice(item, size) {
  if (item.prices.one !== undefined) return item.prices.one;
  return item.prices[size] || 0;
}

export default function App() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState("pickup");
  const [orderItems, setOrderItems] = useState([]);
  const [notes, setNotes] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [dark, setDark] = useState(false);
  const [comboPickDrink, setComboPickDrink] = useState(REFRESHMENT_OPTIONS[0].id);

  const hasFries = orderItems.some((i) => FRIES_IDS.has(i.itemId));
  const hasCombo = orderItems.some((i) => i.itemId === "combo");

  const addItem = (item, cat) => {
    const hasSize = !!cat.askSize;
    const defaultSize = item.noSmall ? "L" : hasSize ? "S" : null;
    setOrderItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        itemId: item.id,
        name: item.name,
        category: cat.label,
        size: defaultSize,
        sauce: cat.askSauce ? "Tare" : null,
        seasoning: cat.askSeasoning ? "Cumin" : null,
        spice: cat.askSpice ? "Cumin" : null,
        qty: 1,
        baseItem: item,
        hasSize,
        hasSauce: !!cat.askSauce,
        hasSeasoning: !!cat.askSeasoning,
        hasSpice: !!cat.askSpice,
      },
    ]);
  };

  const removeItem = (id) => setOrderItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id, field, value) =>
    setOrderItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const total = orderItems.reduce((sum, i) => sum + getPrice(i.baseItem, i.size) * i.qty, 0);

  const buildSummary = () => {
    const lines = [
      `ORDER SUMMARY — ${TODAY}`,
      `Customer: ${customerName || "—"}  |  Phone: ${customerPhone || "—"}`,
      `Order type: ${orderType === "pickup" ? "Pick up" : "Dine in"}`,
      "─".repeat(40),
    ];
    orderItems.forEach((i) => {
      const extras = [];
      if (i.size) extras.push(i.size === "S" ? "Small" : "Large");
      if (i.sauce) extras.push(`Sauce: ${i.sauce}`);
      if (i.seasoning) extras.push(`Seasoning: ${i.seasoning}`);
      if (i.spice) extras.push(`Spice: ${i.spice}`);
      const detail = i.name + (extras.length ? ` (${extras.join(", ")})` : "");
      const price = getPrice(i.baseItem, i.size);
      lines.push(`x${i.qty}  ${detail}  —  $${(price * i.qty).toFixed(2)}`);
    });
    lines.push("─".repeat(40));
    lines.push(`TOTAL: $${total.toFixed(2)}`);
    if (notes) lines.push(`Notes: ${notes}`);
    return lines.join("\n");
  };

  const copySummary = async () => {
    const text = buildSummary();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    alert("Order copied!");
  };

  // Inline style tokens
  const colors = dark
    ? {
        bg: "#1e1e1e", bgSec: "#2a2a2a", text: "#f0f0f0", textSec: "#aaaaaa",
        textTer: "#666666", danger: "#ff6b6b", border: "#444444", borderTer: "#333333",
      }
    : {
        bg: "#ffffff", bgSec: "#f7f7f7", text: "#222222", textSec: "#666666",
        textTer: "#999999", danger: "#c62828", border: "#cccccc", borderTer: "#e5e5e5",
      };

  const card = {
    background: colors.bg, border: `0.5px solid ${colors.borderTer}`,
    borderRadius: 8, padding: "6px 10px", marginBottom: 5,
  };
  const secTitle = {
    fontSize: 12, fontWeight: 600, color: colors.textSec, margin: "0 0 3px",
    display: "flex", alignItems: "center", gap: 5, paddingBottom: 3,
    borderBottom: `0.5px solid ${colors.borderTer}`, textTransform: "uppercase", letterSpacing: "0.04em",
  };
  const btnAdd = {
    fontSize: 13, padding: "2px 8px", cursor: "pointer",
    background: "#EAF3DE", color: "#27500A", border: "0.5px solid #97C459", borderRadius: 5, lineHeight: 1.4,
  };
  const sel = {
    fontSize: 13, padding: "2px 4px", borderRadius: 5,
    border: `0.5px solid ${colors.border}`, background: colors.bgSec, color: colors.text,
  };
  const smLabel = { fontSize: 12, color: colors.textTer };
  const inputStyle = {
    width: "100%", fontSize: 14, padding: "5px 8px",
    border: `0.5px solid ${colors.border}`, borderRadius: 6,
    background: colors.bg, color: colors.text, boxSizing: "border-box",
  };

  return (
    <div style={{ padding: "8px 4px", fontFamily: "system-ui, sans-serif", background: dark ? "#111" : "#f5f5f5", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>
          📞 Phone order — Sugar Brush
        </span>
        <div style={{ display: "flex", gap: 5 }}>
          <button onClick={() => setDark((d) => !d)} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, padding: "4px 9px", background: dark ? "#f0f0f0" : "#222", color: dark ? "#222" : "#fff", border: "none", borderRadius: 6, fontWeight: 500, cursor: "pointer" }}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <a href="https://drive.google.com/file/d/1_eELe6FgHsTosJo9vwHHyhqw3AJq8jPk/view?usp=sharing" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, padding: "4px 9px", background: "#1E3A1E", color: "#fff", border: "none", borderRadius: 6, textDecoration: "none", fontWeight: 500 }}>
            📋 Menu
          </a>
        </div>
      </div>

      {/* Customer info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
        {[["Name", "text", customerName, setCustomerName, "e.g. John"], ["Phone", "tel", customerPhone, setCustomerPhone, "0412 345 678"]].map(([lbl, type, val, set, ph]) => (
          <div key={lbl}>
            <label style={{ ...smLabel, display: "block", marginBottom: 2 }}>{lbl}</label>
            <input type={type} value={val} onChange={(e) => set(e.target.value)} placeholder={ph} style={inputStyle} />
          </div>
        ))}
      </div>

      {/* Order type */}
      <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
        {["pickup", "dinein"].map((type) => (
          <button key={type} onClick={() => setOrderType(type)} style={{
            flex: 1, padding: "5px", fontSize: 13, cursor: "pointer", borderRadius: 6,
            fontWeight: orderType === type ? 600 : 400,
            background: orderType === type ? (type === "pickup" ? "#EAF3DE" : "#E6F1FB") : colors.bgSec,
            color: orderType === type ? (type === "pickup" ? "#27500A" : "#0C447C") : colors.textSec,
            border: orderType === type ? `0.5px solid ${type === "pickup" ? "#97C459" : "#85B7EB"}` : `0.5px solid ${colors.borderTer}`,
          }}>
            {type === "pickup" ? "🛍 Pick up" : "🪑 Dine in"}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>

        {/* Menu */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textTer, margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Menu</p>
          {Object.entries(MENU).map(([key, cat]) => (
            <div key={key} style={card}>
              <p style={secTitle}>
                {cat.icon} {cat.label}
                {cat.note && <span style={{ fontSize: 11, fontWeight: 400, color: colors.textTer }}> — {cat.note}</span>}
              </p>
              {cat.askSpice && <p style={{ fontSize: 11, color: colors.textTer, margin: "0 0 3px" }}>Spice: Sichuan 0/1/2 or Cumin</p>}
              {cat.items.map((item) => {
                const priceStr =
                  item.prices.one !== undefined ? `$${item.prices.one}`
                  : item.noSmall ? `L $${item.prices.L}`
                  : `S $${item.prices.S} / L $${item.prices.L}`;
                return (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: `0.5px solid ${colors.borderTer}` }}>
                    <span style={{ fontSize: 13, color: colors.text }}>{item.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: colors.textSec }}>{priceStr}</span>
                      <button style={btnAdd} onClick={() => addItem(item, cat)}>+ Add</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Order */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textTer, margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Order
            {orderItems.length > 0 && (
              <span style={{ background: "#EAF3DE", color: "#27500A", fontSize: 11, padding: "1px 7px", borderRadius: 20, marginLeft: 5 }}>
                {orderItems.length}
              </span>
            )}
          </p>

          {/* Combo banner — shown whenever fries are in order and combo not yet applied */}
          {hasFries && !hasCombo && (
            <div style={{ ...card, background: "#FAEEDA", border: "0.5px solid #EF9F27", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#633806" }}>🏷️ Combo deal — $8</span>
              <p style={{ margin: "3px 0 6px", fontSize: 12, color: "#854F0B" }}>Pick a small refreshment to bundle:</p>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <select
                  value={comboPickDrink}
                  onChange={(e) => setComboPickDrink(e.target.value)}
                  style={{ ...sel, flex: 1, background: "#fff", border: "0.5px solid #EF9F27", color: "#633806" }}
                >
                  {REFRESHMENT_OPTIONS.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    const drinkName = REFRESHMENT_OPTIONS.find((r) => r.id === comboPickDrink)?.name;
                    const comboItem = {
                      ...MENU.combo.items[0],
                      name: `Combo: fries + ${drinkName} (S)`,
                    };
                    addItem(comboItem, MENU.combo);
                  }}
                  style={{ fontSize: 13, padding: "4px 12px", cursor: "pointer", background: "#EF9F27", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, whiteSpace: "nowrap" }}
                >
                  Apply $8
                </button>
              </div>
            </div>
          )}

          {orderItems.length === 0 && (
            <div style={{ ...card, textAlign: "center", padding: "1.2rem", color: colors.textTer, fontSize: 13 }}>
              🛒 No items yet
            </div>
          )}

          {orderItems.map((oi) => {
            const price = getPrice(oi.baseItem, oi.size);
            return (
              <div key={oi.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: colors.text }}>{oi.name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: colors.textTer }}>{oi.category}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>${(price * oi.qty).toFixed(2)}</span>
                    <button onClick={() => removeItem(oi.id)} style={{ background: "none", border: "none", cursor: "pointer", color: colors.danger, padding: 0, fontSize: 15, lineHeight: 1 }}>
                      🗑
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={smLabel}>Qty</span>
                    <button onClick={() => oi.qty > 1 && updateItem(oi.id, "qty", oi.qty - 1)} style={{ ...sel, padding: "1px 7px", cursor: "pointer" }}>-</button>
                    <span style={{ fontSize: 13, fontWeight: 600, minWidth: 16, textAlign: "center" }}>{oi.qty}</span>
                    <button onClick={() => updateItem(oi.id, "qty", oi.qty + 1)} style={{ ...sel, padding: "1px 7px", cursor: "pointer" }}>+</button>
                  </div>
                  {oi.hasSize && !oi.baseItem.noSmall && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={smLabel}>Size</span>
                      <select value={oi.size} onChange={(e) => updateItem(oi.id, "size", e.target.value)} style={sel}>
                        <option value="S">S</option>
                        <option value="L">L</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSauce && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={smLabel}>Sauce</span>
                      <select value={oi.sauce} onChange={(e) => updateItem(oi.id, "sauce", e.target.value)} style={sel}>
                        <option>Tare</option>
                        <option>Soy & Mirin</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSeasoning && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={smLabel}>Season</span>
                      <select value={oi.seasoning} onChange={(e) => updateItem(oi.id, "seasoning", e.target.value)} style={sel}>
                        <option>Cumin</option>
                        <option>Sichuan</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSpice && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={smLabel}>Spice</span>
                      <select value={oi.spice} onChange={(e) => updateItem(oi.id, "spice", e.target.value)} style={sel}>
                        <option>Cumin</option>
                        <option>Sichuan 0</option>
                        <option>Sichuan 1</option>
                        <option>Sichuan 2</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {orderItems.length > 0 && (
            <>
              <div style={{ ...card, background: colors.bgSec, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Total</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>${total.toFixed(2)}</span>
              </div>

              <div style={{ marginBottom: 6 }}>
                <label style={{ ...smLabel, display: "block", marginBottom: 2 }}>Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Special requests..." rows={2}
                  style={{ ...inputStyle, resize: "none" }} />
              </div>

              <div style={{ display: "flex", gap: 5 }}>
                <button onClick={() => setShowSummary((s) => !s)} style={{ flex: 1, padding: "6px", fontSize: 13, cursor: "pointer", background: "#EAF3DE", color: "#27500A", border: "0.5px solid #97C459", borderRadius: 6 }}>
                  👁 {showSummary ? "Hide" : "View"}
                </button>
                <button onClick={copySummary} style={{ flex: 1, padding: "6px", fontSize: 13, cursor: "pointer", background: "#E6F1FB", color: "#0C447C", border: "0.5px solid #85B7EB", borderRadius: 6 }}>
                  📋 Copy
                </button>
                <button onClick={() => { setOrderItems([]); setCustomerName(""); setCustomerPhone(""); setNotes(""); setShowSummary(false); setComboPickDrink(REFRESHMENT_OPTIONS[0].id); }}
                  style={{ padding: "6px 10px", fontSize: 13, cursor: "pointer", background: "#FCEBEB", color: "#791F1F", border: "0.5px solid #F09595", borderRadius: 6 }}>
                  🔄
                </button>
              </div>

              {showSummary && (
                <div style={{ marginTop: 6, background: colors.bgSec, border: `0.5px solid ${colors.borderTer}`, borderRadius: 6, padding: "8px 10px" }}>
                  <pre style={{ fontSize: 12, margin: 0, whiteSpace: "pre-wrap", color: colors.text, fontFamily: "monospace", lineHeight: 1.5 }}>
                    {buildSummary()}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
