import React from "react";
import { InterviewReviewPage } from "./InterviewReviewPage";
import { isMidpointReady } from "../utils/recordUtils";

export function MidpointPage({ record, update, signAndLockSection }) {
  const ready = isMidpointReady(record);

  return (
    <InterviewReviewPage
      title="Part 2 - Placement 2: Mid-Point Interview and Learning Development Review"
      recordKey="midpointInterview"
      record={record}
      update={update}
      ready={ready}
      signed={record.midpointInterview.supervisorSigned}
      locked={record.midpointInterview.locked}
      onSign={() => signAndLockSection("midpointInterview", "midpointInterview.supervisorSigned")}
      signatureLabel="Practice Supervisor signature"
    />
  );
}
