import React from "react";
import { PageCard, SelectInput, SignatureBlock, AssessorFinalStageNotice } from "../components/common";
import { professionalValueStatements, pvMidpointOptions, pvFinalOptions } from "../data/recordData";
import { isReady } from "../utils/recordUtils";

export function ProfessionalValuesPage({ record, update, signAndLockSection }) {
  const ready = isReady(record, "professionalValues");
  return (
    <PageCard
      title="Part 2 - Placement 2: Professional Values in Practice"
      subtitle="Practice Supervisors complete the Mid Point judgement. Final judgements are greyed out because they are completed by the Practice Assessor."
      locked={record.professionalValues.locked}
    >
      <p style={{ margin: "0 0 16px", borderRadius: 14, background: "#eff6ff", color: "#1e3a8a", padding: 12, fontSize: 14, fontWeight: 700 }}>
        Complete the Mid Point dropdowns only. The Final dropdowns are intentionally disabled for this simulated Practice Supervisor task.
      </p>

      <div style={{ display: "grid", gap: 10 }}>
        {professionalValueStatements.map((statement, index) => {
          const key = `pv${index + 1}`;
          return (
            <div key={key} style={{ borderRadius: 14, border: "1px solid #e2e8f0", padding: 14, background: record.professionalValues.locked ? "#f1f5f9" : "white" }}>
              <p style={{ margin: "0 0 12px", fontWeight: 700 }}>{index + 1}. {statement}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                <SelectInput
                  label="Mid Point"
                  value={record.professionalValues.values[key].mid}
                  disabled={record.professionalValues.locked}
                  options={pvMidpointOptions}
                  onChange={(value) => update(`professionalValues.values.${key}.mid`, value)}
                />
                <SelectInput
                  label="Final"
                  value={record.professionalValues.values[key].final}
                  disabled={true}
                  options={pvFinalOptions}
                  onChange={() => {}}
                />
              </div>
            </div>
          );
        })}
      </div>

      <SignatureBlock
        learnerSigned={true}
        supervisorSigned={record.professionalValues.supervisorSigned}
        locked={record.professionalValues.locked}
        ready={ready}
        onSupervisor={() => signAndLockSection("professionalValues", "professionalValues.supervisorSigned")}
        supervisorLabel="Practice Supervisor sign at midpoint"
      />
      <AssessorFinalStageNotice />
    </PageCard>
  );
}
