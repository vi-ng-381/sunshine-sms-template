const { useState, useEffect } = React;

const TODAY = new Date().toLocaleDateString("en-AU");

const MENU = {
  riceBowls: {
    label: "Rice bowls", icon: "ti-bowl-rice", askSize: true, askSauce: true, askSeasoning: true,
    items: [
      { id: "beef_bowl", name: "Beef bowl", prices: { S: 14.5, L: 16.5 } },
      { id: "lamb_bowl", name: "Lamb bowl", prices: { S: 14.5, L: 16.5 } },
      { id: "chicken_wing_bowl", name: "Chicken wing bowl", prices: { S: 15.9, L: 17.9 } },
      { id: "squid_bowl", name: "Squid bowl (Fri–Sun only)", prices: { L: 19.5 }, noSmall: true },
    ],
  },
  sides: {
    label: "On the side", icon: "ti-plus",
    items: [
      { id: "tare_sauce", name: "House-made tare sauce", prices: { one: 2 } },
      { id: "spicy_mayo", name: "Spicy mayo", prices: { one: 2 } },
      { id: "pickled_radish", name: "Pickled radish", prices: { one: 2 } },
      { id: "extra_spices", name: "Extra spices", prices: { one: 2 } },
    ],
  },
  melts: {
    label: "Melts", icon: "ti-sandwich", note: "served with potato chips",
    items: [
      { id: "pastrami_melt", name: "Pastrami melt", prices: { one: 14 } },
      { id: "cheesy_tuna_melt", name: "Cheesy tuna melt", prices: { one: 14 } },
      { id: "smokey_pesto_melt", name: "Smokey pesto melt", prices: { one: 14 } },
      { id: "ham_cheese_melt", name: "Ham cheese melt", prices: { one: 8 } },
    ],
  },
  bites: {
    label: "Bites & sides", icon: "ti-drumstick", askSpice: true,
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
    label: "Combo deal", icon: "ti-discount",
    items: [{ id: "combo", name: "Fries + Any small refreshment", prices: { one: 8 } }],
  },
  matcha: {
    label: "Kohiki matcha", icon: "ti-cup", askSize: true,
    items: [
      { id: "iced_matcha", name: "Iced matcha", prices: { S: 7.5, L: 9.5 } },
      { id: "iced_strawberry_matcha", name: "Iced strawberry matcha", prices: { S: 8.5, L: 10.5 } },
      { id: "iced_jasmine_matcha", name: "Iced jasmine matcha", prices: { S: 8.5, L: 10.5 } },
      { id: "iced_coconut_matcha", name: "Iced coconut matcha", prices: { S: 8.5, L: 10.5 } },
    ],
  },
  refreshments: {
    label: "Refreshments", icon: "ti-glass", askSize: true,
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
    label: "Toppings", icon: "ti-leaf",
    items: [
      { id: "aloe_vera", name: "Aloe vera", prices: { one: 0.8 } },
      { id: "lychee_popping_pearls", name: "Lychee popping pearls", prices: { one: 0.8 } },
      { id: "rainbow_jelly", name: "Rainbow jelly", prices: { one: 0.8 } },
      { id: "herbal_jelly", name: "Herbal jelly", prices: { one: 0.8 } },
    ],
  },
};

function getPrice(item, size) {
  if (item.prices.one !== undefined) return item.prices.one;
  return item.prices[size] || 0;
}

function App() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState("pickup");
  const [orderItems, setOrderItems] = useState([]);
  const [notes, setNotes] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    if (dark) {
      document.body.style.background = "#111";
      document.documentElement.style.setProperty("--color-background-primary", "#1e1e1e");
      document.documentElement.style.setProperty("--color-background-secondary", "#2a2a2a");
      document.documentElement.style.setProperty("--color-text-primary", "#f0f0f0");
      document.documentElement.style.setProperty("--color-text-secondary", "#aaaaaa");
      document.documentElement.style.setProperty("--color-text-tertiary", "#666666");
      document.documentElement.style.setProperty("--color-text-danger", "#ff6b6b");
      document.documentElement.style.setProperty("--color-border-secondary", "#444444");
      document.documentElement.style.setProperty("--color-border-tertiary", "#333333");
    } else {
      document.body.style.background = "#f5f5f5";
      document.documentElement.style.setProperty("--color-background-primary", "#ffffff");
      document.documentElement.style.setProperty("--color-background-secondary", "#f7f7f7");
      document.documentElement.style.setProperty("--color-text-primary", "#222222");
      document.documentElement.style.setProperty("--color-text-secondary", "#666666");
      document.documentElement.style.setProperty("--color-text-tertiary", "#999999");
      document.documentElement.style.setProperty("--color-text-danger", "#c62828");
      document.documentElement.style.setProperty("--color-border-secondary", "#cccccc");
      document.documentElement.style.setProperty("--color-border-tertiary", "#e5e5e5");
    }
  }, [dark]);

  const addItem = (item, cat) => {
    const hasSize = cat.askSize;
    const hasSauce = cat.askSauce;
    const hasSeasoning = cat.askSeasoning;
    const hasSpice = cat.askSpice;
    const defaultSize = item.noSmall ? "L" : (hasSize ? "S" : null);
    setOrderItems(prev => [...prev, {
      id: Date.now() + Math.random(),
      itemId: item.id, name: item.name, category: cat.label,
      size: defaultSize,
      sauce: hasSauce ? "Tare" : null,
      seasoning: hasSeasoning ? "Cumin" : null,
      spice: hasSpice ? "Cumin" : null,
      qty: 1, baseItem: item,
      hasSize, hasSauce, hasSeasoning, hasSpice,
    }]);
  };

  const removeItem = (id) => setOrderItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id, field, value) => setOrderItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  const total = orderItems.reduce((sum, i) => sum + getPrice(i.baseItem, i.size) * i.qty, 0);

  const buildSummary = () => {
    let lines = [];
    lines.push(`ORDER SUMMARY — ${TODAY}`);
    lines.push(`Customer: ${customerName || "—"}  |  Phone: ${customerPhone || "—"}`);
    lines.push(`Order type: ${orderType === "pickup" ? "Pick up" : "Dine in"}`);
    lines.push("─".repeat(40));
    orderItems.forEach(i => {
      let detail = i.name;
      let extras = [];
      if (i.size) extras.push(i.size === "S" ? "Small" : "Large");
      if (i.sauce) extras.push(`Sauce: ${i.sauce}`);
      if (i.seasoning) extras.push(`Seasoning: ${i.seasoning}`);
      if (i.spice) extras.push(`Spice: ${i.spice}`);
      if (extras.length) detail += ` (${extras.join(", ")})`;
      const price = getPrice(i.baseItem, i.size);
      lines.push(`x${i.qty}  ${detail}  —  $${(price * i.qty).toFixed(2)}`);
    });
    lines.push("─".repeat(40));
    lines.push(`TOTAL: $${total.toFixed(2)}`);
    if (notes) lines.push(`Notes: ${notes}`);
    return lines.join("\n");
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      alert("Order copied!");
    } catch (err) {
      const textarea = document.createElement("textarea");
      textarea.value = buildSummary();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Order copied!");
    }
  };

  // Compact style tokens
  const card = {
    background: "var(--color-background-primary)",
    border: "0.5px solid var(--color-border-tertiary)",
    borderRadius: 8,
    padding: "7px 10px",
    marginBottom: 5,
  };

  const secTitle = {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--color-text-secondary)",
    margin: "0 0 4px",
    display: "flex",
    alignItems: "center",
    gap: 5,
    paddingBottom: 4,
    borderBottom: "0.5px solid var(--color-border-tertiary)",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const btnAdd = {
    fontSize: 11,
    padding: "2px 7px",
    cursor: "pointer",
    background: "#EAF3DE",
    color: "#27500A",
    border: "0.5px solid #97C459",
    borderRadius: 5,
    lineHeight: 1.4,
  };

  const sel = {
    fontSize: 11,
    padding: "1px 3px",
    borderRadius: 5,
    border: "0.5px solid var(--color-border-secondary)",
    background: "var(--color-background-secondary)",
    color: "var(--color-text-primary)",
  };

  const smLabel = { fontSize: 10, color: "var(--color-text-tertiary)" };

  return (
    <div style={{ padding: "8px 0", fontFamily: "var(--font-sans)" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>
          <i className="ti ti-phone-incoming" style={{ marginRight: 6, fontSize: 13 }}></i>
          Phone order — Sugar Brush
        </span>
        <div style={{ display: "flex", gap: 5 }}>
          <button onClick={() => setDark(d => !d)} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 11, padding: "4px 8px",
            background: dark ? "#f0f0f0" : "#222", color: dark ? "#222" : "#fff",
            border: "none", borderRadius: 6, fontWeight: 500, cursor: "pointer",
          }}>
            <i className={`ti ${dark ? "ti-sun" : "ti-moon"}`}></i>
            {dark ? "Light" : "Dark"}
          </button>
          <a href="https://drive.google.com/file/d/1_eELe6FgHsTosJo9vwHHyhqw3AJq8jPk/view?usp=sharing"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 11, padding: "4px 8px",
              background: "#1E3A1E", color: "#fff",
              border: "none", borderRadius: 6, textDecoration: "none", fontWeight: 500,
            }}>
            <i className="ti ti-menu-2"></i> Menu
          </a>
        </div>
      </div>

      {/* Customer info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
        <div>
          <label style={{ ...smLabel, display: "block", marginBottom: 2 }}>Name</label>
          <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g. John"
            style={{ width: "100%", boxSizing: "border-box", fontSize: 12, padding: "5px 7px", border: "0.5px solid var(--color-border-secondary)", borderRadius: 6, background: "var(--color-background-primary)", color: "var(--color-text-primary)" }} />
        </div>
        <div>
          <label style={{ ...smLabel, display: "block", marginBottom: 2 }}>Phone</label>
          <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="0412 345 678"
            style={{ width: "100%", boxSizing: "border-box", fontSize: 12, padding: "5px 7px", border: "0.5px solid var(--color-border-secondary)", borderRadius: 6, background: "var(--color-background-primary)", color: "var(--color-text-primary)" }} />
        </div>
      </div>

      {/* Order type */}
      <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
        {["pickup", "dinein"].map(type => (
          <button key={type} onClick={() => setOrderType(type)} style={{
            flex: 1, padding: "5px", fontSize: 12, cursor: "pointer", borderRadius: 6,
            fontWeight: orderType === type ? 600 : 400,
            background: orderType === type ? (type === "pickup" ? "#EAF3DE" : "#E6F1FB") : "var(--color-background-secondary)",
            color: orderType === type ? (type === "pickup" ? "#27500A" : "#0C447C") : "var(--color-text-secondary)",
            border: orderType === type ? `0.5px solid ${type === "pickup" ? "#97C459" : "#85B7EB"}` : "0.5px solid var(--color-border-tertiary)",
          }}>
            <i className={`ti ${type === "pickup" ? "ti-shopping-bag" : "ti-armchair"}`} style={{ marginRight: 4, fontSize: 11 }}></i>
            {type === "pickup" ? "Pick up" : "Dine in"}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>

        {/* Menu */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Menu</p>
          {Object.entries(MENU).map(([key, cat]) => (
            <div key={key} style={{ ...card, marginBottom: 5 }}>
              <p style={secTitle}>
                <i className={`ti ${cat.icon}`} style={{ fontSize: 12 }}></i>
                {cat.label}
                {cat.note && <span style={{ fontSize: 10, fontWeight: 400, color: "var(--color-text-tertiary)" }}> — {cat.note}</span>}
              </p>
              {cat.askSpice && (
                <p style={{ fontSize: 10, color: "var(--color-text-tertiary)", margin: "0 0 3px" }}>
                  Spice: Sichuan 0/1/2 or Cumin
                </p>
              )}
              {cat.items.map(item => {
                const priceStr = item.prices.one !== undefined
                  ? `$${item.prices.one}`
                  : item.noSmall ? `L $${item.prices.L}`
                  : `S $${item.prices.S} / L $${item.prices.L}`;
                return (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                    <span style={{ fontSize: 12, color: "var(--color-text-primary)" }}>{item.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{priceStr}</span>
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
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Order
            {orderItems.length > 0 && <span style={{ background: "#EAF3DE", color: "#27500A", fontSize: 10, padding: "1px 6px", borderRadius: 20, marginLeft: 5 }}>{orderItems.length}</span>}
          </p>

          {orderItems.length === 0 && (
            <div style={{ ...card, textAlign: "center", padding: "1.2rem", color: "var(--color-text-tertiary)", fontSize: 12 }}>
              <i className="ti ti-shopping-cart" style={{ fontSize: 20, display: "block", marginBottom: 4 }}></i>
              No items yet
            </div>
          )}

          {orderItems.map((oi) => {
            const price = getPrice(oi.baseItem, oi.size);
            return (
              <div key={oi.id} style={{ ...card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)" }}>{oi.name}</p>
                    <p style={{ margin: 0, fontSize: 10, color: "var(--color-text-tertiary)" }}>{oi.category}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)" }}>${(price * oi.qty).toFixed(2)}</span>
                    <button onClick={() => removeItem(oi.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-danger)", padding: 0, fontSize: 13, lineHeight: 1 }}>
                      <i className="ti ti-trash"></i>
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={smLabel}>Qty</span>
                    <button onClick={() => oi.qty > 1 && updateItem(oi.id, "qty", oi.qty - 1)} style={{ ...sel, padding: "1px 6px", cursor: "pointer" }}>-</button>
                    <span style={{ fontSize: 12, fontWeight: 600, minWidth: 14, textAlign: "center" }}>{oi.qty}</span>
                    <button onClick={() => updateItem(oi.id, "qty", oi.qty + 1)} style={{ ...sel, padding: "1px 6px", cursor: "pointer" }}>+</button>
                  </div>
                  {oi.hasSize && !oi.baseItem.noSmall && (
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={smLabel}>Size</span>
                      <select value={oi.size} onChange={e => updateItem(oi.id, "size", e.target.value)} style={sel}>
                        <option value="S">S</option>
                        <option value="L">L</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSauce && (
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={smLabel}>Sauce</span>
                      <select value={oi.sauce} onChange={e => updateItem(oi.id, "sauce", e.target.value)} style={sel}>
                        <option>Tare</option>
                        <option>Soy & Mirin</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSeasoning && (
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={smLabel}>Season</span>
                      <select value={oi.seasoning} onChange={e => updateItem(oi.id, "seasoning", e.target.value)} style={sel}>
                        <option>Cumin</option>
                        <option>Sichuan</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSpice && (
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={smLabel}>Spice</span>
                      <select value={oi.spice} onChange={e => updateItem(oi.id, "spice", e.target.value)} style={sel}>
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
              <div style={{ ...card, background: "var(--color-background-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)" }}>Total</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)" }}>${total.toFixed(2)}</span>
              </div>

              <div style={{ marginBottom: 6 }}>
                <label style={{ ...smLabel, display: "block", marginBottom: 2 }}>Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special requests..." rows={2}
                  style={{ width: "100%", boxSizing: "border-box", fontSize: 12, padding: "5px 7px", border: "0.5px solid var(--color-border-secondary)", borderRadius: 6, background: "var(--color-background-primary)", color: "var(--color-text-primary)", resize: "none" }} />
              </div>

              <div style={{ display: "flex", gap: 5 }}>
                <button onClick={() => setShowSummary(!showSummary)} style={{ flex: 1, padding: "6px", fontSize: 12, cursor: "pointer", background: "#EAF3DE", color: "#27500A", border: "0.5px solid #97C459", borderRadius: 6 }}>
                  <i className="ti ti-eye" style={{ marginRight: 4 }}></i>{showSummary ? "Hide" : "View"}
                </button>
                <button onClick={copySummary} style={{ flex: 1, padding: "6px", fontSize: 12, cursor: "pointer", background: "#E6F1FB", color: "#0C447C", border: "0.5px solid #85B7EB", borderRadius: 6 }}>
                  <i className="ti ti-copy" style={{ marginRight: 4 }}></i>Copy
                </button>
                <button onClick={() => { setOrderItems([]); setCustomerName(""); setCustomerPhone(""); setNotes(""); setShowSummary(false); }}
                  style={{ padding: "6px 10px", fontSize: 12, cursor: "pointer", background: "#FCEBEB", color: "#791F1F", border: "0.5px solid #F09595", borderRadius: 6 }}>
                  <i className="ti ti-refresh"></i>
                </button>
              </div>

              {showSummary && (
                <div style={{ marginTop: 6, background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 6, padding: "8px 10px" }}>
                  <pre style={{ fontSize: 11, margin: 0, whiteSpace: "pre-wrap", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)", lineHeight: 1.5 }}>
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

const root = window.ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
