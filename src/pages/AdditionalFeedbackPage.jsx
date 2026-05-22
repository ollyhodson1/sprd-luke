import React from "react";
import { PageCard, SelectInput, Textarea, SignatureRow } from "../components/common";
import { isReady } from "../utils/recordUtils";

export function AdditionalFeedbackPage({ record, update, signAndLockSection }) {
  const ready = isReady(record, "additionalFeedback");
  return (
    <PageCard title="Part 2 - Placement 2: Additional Records of Feedback" subtitle="Use this page to record the poor practice observed while working with Luke." locked={record.additionalFeedback.locked}>
      <SelectInput label="Feedback type" value={record.additionalFeedback.feedbackType} disabled={record.additionalFeedback.locked} options={["Peer Review", "Record of Working with Others", "Additional Communication/Meeting"]} onChange={(value) => update("additionalFeedback.feedbackType", value)} />
      <Textarea label="Communication / additional feedback" value={record.additionalFeedback.communicationFeedback} disabled={record.additionalFeedback.locked} onChange={(value) => update("additionalFeedback.communicationFeedback", value)} />
      <Textarea label="Name and designation" value={record.additionalFeedback.nameDesignation} disabled={record.additionalFeedback.locked} onChange={(value) => update("additionalFeedback.nameDesignation", value)} rows={3} />
      <div style={{ marginTop: 20 }}>
        <SignatureRow
          label="Practice Supervisor signature"
          signed={record.additionalFeedback.supervisorSigned}
          onSign={() => signAndLockSection("additionalFeedback", "additionalFeedback.supervisorSigned")}
          locked={record.additionalFeedback.locked || !ready}
          helperText={ready ? "Adding this signature saves and locks this section. The feedback box must contain at least 30 words." : "Complete the section before signing."}
        />
      </div>
    </PageCard>
  );
}
