export const STORAGE_KEY = "sprd-luke-pale-part2-placement2-v1";
export const AUTO_ASSESSOR_NAME = "Daniel Vaughan-Davies";
export const TASK_COMPLETION_CODE = "2741";

export const LUKE_LEARNING_NEEDS = [
  "I have already worked on a ward that felt similar to this, so I do not think there is loads for me to learn here. I know how wards work and I am already confident with patients.",
  "",
  "I mainly want to get my hours signed and practise a few medicines and observations if they come up. I do not think I need much supervision because I have done this type of placement before.",
  "",
  "I am happy to help patients and talk to them. I think I am good at building relationships because patients tend to like me. I would rather be trusted to get on with things than have staff checking everything I do."
].join("\n");

export const LUKE_PROFESSIONAL_VALUES_REFLECTION = [
  "I think I have met the professional values because I get on well with most patients and staff. Some patients have said they like speaking to me because I am more relaxed than some of the nurses.",
  "",
  "I do not think boundaries are a big issue as long as the patient feels supported. If someone is upset, I think it is better to be friendly and tell them more about yourself so they trust you. I have been late a couple of times but this has not affected care because I always make the time up and the ward is busy anyway.",
  "",
  "I feel I am doing okay and I do not think I need a formal action plan. I know I sometimes do things differently but I think that is just my style."
].join("\n");

export const LUKE_MIDPOINT_LEARNER_REFLECTION = {
  knowledge: [
    "I think my knowledge is fine for where I am. I have done similar work before and I understand the basics of care planning, observations and talking to patients.",
    "",
    "I still need to get some proficiencies signed, but I think that is more about finding the opportunity than me needing to learn more."
  ].join("\n"),
  skills: [
    "I am confident speaking to patients and I usually know what to do on shift. I have helped with care, observations and general ward tasks.",
    "",
    "I probably need to get more medicines experience and maybe documentation, but I feel I can do most things when staff let me."
  ].join("\n"),
  attitudes: [
    "I think I have a good attitude because patients seem to like me. I can be relaxed with them and I think this helps them open up.",
    "",
    "Staff have mentioned punctuality and boundaries, but I do not think these are major issues. I will try to be more aware of this if needed."
  ].join("\n"),
  supervisorComments: [
    "I feel I am doing mostly okay. I know there have been some comments about me being too familiar with patients, but I think that is because I am comfortable talking to people.",
    "",
    "I will try to follow the plan of action, but I do feel some of it is a bit strict."
  ].join("\n")
};

export const orientationItems = [
  ["generalOrientation", "A general orientation to the simulated placement setting has been undertaken"],
  ["fireProcedures", "Local fire procedures have been explained"],
  ["alarmsExitsExtinguishers", "The learner has been shown the fire alarm, fire exits and fire extinguishers"],
  ["resusPolicy", "Resuscitation policy and procedures have been explained"],
  ["resusEquipment", "Resuscitation equipment has been shown and explained"],
  ["emergencyHelp", "The learner knows how to summon help in an emergency"],
  ["localPolicies", "The learner is aware of where to find local policies"],
  ["governance", "The learner has been made aware of information governance requirements"],
  ["shiftsMealsReporting", "Shift times, meal times and reporting sick processes have been explained"],
  ["professionalRole", "The learner is aware of their professional role in practice"],
  ["safeguarding", "Policy regarding safeguarding has been explained"],
  ["raisingConcerns", "The learner is aware of the policy and process of raising concerns"],
  ["loneWorking", "Lone working policy has been explained, where applicable"],
  ["reasonableAdjustments", "Risk assessment and reasonable adjustments have been discussed, where disclosed"],
  ["movingHandling", "Moving and handling equipment has been shown"],
  ["medicalDevices", "Medical devices used in the simulated placement area have been shown"]
];

export const professionalValueStatements = [
  "The learner maintains confidentiality in accordance with the NMC Code.",
  "The learner is non-judgemental, respectful and courteous.",
  "The learner maintains privacy and dignity, gains consent and advocates on behalf of people.",
  "The learner is caring, compassionate and sensitive to the needs of others.",
  "The learner understands their professional responsibility in adopting and promoting a healthy lifestyle.",
  "The learner maintains consistent, safe and person-centred practice.",
  "The learner works effectively within the multidisciplinary team.",
  "The learner works within their scope, seeking support when needed.",
  "The learner demonstrates openness, candour, trustworthiness and integrity.",
  "The learner reports concerns appropriately, including safeguarding concerns.",
  "The learner listens, seeks clarification and carries out instructions safely.",
  "The learner recognises limits of knowledge, skills and professional boundaries.",
  "The learner follows local policy relating to presentation and dress code.",
  "The learner demonstrates an appropriate professional attitude regarding punctuality and communication.",
  "The learner demonstrates self-awareness and recognises their own emotions and those of others."
];

export const ratingOptions = ["Very Happy", "Happy", "I'm not sure", "Unhappy", "Very Unhappy"];
export const pvMidpointOptions = ["Progressing", "Not Achieved", "Not Assessed"];
export const pvFinalOptions = ["Achieved", "Not Achieved", "Not Assessed"];

function professionalValueDefaults() {
  const notAchieved = new Set(["pv6", "pv8", "pv9", "pv12", "pv14"]);
  return Object.fromEntries(
    professionalValueStatements.map((_, index) => {
      const key = `pv${index + 1}`;
      return [key, { mid: notAchieved.has(key) ? "Not Achieved" : "Progressing", final: "" }];
    })
  );
}

export const defaultRecord = {
  learnerName: "Luke Pale",
  learnerPart: "Part Two",
  placementNumber: "Placement 2 of Part 2",
  learningEnvironmentDetails: {
    placementName: "Mary Seacole Simulation Suite - Acute Adult Ward",
    organisation: "University of Salford",
    fromDate: "13 July 2026",
    toDate: "23 August 2026",
    placementTelephone: "0161 295 0000",
    placementEmailOne: "simulation-placement@salford.ac.uk",
    pefName: "Chris Doogan",
    pefDesignation: "PEF / Practice Education Link Nurse",
    pefEmail: "chris.doogan@salford.example",
    supervisorName: "Jake Pegg",
    supervisorDesignation: "Practice Supervisor",
    supervisorEmail: "jake.pegg@salford.example",
    assessorName: "Daniel Vaughan-Davies",
    assessorDesignation: "Practice Assessor",
    assessorEmail: "daniel.vaughan-davies@salford.example",
    academicAssessorName: "Becca Richardson",
    academicAssessorDesignation: "Academic Assessor",
    academicAssessorEmail: "becca.richardson@salford.example",
    supervisorSigned: true,
    locked: true
  },
  orientation: {
    localFireProcedurePhone: "2222",
    resuscitationPolicyPhone: "2222",
    items: Object.fromEntries(orientationItems.map(([key]) => [key, true])),
    supervisorSigned: true,
    locked: true
  },
  initialInterview: {
    learningNeeds: LUKE_LEARNING_NEEDS,
    learningPlan: "Luke says he has done a similar ward before. He seems confident and says he mainly needs hours and a few skills signing. Plan is for him to get involved with ward routine and ask staff if he needs anything.",
    achievementPlan: "Luke can work with the team, complete normal ward tasks and let staff know what he wants signing. He should be fine if he just keeps communicating and takes opportunities when they come up.",
    assessorAgreed: true,
    supervisorSigned: true,
    locked: true
  },
  reflectionProfessionalValues: {
    reflection: LUKE_PROFESSIONAL_VALUES_REFLECTION,
    supervisorSigned: true,
    locked: true
  },
  professionalValues: {
    values: professionalValueDefaults(),
    supervisorSigned: true,
    assessorSigned: false,
    locked: true
  },
  planOfAction: {
    dateInitiated: "29 July 2026",
    dateReview: "12 August 2026",
    objectivesAchieved: "Partially",
    natureOfConcern: "Concerns have been raised about Luke's punctuality, professional boundaries, openness with staff and working within his scope as a Part Two learner. There have been occasions where Luke has been overly familiar with people receiving care, has shared personal information, and has appeared to prioritise being liked by service users over maintaining clear therapeutic boundaries. Staff have also needed to remind Luke to seek supervision before undertaking tasks.",
    learnerNeeds: "Luke needs to demonstrate consistent punctuality, safe and supervised practice, professional communication, accurate documentation, honesty about attendance and clear boundaries with people receiving care. He must seek guidance before completing unfamiliar tasks, avoid sharing personal contact details or personal information, and escalate any uncertainty to the registered nurse or Practice Supervisor.",
    reviewComments: "At midpoint, some improvement has been seen when Luke is directly prompted, but the concerns remain current. Luke responds well to direct coaching in the moment but does not yet consistently apply feedback independently. The plan remains active and requires close review with Jake Pegg and Daniel Vaughan-Davies before the final interview.",
    supportAvailable: "Jake Pegg will complete a brief start-of-shift plan with Luke at the start of each rostered shift. Luke will receive direct feedback after any boundary, punctuality or scope-of-practice concern. Daniel Vaughan-Davies will review progress weekly. Luke will complete a written reflection on professional boundaries and bring one example of safe escalation to the next review. Goals are SMART: Luke will attend every rostered shift on time, check in with the nurse in charge at the start of each shift, seek supervision before all unfamiliar tasks, and document one piece of feedback and one action taken after each shift until the review date.",
    learnerSigned: true,
    supervisorSigned: true,
    assessorSigned: true,
    locked: true
  },
  midpointInterview: {
    knowledge: LUKE_MIDPOINT_LEARNER_REFLECTION.knowledge,
    skills: LUKE_MIDPOINT_LEARNER_REFLECTION.skills,
    attitudes: LUKE_MIDPOINT_LEARNER_REFLECTION.attitudes,
    supervisorComments: LUKE_MIDPOINT_LEARNER_REFLECTION.supervisorComments,
    learningNeeds: "Luke needs to recognise that previous ward experience does not remove the need for active learning, supervision and evidence at Part Two level. He needs to improve professional boundaries, punctuality, honesty about attendance, documentation and communication with the wider team.",
    achievementPlan: "Luke will work to the active Plan of Action. He will report to Jake at the start and end of each rostered shift, identify learning needs for that shift, seek supervision before unfamiliar tasks, and complete a short reflective note on professional boundaries and safe escalation before the review date.",
    supervisorSigned: true,
    locked: true
  },
  finalInterview: {
    knowledge: "",
    skills: "",
    attitudes: "",
    supervisorComments: "",
    learningNeeds: "",
    achievementPlan: "",
    planRequired: "",
    academicAssessorInformed: "",
    assessorSigned: false,
    locked: true
  },
  serviceUserFeedback: {
    respondentType: "Patient/Service User",
    cared: "Very Happy",
    listened: "Very Happy",
    understood: "Very Happy",
    talked: "Very Happy",
    respect: "Very Happy",
    didWell: "Luke spent a lot of time with me and made me feel like he was a friend rather than a patient. He told me about his own life and said I could ask for him whenever I felt low. He made me laugh, brought me extra snacks when I asked, and said he would try to make sure I got the staff I preferred on shift.",
    couldImprove: "I cannot think of much because he was really kind. Maybe he could check with the nurses before promising things, because one nurse later said some things were not allowed and Luke should not have said yes without asking.",
    supervisorSigned: true,
    locked: true
  },
  additionalFeedback: {
    feedbackType: "",
    communicationFeedback: "",
    nameDesignation: "",
    supervisorSigned: false,
    locked: false
  },
  timesheets: {
    removedActivityIds: [],
    weeks: [
      {
        id: "2026-07-13",
        weekCommencing: "13 July 2026",
        status: "Signed by Jake Pegg",
        locked: true,
        totalHours: 37.5,
        activities: [
          { id: "2026-07-13-mon", day: "Monday", date: "13 July 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-07-14-tue", day: "Tuesday", date: "14 July 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-07-16-thu", day: "Thursday", date: "16 July 2026", type: "Practice", start: "07:00", end: "19:00", breakMinutes: 60, hours: 11, supervisorSigned: true },
          { id: "2026-07-17-fri", day: "Friday", date: "17 July 2026", type: "Study day", start: "09:00", end: "12:00", breakMinutes: 0, hours: 3, supervisorSigned: true }
        ]
      },
      {
        id: "2026-07-20",
        weekCommencing: "20 July 2026",
        status: "Signed by Jake Pegg",
        locked: true,
        totalHours: 36.75,
        activities: [
          { id: "2026-07-20-mon", day: "Monday", date: "20 July 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-07-22-wed", day: "Wednesday", date: "22 July 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-07-23-thu", day: "Thursday", date: "23 July 2026", type: "Practice", start: "07:00", end: "19:15", breakMinutes: 60, hours: 11.25, supervisorSigned: true },
          { id: "2026-07-24-fri", day: "Friday", date: "24 July 2026", type: "Huddle / reflection", start: "10:00", end: "12:00", breakMinutes: 0, hours: 2, supervisorSigned: true }
        ]
      },
      {
        id: "2026-07-27",
        weekCommencing: "27 July 2026",
        status: "Signed by Jake Pegg",
        locked: true,
        totalHours: 38,
        activities: [
          { id: "2026-07-27-mon", day: "Monday", date: "27 July 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-07-28-tue", day: "Tuesday", date: "28 July 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-07-30-thu", day: "Thursday", date: "30 July 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-07-31-fri", day: "Friday", date: "31 July 2026", type: "Supervised learning", start: "09:00", end: "11:45", breakMinutes: 0, hours: 2.75, supervisorSigned: true }
        ]
      },
      {
        id: "2026-08-03",
        weekCommencing: "3 August 2026",
        status: "Signed by Jake Pegg",
        locked: true,
        totalHours: 37.25,
        activities: [
          { id: "2026-08-03-mon", day: "Monday", date: "3 August 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-08-04-tue", day: "Tuesday", date: "4 August 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: true },
          { id: "2026-08-06-thu", day: "Thursday", date: "6 August 2026", type: "Practice", start: "07:00", end: "19:00", breakMinutes: 60, hours: 11, supervisorSigned: true },
          { id: "2026-08-07-fri", day: "Friday", date: "7 August 2026", type: "Spoke / reflection", start: "09:00", end: "11:45", breakMinutes: 0, hours: 2.75, supervisorSigned: true }
        ]
      },
      {
        id: "2026-08-10",
        weekCommencing: "10 August 2026",
        status: "Awaiting supervisor review",
        locked: false,
        activities: [
          { id: "2026-08-10-mon", day: "Monday", date: "10 August 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: false, removed: false },
          { id: "2026-08-11-tue", day: "Tuesday", date: "11 August 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: false, removed: false },
          { id: "2026-08-12-wed", day: "Wednesday", date: "12 August 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: false, removed: false },
          { id: "2026-08-13-thu", day: "Thursday", date: "13 August 2026", type: "Practice", start: "07:00", end: "19:30", breakMinutes: 45, hours: 11.75, supervisorSigned: false, removed: false }
        ]
      }
    ]
  }
};

export const placementFields = [
  ["placementName", "Placement", false],
  ["organisation", "Organisation", false],
  ["fromDate", "From", false],
  ["toDate", "To", false],
  ["placementTelephone", "Placement telephone number", false],
  ["placementEmailOne", "Placement contact email", false]
];

export const contactSections = [
  { heading: "PEF / Practice Education Link Nurse", fields: [["pefName", "Name", false], ["pefDesignation", "Designation", false], ["pefEmail", "Contact email address", false]] },
  { heading: "Practice Supervisor Details", fields: [["supervisorName", "Name", false], ["supervisorDesignation", "Designation", false], ["supervisorEmail", "Contact email address", false]] },
  { heading: "Practice Assessor Details", fields: [["assessorName", "Name", false], ["assessorDesignation", "Designation", false], ["assessorEmail", "Contact email address", false]] },
  { heading: "Academic Assessor Details", fields: [["academicAssessorName", "Name", false], ["academicAssessorDesignation", "Designation", false], ["academicAssessorEmail", "Contact email address", false]] }
];
