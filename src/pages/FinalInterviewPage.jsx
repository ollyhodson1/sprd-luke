import React from "react";
import { PageCard, SelectInput, AutoAssessorSignature, SignatureRow } from "../components/common";
import { ReviewFields } from "./InterviewReviewPage";
import { isReady } from "../utils/recordUtils";

export function FinalInterviewPage({ record, update, signAndLockSection }) {
  const ready = isReady(record, "finalInterview");

  return (
    <PageCard title="Part 2 - Placement 2: Final Interview" subtitle="This should take place towards the end of the placement." locked={record.finalInterview.locked}>
      <ReviewFields recordKey="finalInterview" record={record} update={update} locked={record.finalInterview.locked} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <SelectInput
          label="Was a Plan of Action required to support the learner?"
          value={record.finalInterview.planRequired}
          disabled={record.finalInterview.locked}
          options={["Yes", "No"]}
          onChange={(value) => update("finalInterview.planRequired", value)}
        />
        <SelectInput
          label="If yes, was the Academic Assessor informed?"
          value={record.finalInterview.academicAssessorInformed}
          disabled={record.finalInterview.locked}
          options={["Yes", "No", "Not applicable"]}
          onChange={(value) => update("finalInterview.academicAssessorInformed", value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <SignatureRow
          label="Learner signature"
          signed={false}
          locked={true}
          helperText="This remains unsigned for this simulated task. Students are acting as supervisors, not as Luke."
        />
      </div>

      <AutoAssessorSignature
        ready={ready}
        signed={record.finalInterview.assessorSigned}
        onConfirm={() => signAndLockSection("finalInterview", "finalInterview.assessorSigned")}
      />
    </PageCard>
  );
}
