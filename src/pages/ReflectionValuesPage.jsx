import React from "react";
import { PageCard, Textarea, SignatureBlock } from "../components/common";
import { isReady } from "../utils/recordUtils";

export function ReflectionValuesPage({ record, update, signAndLockSection }) {
  const ready = isReady(record, "reflectionProfessionalValues");

  return (
    <PageCard title="Part 2 - Placement 2: Learner reflection on meeting Professional Values" subtitle="Luke's reflection has already been completed and signed earlier in the placement." locked={record.reflectionProfessionalValues.locked}>
      <Textarea
        label="Learner reflection on meeting Professional Values"
        value={record.reflectionProfessionalValues.reflection}
        disabled={record.reflectionProfessionalValues.locked}
        onChange={(value) => update("reflectionProfessionalValues.reflection", value)}
        rows={8}
      />
      <SignatureBlock
        learnerSigned={true}
        supervisorSigned={record.reflectionProfessionalValues.supervisorSigned}
        supervisorLabel="Practice Supervisor signature"
        locked={record.reflectionProfessionalValues.locked}
        ready={ready}
        onSupervisor={() => signAndLockSection("reflectionProfessionalValues", "reflectionProfessionalValues.supervisorSigned")}
      />
    </PageCard>
  );
}
