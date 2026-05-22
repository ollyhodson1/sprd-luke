import React from "react";
import { PageCard, Textarea, SignatureBlock } from "../components/common";
import { isReady } from "../utils/recordUtils";

export function InitialInterviewPage({ record, update, signAndLockSection, initialPagesComplete }) {
  const ready = isReady(record, "initialInterview");
  return (
    <PageCard title="Part 2 - Placement 2: Initial Interview" subtitle="Practice Supervisor agrees a learning plan with Luke Pale." locked={record.initialInterview.locked}>
      <Textarea label="Learner to identify learning and development needs" value={record.initialInterview.learningNeeds} disabled={true} onChange={(value) => update("initialInterview.learningNeeds", value)} rows={12} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <Textarea label="Outline of learning plan" value={record.initialInterview.learningPlan} disabled={record.initialInterview.locked} onChange={(value) => update("initialInterview.learningPlan", value)} />
        <Textarea label="How will this be achieved?" value={record.initialInterview.achievementPlan} disabled={record.initialInterview.locked} onChange={(value) => update("initialInterview.achievementPlan", value)} />
      </div>
      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 16, borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, background: record.initialInterview.locked ? "#f1f5f9" : "white", color: record.initialInterview.locked ? "#64748b" : "#0f172a", fontSize: 14, fontWeight: 700 }}>
        <span>Learning plan agreed by Practice Assessor, where applicable</span>
        <input type="checkbox" checked={record.initialInterview.assessorAgreed} disabled={record.initialInterview.locked} onChange={(event) => update("initialInterview.assessorAgreed", event.target.checked)} style={{ width: 20, height: 20 }} />
      </label>
      <SignatureBlock learnerSigned={initialPagesComplete} supervisorSigned={record.initialInterview.supervisorSigned} supervisorLabel="Practice Supervisor signature" locked={record.initialInterview.locked} ready={ready} onSupervisor={() => signAndLockSection("initialInterview", "initialInterview.supervisorSigned")} />
    </PageCard>
  );
}

