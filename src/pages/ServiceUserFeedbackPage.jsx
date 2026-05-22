import React from "react";
import { PageCard, SelectInput, Textarea, SignatureBlock } from "../components/common";
import { ratingOptions } from "../data/recordData";
import { isReady } from "../utils/recordUtils";
import { styles } from "../styles/styles";

export function ServiceUserFeedbackPage({ record, update, signAndLockSection }) {
  const ready = isReady(record, "serviceUserFeedback");
  const rows = [["cared", "...cared for you?"], ["listened", "...listened to you?"], ["understood", "...understood the way you felt?"], ["talked", "...talked to you?"], ["respect", "...showed you respect?"]];
  return (
    <PageCard title="Part 2 - Placement 2: Patient/Service User/Carer Feedback Form" subtitle="Feedback about the way the learner has supported care." locked={record.serviceUserFeedback.locked}>
      <SelectInput label="Are you the Patient/Service User or a Carer/Relative?" value={record.serviceUserFeedback.respondentType} disabled={record.serviceUserFeedback.locked} options={["Patient/Service User", "Carer/Relative", "Other"]} onChange={(value) => update("serviceUserFeedback.respondentType", value)} />
      <div style={{ marginTop: 18, overflow: "hidden", borderRadius: 16, border: "1px solid #e2e8f0" }}>
        <div style={{ ...styles.tableHeader, gridTemplateColumns: "1fr repeat(5, 110px)" }}><span>How happy were you with the way the learner...</span>{ratingOptions.map((option) => <span key={option} style={{ textAlign: "center" }}>{option}</span>)}</div>
        {rows.map(([key, label]) => (
          <div key={key} style={{ ...styles.tableRow, gridTemplateColumns: "1fr repeat(5, 110px)" }}>
            <strong>{label}</strong>
            {ratingOptions.map((option) => <label key={option} style={{ textAlign: "center" }}><input type="radio" name={key} value={option} checked={record.serviceUserFeedback[key] === option} disabled={record.serviceUserFeedback.locked} onChange={(event) => update(`serviceUserFeedback.${key}`, event.target.value)} /></label>)}
          </div>
        ))}
      </div>
      <Textarea label="What did the learner do well?" value={record.serviceUserFeedback.didWell} disabled={record.serviceUserFeedback.locked} onChange={(value) => update("serviceUserFeedback.didWell", value)} />
      <Textarea label="What could the learner have done differently?" value={record.serviceUserFeedback.couldImprove} disabled={record.serviceUserFeedback.locked} onChange={(value) => update("serviceUserFeedback.couldImprove", value)} />
      <SignatureBlock learnerSigned={true} supervisorSigned={record.serviceUserFeedback.supervisorSigned} locked={record.serviceUserFeedback.locked} ready={ready} onSupervisor={() => signAndLockSection("serviceUserFeedback", "serviceUserFeedback.supervisorSigned")} />
    </PageCard>
  );
}

