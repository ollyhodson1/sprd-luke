import React from "react";
import { PageCard, TextInput, Textarea, SelectInput, SignatureBlock, AutoAssessorSignature } from "../components/common";
import { isReady } from "../utils/recordUtils";

export function PlanOfActionPage({ record, update, signAndLockSection }) {
  const ready = isReady(record, "planOfAction");
  return (
    <PageCard title="Part 2 - Placement 2: Plan of Action" subtitle="A plan of action is required when a learner's performance causes concern." locked={record.planOfAction.locked}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <TextInput label="Date plan of action initiated" value={record.planOfAction.dateInitiated} disabled={record.planOfAction.locked} onChange={(value) => update("planOfAction.dateInitiated", value)} />
        <TextInput label="Date for review" value={record.planOfAction.dateReview} disabled={record.planOfAction.locked} onChange={(value) => update("planOfAction.dateReview", value)} />
        <SelectInput label="Have the objectives been achieved?" value={record.planOfAction.objectivesAchieved} disabled={record.planOfAction.locked} options={["Yes", "No", "Partially"]} onChange={(value) => update("planOfAction.objectivesAchieved", value)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginTop: 16 }}>
        <Textarea label="Nature of concern" value={record.planOfAction.natureOfConcern} disabled={record.planOfAction.locked} onChange={(value) => update("planOfAction.natureOfConcern", value)} />
        <Textarea label="Review / feedback comments" value={record.planOfAction.reviewComments} disabled={record.planOfAction.locked} onChange={(value) => update("planOfAction.reviewComments", value)} />
        <Textarea label="What does the learner need to demonstrate?" value={record.planOfAction.learnerNeeds} disabled={record.planOfAction.locked} onChange={(value) => update("planOfAction.learnerNeeds", value)} />
        <Textarea label="Support available and who is responsible" value={record.planOfAction.supportAvailable} disabled={record.planOfAction.locked} onChange={(value) => update("planOfAction.supportAvailable", value)} />
      </div>
      <SignatureBlock
        learnerSigned={record.planOfAction.learnerSigned ?? true}
        supervisorSigned={record.planOfAction.supervisorSigned ?? true}
        locked={record.planOfAction.locked}
        ready={ready}
        onSupervisor={() => signAndLockSection("planOfAction", "planOfAction.supervisorSigned")}
      />
      <AutoAssessorSignature ready={ready} signed={record.planOfAction.assessorSigned} onConfirm={() => signAndLockSection("planOfAction", "planOfAction.assessorSigned")} />
    </PageCard>
  );
}

