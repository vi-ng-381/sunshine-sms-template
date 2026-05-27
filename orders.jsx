const { useState } = React;

const TODAY = new Date().toLocaleDateString("en-AU");

const MENU = {
  riceBowls: {
    label: "Rice bowls",
    icon: "ti-bowl-rice",
    askSize: true,
    askSauce: true,
    askSeasoning: true,
    note: "Served with sushi rice, seasonal salad, furikake, ichimi & pickled radish",
    items: [
      {
        id: "beef_bowl",
        name: "Beef bowl",
        prices: { S: 14.5, L: 16.5 },
        description: "Beef with sushi rice, seasonal salad, furikake, ichimi and pickled radish"
      },
      {
        id: "lamb_bowl",
        name: "Lamb bowl",
        prices: { S: 14.5, L: 16.5 },
        description: "Lamb with sushi rice, seasonal salad, furikake, ichimi and pickled radish"
      },
      {
        id: "chicken_wing_bowl",
        name: "Chicken wing bowl",
        prices: { S: 15.9, L: 17.9 },
        description: "Chicken wings with sushi rice, seasonal salad, furikake, ichimi and pickled radish"
      },
      {
        id: "squid_bowl",
        name: "Squid bowl (Fri–Sun only)",
        prices: { L: 19.5 },
        noSmall: true,
        description: "Fried squid with sushi rice, seasonal salad, furikake, ichimi and pickled radish"
      },
    ],
  },

  sides: {
    label: "On the side",
    icon: "ti-plus",
    items: [
      {
        id: "tare_sauce",
        name: "House-made tare sauce",
        prices: { one: 2 },
        description: "Sweet savoury house sauce"
      },
      {
        id: "spicy_mayo",
        name: "Spicy mayo",
        prices: { one: 2 },
        description: "Creamy spicy mayo sauce"
      },
      {
        id: "pickled_radish",
        name: "Pickled radish",
        prices: { one: 2 },
        description: "Crunchy pickled radish"
      },
      {
        id: "extra_spices",
        name: "Extra spices",
        prices: { one: 2 },
        description: "Extra cumin or Sichuan seasoning"
      },
    ],
  },

  melts: {
    label: "Melts",
    icon: "ti-sandwich",
    note: "Served with potato chips",
    items: [
      {
        id: "pastrami_melt",
        name: "Pastrami melt",
        prices: { one: 14 },
        description: "Sauerkraut, sourdough bread, house-made sauce, pickles, cheese & pastrami"
      },
      {
        id: "cheesy_tuna_melt",
        name: "Cheesy tuna melt",
        prices: { one: 14 },
        description: "House-made tuna mix, cheese & sourdough bread"
      },
      {
        id: "smokey_pesto_melt",
        name: "Smokey pesto melt",
        prices: { one: 14 },
        description: "Pesto, salami, spanish onion, rocket, smokey mayo & bocconcini cheese"
      },
      {
        id: "ham_cheese_melt",
        name: "Ham cheese melt",
        prices: { one: 8 },
        description: "Ham, cheese & sourdough bread"
      },
    ],
  },

  bites: {
    label: "Bites & sides",
    icon: "ti-drumstick",
    askSpice: true,
    note: "Spice options: Sichuan lvl 0/1/2 or Cumin",
    items: [
      {
        id: "beef_bites",
        name: "Beef bites",
        prices: { one: 8.5 },
        description: "Tender beef coated in your chosen spices"
      },
      {
        id: "lamb_bites",
        name: "Lamb bites",
        prices: { one: 8.5 },
        description: "Juicy lamb coated in your chosen spices"
      },
      {
        id: "chicken_wings",
        name: "Chicken wings (6x)",
        prices: { one: 9.9 },
        description: "6 chicken wings coated in your chosen spices"
      },
      {
        id: "fried_squid",
        name: "Fried squid (Fri–Sun only)",
        prices: { one: 12.9 },
        description: "Served with dressed salad and choice of sauce"
      },
      {
        id: "spring_rolls",
        name: "Spring rolls (6x)",
        prices: { one: 12 },
        description: "6 prawn spring rolls with lettuce and fish sauce"
      },
      {
        id: "plum_fries",
        name: "Plum fries",
        prices: { one: 5 },
        description: "Fries coated with house-made plum seasoning"
      },
      {
        id: "sweet_potato_fries",
        name: "Sweet potato fries",
        prices: { one: 7 },
        description: "Sweet potato fries with plum or maggi seasoning"
      },
      {
        id: "nem_nuong",
        name: "Nem nuong",
        prices: { one: 6 },
        description: "2 Vietnamese pork fried sausages"
      },
      {
        id: "bo_la_lot",
        name: "Bo la lot",
        prices: { one: 6 },
        description: "Marinated beef wrapped in betel leaf"
      },
    ],
  },

  combo: {
    label: "Combo deal",
    icon: "ti-discount",
    items: [
      {
        id: "combo",
        name: "Fries + small refreshment",
        prices: { one: 8 },
        description: "Add fries and any small refreshment"
      },
    ],
  },

  matcha: {
    label: "Kohiki matcha",
    icon: "ti-cup",
    askSize: true,
    items: [
      {
        id: "iced_matcha",
        name: "Iced matcha",
        prices: { S: 7.5, L: 9.5 },
        description: "Oat milk & matcha"
      },
      {
        id: "iced_strawberry_matcha",
        name: "Iced strawberry matcha",
        prices: { S: 8.5, L: 10.5 },
        description: "Oat milk, strawberry puree & matcha"
      },
      {
        id: "iced_jasmine_matcha",
        name: "Iced jasmine matcha",
        prices: { S: 8.5, L: 10.5 },
        description: "Oat milk, jasmine tea & matcha"
      },
      {
        id: "iced_coconut_matcha",
        name: "Iced coconut matcha",
        prices: { S: 8.5, L: 10.5 },
        description: "Coconut milk & matcha"
      },
    ],
  },

  refreshments: {
    label: "Refreshments",
    icon: "ti-glass",
    askSize: true,
    items: [
      {
        id: "mint_lemonade",
        name: "Housemade mint lemonade",
        prices: { S: 4.5, L: 5.7 },
        description: "Fresh mint lemonade"
      },
      {
        id: "mint_straw_lemonade",
        name: "Housemade mint strawberry lemonade",
        prices: { S: 5.5, L: 6.7 },
        description: "Mint lemonade with strawberry"
      },
      {
        id: "iced_lychee",
        name: "Iced lychee",
        prices: { S: 6, L: 7.2 },
        description: "Refreshing lychee drink"
      },
      {
        id: "iced_jasmine_tea",
        name: "Iced jasmine tea",
        prices: { S: 6, L: 7.2 },
        description: "Cold jasmine tea"
      },
      {
        id: "iced_straw_jasmine",
        name: "Iced strawberry jasmine tea",
        prices: { S: 6, L: 7.2 },
        description: "Jasmine tea with strawberry"
      },
      {
        id: "viet_iced_coffee",
        name: "Vietnamese iced coffee",
        prices: { S: 8, L: 8 },
        description: "Vietnamese coffee with condensed milk"
      },
    ],
  },

  toppings: {
    label: "Toppings",
    icon: "ti-leaf",
    items: [
      {
        id: "aloe_vera",
        name: "Aloe vera",
        prices: { one: 0.8 },
        description: "Extra topping"
      },
      {
        id: "herbal_jelly",
        name: "Herbal jelly",
        prices: { one: 0.8 },
        description: "Extra topping"
   },
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

  const addItem = (item, cat) => {
    const hasSize = cat.askSize;
    const hasSauce = cat.askSauce;
    const hasSeasoning = cat.askSeasoning;
    const hasSpice = cat.askSpice;
    const defaultSize = item.noSmall ? "L" : (hasSize ? "S" : null);
    setOrderItems(prev => [...prev, {
      id: Date.now() + Math.random(),
      itemId: item.id,
      name: item.name,
      category: cat.label,
      size: defaultSize,
      sauce: hasSauce ? "Tare" : null,
      seasoning: hasSeasoning ? "Cumin" : null,
      spice: hasSpice ? "Cumin" : null,
      qty: 1,
      baseItem: item,
      hasSize, hasSauce, hasSeasoning, hasSpice,
    }]);
  };

  const removeItem = (id) => setOrderItems(prev => prev.filter(i => i.id !== id));

  const updateItem = (id, field, value) => {
    setOrderItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

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

    await navigator.clipboard.writeText(
      buildSummary()
    );

    alert("Order copied!");

  } catch (err) {

    const text = buildSummary();

    const textarea =
      document.createElement("textarea");

    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);

    alert("Order copied!");
  }
 };

  const cardStyle = {
    background: "var(--color-background-primary)",
    border: "0.5px solid var(--color-border-tertiary)",
    borderRadius: "var(--border-radius-lg)",
    padding: "12px 14px",
    marginBottom: 8,
  };

  const secTitle = {
    fontSize: 14,
    fontWeight: 500,
    color: "var(--color-text-primary)",
    margin: "0 0 8px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingBottom: 6,
    borderBottom: "0.5px solid var(--color-border-tertiary)",
  };

  const btnAdd = {
    fontSize: 12,
    padding: "3px 10px",
    cursor: "pointer",
    background: "#EAF3DE",
    color: "#27500A",
    border: "0.5px solid #97C459",
    borderRadius: "var(--border-radius-md)",
  };

  const selStyle = {
    fontSize: 12,
    padding: "2px 4px",
    borderRadius: "var(--border-radius-md)",
    border: "0.5px solid var(--color-border-secondary)",
    background: "var(--color-background-secondary)",
    color: "var(--color-text-primary)",
  };

  return (
    <div style={{ padding: "1rem 0", fontFamily: "var(--font-sans)" }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 1rem", color: "var(--color-text-primary)" }}>
        <i className="ti ti-phone-incoming" aria-hidden="true" style={{ fontSize: 18, marginRight: 8 }}></i>
        Phone order — Sugar Brush Cafe
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Customer name</label>
          <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g. John" style={{ width: "100%", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Phone number</label>
          <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="e.g. 0412 345 678" style={{ width: "100%", boxSizing: "border-box" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["pickup","dinein"].map(type => (
          <button key={type} onClick={() => setOrderType(type)} style={{
            flex: 1, padding: "8px", fontSize: 13, cursor: "pointer", borderRadius: "var(--border-radius-md)",
            fontWeight: orderType === type ? 500 : 400,
            background: orderType === type ? (type === "pickup" ? "#EAF3DE" : "#E6F1FB") : "var(--color-background-secondary)",
            color: orderType === type ? (type === "pickup" ? "#27500A" : "#0C447C") : "var(--color-text-secondary)",
            border: orderType === type ? `0.5px solid ${type === "pickup" ? "#97C459" : "#85B7EB"}` : "0.5px solid var(--color-border-tertiary)",
          }}>
            <i className={`ti ${type === "pickup" ? "ti-shopping-bag" : "ti-armchair"}`} aria-hidden="true" style={{ marginRight: 6 }}></i>
            {type === "pickup" ? "Pick up" : "Dine in"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>Menu — tap to add</p>
          {Object.entries(MENU).map(([key, cat]) => (
            <div key={key} style={{ ...cardStyle, marginBottom: 10 }}>
              <p style={secTitle}>
                <i className={`ti ${cat.icon}`} aria-hidden="true" style={{ fontSize: 16 }}></i>
                {cat.label}
                {cat.note && <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", fontWeight: 400 }}> — {cat.note}</span>}
              </p>
              {cat.askSpice && (
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 6px" }}>
                  Ask: Spice — Sichuan lvl 0/1/2 or Cumin
                </p>
              )}
              {cat.items.map(item => {
                const hasSize = cat.askSize;
                const priceStr = item.prices.one !== undefined
                  ? `$${item.prices.one}`
                  : item.noSmall
                    ? `L $${item.prices.L}`
                    : `S $${item.prices.S} / L $${item.prices.L}`;
                return (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                    <span style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{item.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{priceStr}</span>
                      <button style={btnAdd} onClick={() => addItem(item, cat)}>
                        <i className="ti ti-plus" style={{ fontSize: 12 }} aria-hidden="true"></i> Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>
            Current order {orderItems.length > 0 && <span style={{ background: "#EAF3DE", color: "#27500A", fontSize: 11, padding: "1px 7px", borderRadius: 20, marginLeft: 4 }}>{orderItems.length} items</span>}
          </p>

          {orderItems.length === 0 && (
            <div style={{ ...cardStyle, textAlign: "center", padding: "2rem", color: "var(--color-text-tertiary)", fontSize: 13 }}>
              <i className="ti ti-shopping-cart" style={{ fontSize: 24, display: "block", marginBottom: 8 }} aria-hidden="true"></i>
              No items yet — add from the menu
            </div>
          )}

          {orderItems.map((oi, idx) => {
            const price = getPrice(oi.baseItem, oi.size);
            return (
              <div key={oi.id} style={{ ...cardStyle }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{oi.name}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--color-text-tertiary)" }}>{oi.category}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>${(price * oi.qty).toFixed(2)}</span>
                    <button onClick={() => removeItem(oi.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-danger)", padding: 0, fontSize: 16 }} aria-label="Remove item">
                      <i className="ti ti-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div style={{   display: "grid",   gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",   gap: 10,   marginTop: 10 }}>
                  <div style={{   display: "flex",   flexDirection: "column",   gap: 4 }}>
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Qty</span>
                    <button onClick={() => oi.qty > 1 && updateItem(oi.id, "qty", oi.qty - 1)} style={{ ...selStyle, padding: "1px 7px", cursor: "pointer" }}>-</button>
                    <span style={{ fontSize: 13, fontWeight: 500, minWidth: 16, textAlign: "center" }}>{oi.qty}</span>
                    <button onClick={() => updateItem(oi.id, "qty", oi.qty + 1)} style={{ ...selStyle, padding: "1px 7px", cursor: "pointer" }}>+</button>
                  </div>
                  {oi.hasSize && !oi.baseItem.noSmall && (
                    <div style={{   display: "flex",   flexDirection: "column",   gap: 4 }}>
                      <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Size</span>
                      <select value={oi.size} onChange={e => updateItem(oi.id, "size", e.target.value)} style={selStyle}>
                        <option value="S">Small</option>
                        <option value="L">Large</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSauce && (
                    <div style={{   display: "flex",   flexDirection: "column",   gap: 4 }}>
                      <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Sauce</span>
                      <select value={oi.sauce} onChange={e => updateItem(oi.id, "sauce", e.target.value)} style={selStyle}>
                        <option>Tare</option>
                        <option>Soy & Mirin</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSeasoning && (
                    <div style={{   display: "flex",   flexDirection: "column",   gap: 4 }}>
                      <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Seasoning</span>
                      <select value={oi.seasoning} onChange={e => updateItem(oi.id, "seasoning", e.target.value)} style={selStyle}>
                        <option>Cumin</option>
                        <option>Sichuan</option>
                      </select>
                    </div>
                  )}
                  {oi.hasSpice && (
                    <div style={{   display: "flex",   flexDirection: "column",   gap: 4 }}>
                      <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Spice</span>
                      <select value={oi.spice} onChange={e => updateItem(oi.id, "spice", e.target.value)} style={selStyle}>
                        <option>Cumin</option>
                        <option>Sichuan lvl 0</option>
                        <option>Sichuan lvl 1</option>
                        <option>Sichuan lvl 2</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {orderItems.length > 0 && (
            <>
              <div style={{ ...cardStyle, background: "var(--color-background-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 500, color: "var(--color-text-primary)" }}>${total.toFixed(2)}</span>
              </div>

              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special requests..." rows={2} style={{ width: "100%", boxSizing: "border-box", fontSize: 13 }} />
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setShowSummary(!showSummary)} style={{ flex: 1, padding: "8px", fontSize: 13, cursor: "pointer", background: "#EAF3DE", color: "#27500A", border: "0.5px solid #97C459", borderRadius: "var(--border-radius-md)" }}>
                  <i className="ti ti-eye" aria-hidden="true" style={{ marginRight: 6 }}></i>
                  {showSummary ? "Hide" : "View"} summary
                </button>
                <button onClick={copySummary} style={{ flex: 1, padding: "8px", fontSize: 13, cursor: "pointer", background: "#E6F1FB", color: "#0C447C", border: "0.5px solid #85B7EB", borderRadius: "var(--border-radius-md)" }}>
                  <i className="ti ti-copy" aria-hidden="true" style={{ marginRight: 6 }}></i>
                  Copy order
                </button>
                <button onClick={() => { setOrderItems([]); setCustomerName(""); setCustomerPhone(""); setNotes(""); setShowSummary(false); }} style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", background: "#FCEBEB", color: "#791F1F", border: "0.5px solid #F09595", borderRadius: "var(--border-radius-md)" }}>
                  <i className="ti ti-refresh" aria-hidden="true"></i>
                </button>
              </div>

              {showSummary && (
                <div style={{ marginTop: 12, background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "12px 14px" }}>
                  <pre style={{ fontSize: 12, margin: 0, whiteSpace: "pre-wrap", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
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
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(<App />);
