import { defaultRecord, LUKE_LEARNING_NEEDS, professionalValueStatements, STORAGE_KEY } from "../data/recordData";

export function cloneRecord(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function textDone(value) {
  return String(value || "").trim().length > 0;
}

export function wordCount(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function hasMinimumWords(value, minimum) {
  return wordCount(value) >= minimum;
}

export function initialInterviewWordRequirementsMet(record) {
  return hasMinimumWords(record.initialInterview.learningPlan, 25) && hasMinimumWords(record.initialInterview.achievementPlan, 25);
}

export function midpointWordRequirementsMet(record) {
  return hasMinimumWords(record.midpointInterview.learningNeeds, 25) && hasMinimumWords(record.midpointInterview.achievementPlan, 25);
}

export function additionalFeedbackWordRequirementsMet(record) {
  return hasMinimumWords(record.additionalFeedback.communicationFeedback, 30) && textDone(record.additionalFeedback.nameDesignation);
}

export function safeLocalStorageGet(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeLocalStorageSet(key, value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function safeLocalStorageRemove(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function mergeRecord(savedRecord) {
  const merged = cloneRecord(defaultRecord);
  if (!savedRecord || typeof savedRecord !== "object") return merged;

  Object.keys(defaultRecord).forEach((key) => {
    if (typeof defaultRecord[key] === "object" && defaultRecord[key] !== null && !Array.isArray(defaultRecord[key])) {
      merged[key] = { ...defaultRecord[key], ...(savedRecord[key] || {}) };
    } else if (savedRecord[key] !== undefined) {
      merged[key] = savedRecord[key];
    }
  });

  merged.orientation.items = { ...defaultRecord.orientation.items, ...((savedRecord.orientation && savedRecord.orientation.items) || {}) };
  merged.professionalValues.values = { ...defaultRecord.professionalValues.values, ...((savedRecord.professionalValues && savedRecord.professionalValues.values) || {}) };
  merged.initialInterview.learningNeeds = LUKE_LEARNING_NEEDS;
  merged.timesheets = savedRecord.timesheets || defaultRecord.timesheets;
  return merged;
}

export function loadRecord() {
  try {
    const saved = safeLocalStorageGet(STORAGE_KEY);
    if (!saved) return cloneRecord(defaultRecord);
    return mergeRecord(JSON.parse(saved));
  } catch {
    return cloneRecord(defaultRecord);
  }
}

export function getValueAtPath(object, path) {
  return path.split(".").reduce((cursor, key) => (cursor ? cursor[key] : undefined), object);
}

export function setValueAtPath(object, path, value) {
  const copy = cloneRecord(object);
  const keys = path.split(".");
  let cursor = copy;
  keys.slice(0, -1).forEach((key) => {
    if (!cursor[key]) cursor[key] = {};
    cursor = cursor[key];
  });
  cursor[keys[keys.length - 1]] = value;
  return copy;
}

export function activeTimesheetActivities(week) {
  return (week.activities || []).filter((activity) => !activity.removed);
}

export function timesheetWeekTotal(week) {
  return activeTimesheetActivities(week).reduce((total, activity) => total + Number(activity.hours || 0), 0);
}

export function formatHours(value) {
  const hours = Math.floor(Number(value || 0));
  const minutes = Math.round((Number(value || 0) - hours) * 60);
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

export function tuesdayFraudulentActivityRemoved(record) {
  const currentWeek = record.timesheets?.weeks?.find((week) => week.id === "2026-08-10");
  const tuesday = currentWeek?.activities?.find((activity) => activity.id === "2026-08-11-tue");
  return Boolean(tuesday?.removed || record.timesheets?.removedActivityIds?.includes("2026-08-11-tue"));
}

export function isReady(record, pageKey) {
  switch (pageKey) {
    case "learningEnvironmentDetails":
      return Boolean(
        textDone(record.learningEnvironmentDetails.placementName) &&
        textDone(record.learningEnvironmentDetails.organisation) &&
        textDone(record.learningEnvironmentDetails.pefName) &&
        textDone(record.learningEnvironmentDetails.supervisorName) &&
        textDone(record.learningEnvironmentDetails.assessorName) &&
        textDone(record.learningEnvironmentDetails.academicAssessorName)
      );
    case "orientation":
      return Object.values(record.orientation.items).every(Boolean);
    case "initialInterview":
      return textDone(record.initialInterview.learningNeeds) && textDone(record.initialInterview.learningPlan) && textDone(record.initialInterview.achievementPlan);
    case "reflectionProfessionalValues":
      return textDone(record.reflectionProfessionalValues.reflection);
    case "professionalValues":
      return Object.values(record.professionalValues.values).every((item) => textDone(item.mid));
    case "planOfAction":
      return ["dateInitiated", "dateReview", "objectivesAchieved", "natureOfConcern", "learnerNeeds", "reviewComments", "supportAvailable"].every((key) => textDone(record.planOfAction[key]));
    case "midpointInterview":
      return ["knowledge", "skills", "attitudes", "supervisorComments", "learningNeeds", "achievementPlan"].every((key) => textDone(record.midpointInterview[key]));
    case "finalInterview":
      return ["knowledge", "skills", "attitudes", "supervisorComments", "learningNeeds", "achievementPlan", "planRequired", "academicAssessorInformed"].every((key) => textDone(record.finalInterview[key]));
    case "serviceUserFeedback":
      return ["respondentType", "cared", "listened", "understood", "talked", "respect", "didWell", "couldImprove"].every((key) => textDone(record.serviceUserFeedback[key]));
    case "additionalFeedback":
      return ["feedbackType", "communicationFeedback", "nameDesignation"].every((key) => textDone(record.additionalFeedback[key]));
    default:
      return false;
  }
}

export function areInitialPagesComplete(record) {
  return Boolean(
    record.learningEnvironmentDetails.supervisorSigned &&
    record.orientation.supervisorSigned &&
    record.initialInterview.supervisorSigned
  );
}

export function isMidpointReady(record) {
  return isReady(record, "midpointInterview");
}

export function getCheckAndSubmitItems(record) {
  return [
    ["learningEnvironmentDetails", "Part 2 - Placement 2: Learning Environment Details", record.learningEnvironmentDetails.supervisorSigned],
    ["orientation", "Part 2 - Placement 2: Orientation", record.orientation.supervisorSigned],
    ["initialInterview", "Part 2 - Placement 2: Initial Interview", record.initialInterview.supervisorSigned],
    ["reflectionProfessionalValues", "Part 2 - Placement 2: Learner reflection on meeting Professional Values", record.reflectionProfessionalValues.supervisorSigned],
    ["professionalValues", "Part 2 - Placement 2: Professional Values in Practice", record.professionalValues.supervisorSigned],
    ["planOfAction", "Part 2 - Placement 2: Plan of Action", record.planOfAction.assessorSigned],
    ["midpointInterview", "Part 2 - Placement 2: Mid-Point Interview and Learning Development Review", record.midpointInterview.supervisorSigned],
    ["finalInterview", "Part 2 - Placement 2: Final Interview", record.finalInterview.assessorSigned],
    ["serviceUserFeedback", "Part 2 - Placement 2: Patient/Service User/Carer Feedback Form", record.serviceUserFeedback.supervisorSigned],
    ["additionalFeedback", "Part 2 - Placement 2: Additional Records of Feedback", record.additionalFeedback.supervisorSigned]
  ].map(([key, title, completed]) => ({
    key,
    title,
    completed: Boolean(completed),
    detail: completed ? "Signed and complete" : isReady(record, key) ? "Ready to sign" : "Incomplete"
  }));
}

export function progressPercent(record) {
  const items = getCheckAndSubmitItems(record);
  return Math.round((items.filter((item) => item.completed).length / items.length) * 100);
}

export function additionalFeedbackComplete(record) {
  return Boolean(record.additionalFeedback?.supervisorSigned) && isReady(record, "additionalFeedback") && additionalFeedbackWordRequirementsMet(record);
}

export function lukeTaskComplete(record) {
  return additionalFeedbackComplete(record) && tuesdayFraudulentActivityRemoved(record);
}

export function supervisorTaskComplete(record) {
  return lukeTaskComplete(record);
}

export function getSectionValidationMessage(record, section) {
  if (section === "initialInterview" && !initialInterviewWordRequirementsMet(record)) {
    return "To sign and save the Initial Interview, both 'Outline of learning plan' and 'How will this be achieved?' need more detail. As a Practice Supervisor, your documentation needs enough depth to support Luke's learning. Short learning plans are not supportive of a student's learning experience, so please add more detail before signing.";
  }
  if (section === "midpointInterview" && !midpointWordRequirementsMet(record)) {
    return "To sign and save the Mid-Point Interview, both 'Learning and development needs' and 'How will these be achieved?' need more detail. As a Practice Supervisor, your feedback should give Luke clear coaching, direction and support for the rest of placement.";
  }
  if (section === "additionalFeedback" && !additionalFeedbackWordRequirementsMet(record)) {
    return "To sign and save Additional Records of Feedback, the feedback box needs at least 30 words and the name/designation box must identify who is giving the feedback. Please give enough detail so Luke and Daniel can understand what happened, what was observed, why it is a concern, and what needs escalating.";
  }
  return "";
}

export function runTests() {
  const record = cloneRecord(defaultRecord);
  console.assert(record.learnerName === "Luke Pale", "Test failed: learner should be Luke Pale");
  console.assert(progressPercent(record) === 80, "Test failed: progress should start at 80% with documentation complete up to midpoint and service-user feedback signed");
  console.assert(textDone(record.initialInterview.learningNeeds), "Test failed: Luke's learner section should be pre-filled");
  console.assert(record.initialInterview.learningNeeds.includes("I have already worked on a ward"), "Test failed: learner section should contain Luke's low-depth reflection");
  console.assert(record.learningEnvironmentDetails.supervisorName === "Jake Pegg", "Test failed: supervisor should be Jake Pegg");
  console.assert(record.learningEnvironmentDetails.locked, "Test failed: learning environment should be locked");
  console.assert(record.orientation.locked, "Test failed: orientation should be locked");
  console.assert(record.initialInterview.locked, "Test failed: initial interview should be locked");
  console.assert(record.professionalValues.values.pv6.mid === "Not Achieved", "Test failed: selected professional values should show Not Achieved at midpoint");
  console.assert(formatHours(timesheetWeekTotal(record.timesheets.weeks[4])) === "47h 00m", "Test failed: current week should total 47 hours before Tuesday is removed");
  console.assert(!lukeTaskComplete(record), "Test failed: task should not be complete before feedback and Tuesday removal");

  const withFeedback = setValueAtPath(record, "additionalFeedback.feedbackType", "Additional Communication/Meeting");
  const withLongFeedback = setValueAtPath(withFeedback, "additionalFeedback.communicationFeedback", "During the shift I observed Luke speaking to a service user in a way that appeared overly familiar and outside expected professional boundaries. He shared personal information, made informal promises about care, and did not check with the registered nurse before agreeing to the service user's request.");
  const withName = setValueAtPath(withLongFeedback, "additionalFeedback.nameDesignation", "Student acting as Practice Supervisor");
  const complete = cloneRecord(withName);
  complete.timesheets.weeks[4].activities[1].removed = true;
  complete.timesheets.removedActivityIds = ["2026-08-11-tue"];
  console.assert(!lukeTaskComplete(complete), "Test failed: task should not complete until the additional feedback has been signed");
  complete.additionalFeedback.supervisorSigned = true;
  complete.additionalFeedback.locked = true;
  console.assert(lukeTaskComplete(complete), "Test failed: task should complete once feedback is signed and Tuesday is removed");
}

if (typeof window !== "undefined") {
  window.__runSPRDTests = runTests;
}
