import React from "react";
import { PageCard, TextInput, SignatureBlock } from "../components/common";
import { orientationItems } from "../data/recordData";
import { isReady } from "../utils/recordUtils";
import { styles } from "../styles/styles";

export function OrientationPage({ record, update, signAndLockSection, initialPagesComplete }) {
  const ready = isReady(record, "orientation");
  return (
    <PageCard title="Part 2 - Orientation" subtitle="To be completed during the first day of the simulated placement." locked={record.orientation.locked}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginBottom: 20 }}>
        <TextInput label="Local fire procedures phone number" value={record.orientation.localFireProcedurePhone} disabled={record.orientation.locked} onChange={(value) => update("orientation.localFireProcedurePhone", value)} />
        <TextInput label="Resuscitation policy and procedures phone number" value={record.orientation.resuscitationPolicyPhone} disabled={record.orientation.locked} onChange={(value) => update("orientation.resuscitationPolicyPhone", value)} />
      </div>
      <div style={{ overflow: "hidden", borderRadius: 16, border: "1px solid #e2e8f0" }}>
        <div style={styles.tableHeader}><span>Item</span><span style={{ textAlign: "center" }}>Completed</span></div>
        {orientationItems.map(([key, label]) => (
          <div key={key} style={{ ...styles.tableRow, background: record.orientation.locked ? "#f1f5f9" : "white", color: record.orientation.locked ? "#64748b" : "#0f172a" }}>
            <span>{label}</span>
            <label style={{ display: "flex", justifyContent: "center" }}><input type="checkbox" checked={record.orientation.items[key]} disabled={record.orientation.locked} onChange={(event) => update(`orientation.items.${key}`, event.target.checked)} style={{ width: 20, height: 20 }} /></label>
          </div>
        ))}
      </div>
      <SignatureBlock learnerSigned={initialPagesComplete} supervisorSigned={record.orientation.supervisorSigned} locked={record.orientation.locked} ready={ready} onSupervisor={() => signAndLockSection("orientation", "orientation.supervisorSigned")} />
    </PageCard>
  );
}

