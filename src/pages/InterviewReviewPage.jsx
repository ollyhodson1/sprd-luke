import React from "react";
import { PageCard, Textarea, SignatureBlock } from "../components/common";

export function InterviewReviewPage({ title, recordKey, record, update, ready, signed, locked, onSign, signatureLabel }) {
  return (
    <PageCard title={title} subtitle="Learner self-assessment/reflection on progress and Practice Supervisor comments." locked={locked}>
      <ReviewFields recordKey={recordKey} record={record} update={update} locked={locked} />
      <SignatureBlock learnerSigned={true} supervisorSigned={signed} supervisorLabel={signatureLabel} locked={locked} ready={ready} onSupervisor={onSign} />
    </PageCard>
  );
}

export function ReviewFields({ recordKey, record, update, locked }) {
  return (
    <>
      <Textarea
        label="Knowledge"
        value={record[recordKey].knowledge}
        disabled={locked}
        onChange={(value) => update(`${recordKey}.knowledge`, value)}
      />
      <Textarea
        label="Skills"
        value={record[recordKey].skills}
        disabled={locked}
        onChange={(value) => update(`${recordKey}.skills`, value)}
      />
      <Textarea
        label="Attitudes and values"
        value={record[recordKey].attitudes}
        disabled={locked}
        onChange={(value) => update(`${recordKey}.attitudes`, value)}
      />
      <Textarea
        label="Any further comments from learner reflection?"
        value={record[recordKey].supervisorComments}
        disabled={locked}
        onChange={(value) => update(`${recordKey}.supervisorComments`, value)}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <Textarea label="Learning and development needs" value={record[recordKey].learningNeeds} disabled={locked} onChange={(value) => update(`${recordKey}.learningNeeds`, value)} />
        <Textarea label="How will these be achieved?" value={record[recordKey].achievementPlan || ""} disabled={locked} onChange={(value) => update(`${recordKey}.achievementPlan`, value)} />
      </div>
    </>
  );
}
