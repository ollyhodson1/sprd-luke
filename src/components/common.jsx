import React from "react";
import { styles } from "../styles/styles";
import { AUTO_ASSESSOR_NAME } from "../data/recordData";

export function Icon({ children, tone = "default" }) {
  const colours = { default: "#0f172a", white: "white", blue: "#075985", amber: "#92400e", green: "#166534", grey: "#64748b" };
  return <span aria-hidden="true" style={{ color: colours[tone], display: "inline-flex", width: 22, justifyContent: "center", fontWeight: 800 }}>{children}</span>;
}

export function NavButton({ active, onClick, icon, label }) {
  return <button onClick={onClick} style={{ ...styles.navButton, background: active ? "#075985" : "white", color: active ? "white" : "#0f172a" }}><Icon tone={active ? "white" : "blue"}>{icon}</Icon> {label}</button>;
}

export function PageHeader({ title, subtitle, locked }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, borderBottom: "1px solid #e2e8f0", paddingBottom: 20, marginBottom: 22 }}>
      <div><h2 style={{ margin: 0, fontSize: 26 }}>{title}</h2>{subtitle ? <p style={{ margin: "6px 0 0", color: "#475569", fontSize: 14 }}>{subtitle}</p> : null}</div>
      {locked ? <div style={{ borderRadius: 12, background: "#f1f5f9", color: "#475569", padding: "8px 10px", fontSize: 14, fontWeight: 800 }}>Locked</div> : null}
    </div>
  );
}

export function TextInput({ label, value, onChange, disabled }) {
  return <label style={styles.label}>{label}<input value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} style={{ ...styles.input, background: disabled ? "#f1f5f9" : "white", color: disabled ? "#64748b" : "#0f172a" }} /></label>;
}

export function Textarea({ label, value, onChange, disabled, rows = 5 }) {
  return <label style={{ ...styles.label, marginBottom: 16 }}>{label}<textarea value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} rows={rows} style={{ ...styles.input, minHeight: 110, resize: "vertical", background: disabled ? "#f1f5f9" : "white", color: disabled ? "#64748b" : "#0f172a" }} /></label>;
}

export function SelectInput({ label, value, onChange, disabled, options }) {
  return (
    <label style={styles.label}>{label}
      <select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} style={{ ...styles.input, background: disabled ? "#f1f5f9" : "white", color: disabled ? "#64748b" : "#0f172a" }}>
        <option value="">-- Select --</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function SignatureBlock({ learnerSigned = false, supervisorSigned = false, onSupervisor, locked, ready = true, supervisorLabel = "Practice Supervisor signature" }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12, marginTop: 20 }}>
      <SignatureRow label="Learner signature" signed={learnerSigned} onSign={() => {}} locked={true} helperText={learnerSigned ? "Signed automatically once the relevant learner section is complete." : "Disabled: the student is acting as the supervisor for a simulated learner."} />
      <SignatureRow label={supervisorLabel} signed={supervisorSigned} onSign={onSupervisor} locked={locked || !ready} helperText={ready ? "Adding this signature saves and locks this section." : "Complete the section before signing."} />
    </div>
  );
}

export function SignatureRow({ label, signed, onSign = () => {}, locked, helperText }) {
  const disabled = locked || signed;
  return (
    <div style={{ borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, background: disabled ? "#f1f5f9" : "white", color: disabled ? "#64748b" : "#0f172a" }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>{label}</p>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14 }}>{signed ? "Signed" : "Unsigned"}</span>
        <button disabled={disabled} onClick={onSign} style={{ ...styles.button, background: disabled ? "#cbd5e1" : "#15803d", color: disabled ? "#475569" : "white", cursor: disabled ? "not-allowed" : "pointer" }}>{signed ? "Signed" : "Add signature"}</button>
      </div>
      {helperText ? <p style={{ margin: "10px 0 0", fontSize: 12, color: disabled ? "#64748b" : "#475569" }}>{helperText}</p> : null}
    </div>
  );
}

export function AutoAssessorSignature({ ready, signed, onConfirm, label = "Practice Assessor signature" }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, background: ready || signed ? "#f0fdf4" : "#f1f5f9", color: ready || signed ? "#166534" : "#64748b" }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>{label}</p>
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
          <span>{ready || signed ? AUTO_ASSESSOR_NAME : "Cannot be signed until this page has been completed"}</span>
          <strong>{signed ? "Signed" : ready ? "Ready" : "Unsigned"}</strong>
        </div>
      </div>
      {ready && !signed ? <button onClick={onConfirm} style={{ ...styles.button, marginTop: 10, background: "#15803d", color: "white" }}>Confirm Practice Assessor signature</button> : null}
    </div>
  );
}

export function AssessorFinalStageNotice() {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, background: "#f1f5f9", color: "#64748b" }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>Practice Assessor to sign at final interview stage</p>
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span>{AUTO_ASSESSOR_NAME}</span>
          <strong>Unsigned</strong>
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 12, color: "#64748b" }}>Disabled for this Practice Supervisor task.</p>
      </div>
    </div>
  );
}

export function PageCard({ title, subtitle, locked, children }) {
  return <section style={styles.card}><div style={styles.cardContent}><PageHeader title={title} subtitle={subtitle} locked={locked} />{children}</div></section>;
}
