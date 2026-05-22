import React from "react";
import { PageCard } from "../components/common";
import { getCheckAndSubmitItems } from "../utils/recordUtils";
import { styles } from "../styles/styles";

export function CheckSubmitPage({ record }) {
  const items = getCheckAndSubmitItems(record);
  return (
    <PageCard title="Part 2 - Placement 2: Check and Submit" subtitle="Checklist for assessed documents." locked={false}>
      <div style={{ overflow: "hidden", borderRadius: 16, border: "1px solid #e2e8f0" }}>
        <div style={{ ...styles.tableHeader, gridTemplateColumns: "1fr 140px" }}><span>Assessed document</span><span style={{ textAlign: "center" }}>Completed</span></div>
        {items.map((item) => (
          <div key={item.title} style={{ ...styles.tableRow, gridTemplateColumns: "1fr 140px", background: item.completed ? "#f0fdf4" : "#fff", color: item.completed ? "#166534" : "#0f172a" }}>
            <div><p style={{ margin: 0, fontWeight: 800 }}>{item.title}</p><p style={{ margin: "4px 0 0", fontSize: 12, color: item.completed ? "#166534" : "#64748b" }}>{item.detail}</p></div>
            <div style={{ textAlign: "center", fontSize: 24, fontWeight: 900 }}>{item.completed ? "✓" : "✕"}</div>
          </div>
        ))}
      </div>
    </PageCard>
  );
}
