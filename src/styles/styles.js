export const styles = {
  page: { minHeight: "100vh", background: "#f1f5f9", color: "#0f172a", fontFamily: "Arial, Helvetica, sans-serif" },
  header: { background: "#082f49", color: "white", boxShadow: "0 2px 8px rgba(15,23,42,0.18)" },
  headerInner: { maxWidth: 1500, margin: "0 auto", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 },
  brandRow: { display: "flex", alignItems: "center", gap: 12 },
  main: { maxWidth: 1500, margin: "0 auto", padding: 24, display: "grid", gridTemplateColumns: "290px minmax(0, 1fr)", gap: 24 },
  card: { background: "white", borderRadius: 18, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(15,23,42,0.08)" },
  cardContent: { padding: 22 },
  warning: { display: "flex", gap: 10, alignItems: "center", borderRadius: 14, background: "#fef3c7", color: "#78350f", padding: "10px 14px", fontSize: 14, fontWeight: 700 },
  navButton: { width: "100%", display: "flex", alignItems: "center", gap: 10, border: 0, borderRadius: 16, padding: "14px 16px", textAlign: "left", fontWeight: 700, cursor: "pointer", boxShadow: "0 1px 4px rgba(15,23,42,0.08)" },
  button: { border: 0, borderRadius: 12, padding: "10px 14px", fontWeight: 700, cursor: "pointer" },
  input: { width: "100%", marginTop: 8, borderRadius: 12, border: "1px solid #cbd5e1", padding: "10px 12px", boxSizing: "border-box", fontSize: 14 },
  label: { display: "block", fontSize: 14, fontWeight: 700, color: "#334155" },
  tableHeader: { display: "grid", gridTemplateColumns: "1fr 110px", background: "#f1f5f9", padding: "12px 16px", fontSize: 14, fontWeight: 800, color: "#334155" },
  tableRow: { display: "grid", gridTemplateColumns: "1fr 110px", alignItems: "center", borderTop: "1px solid #e2e8f0", padding: "12px 16px", fontSize: 14 }
};
