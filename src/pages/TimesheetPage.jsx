import React from "react";
import { PageCard } from "../components/common";
import { activeTimesheetActivities, formatHours, timesheetWeekTotal } from "../utils/recordUtils";
import { styles } from "../styles/styles";

function activityStatus(activity) {
  if (activity.removed) return "Removed";
  if (activity.supervisorSigned) return "Signed";
  return "Awaiting review";
}

function ActivityTable({ week, onSignActivity, onRemoveActivity }) {
  const visibleActivities = week.activities || [];
  return (
    <div style={{ overflow: "hidden", borderRadius: 16, border: "1px solid #e2e8f0", marginTop: 12 }}>
      <div style={{ ...styles.tableHeader, gridTemplateColumns: "1.1fr 1.1fr 0.9fr 0.8fr 0.8fr 0.8fr 0.9fr 1.4fr" }}>
        <span>Day</span>
        <span>Date</span>
        <span>Activity</span>
        <span>Start</span>
        <span>End</span>
        <span>Break</span>
        <span>Hours</span>
        <span style={{ textAlign: "center" }}>Action</span>
      </div>
      {visibleActivities.map((activity) => {
        const disabled = week.locked || activity.removed;
        return (
          <div key={activity.id} style={{ ...styles.tableRow, gridTemplateColumns: "1.1fr 1.1fr 0.9fr 0.8fr 0.8fr 0.8fr 0.9fr 1.4fr", background: activity.removed ? "#fee2e2" : week.locked ? "#f1f5f9" : "white", color: activity.removed ? "#991b1b" : week.locked ? "#64748b" : "#0f172a" }}>
            <strong>{activity.day}</strong>
            <span>{activity.date}</span>
            <span>{activity.type}</span>
            <span>{activity.start}</span>
            <span>{activity.end}</span>
            <span>{activity.breakMinutes} mins</span>
            <strong>{formatHours(activity.hours)}</strong>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{ width: "100%", textAlign: "center", fontSize: 12, fontWeight: 800 }}>{activityStatus(activity)}</span>
              {!week.locked && !activity.removed ? (
                <>
                  <button
                    disabled={activity.supervisorSigned}
                    onClick={() => onSignActivity(week.id, activity.id)}
                    style={{ ...styles.button, padding: "7px 9px", background: activity.supervisorSigned ? "#cbd5e1" : "#15803d", color: activity.supervisorSigned ? "#475569" : "white", cursor: activity.supervisorSigned ? "not-allowed" : "pointer" }}
                  >
                    Sign
                  </button>
                  <button
                    onClick={() => onRemoveActivity(week.id, activity.id)}
                    style={{ ...styles.button, padding: "7px 9px", background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" }}
                  >
                    Remove activity
                  </button>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TimesheetPage({ record, onSignActivity, onRemoveActivity }) {
  const weeks = record.timesheets?.weeks || [];
  const previousWeeks = weeks.filter((week) => week.locked);
  const currentWeek = weeks.find((week) => !week.locked) || weeks[weeks.length - 1];
  const currentTotal = timesheetWeekTotal(currentWeek);

  return (
    <PageCard title="Timesheets" subtitle="Luke has given you access to review and sign this week's timesheet entries." locked={false}>
      <div style={{ borderRadius: 16, background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e3a8a", padding: 14, marginBottom: 18, fontSize: 14, lineHeight: 1.5 }}>
        <strong>Supervisor reminder:</strong> only sign shifts you are comfortable confirming. Use the separate ward student rota on Blackboard to check whether Luke attended each shift. If an activity does not match what you can verify, use <strong>Remove activity</strong> for that shift.
      </div>

      <h3 style={{ margin: "0 0 10px", fontSize: 18 }}>Previously signed weeks</h3>
      <div style={{ overflow: "hidden", borderRadius: 16, border: "1px solid #e2e8f0", marginBottom: 22 }}>
        <div style={{ ...styles.tableHeader, gridTemplateColumns: "1fr 1fr 1fr" }}>
          <span>Week commencing</span>
          <span>Total hours</span>
          <span>Status</span>
        </div>
        {previousWeeks.map((week) => (
          <div key={week.id} style={{ ...styles.tableRow, gridTemplateColumns: "1fr 1fr 1fr", background: "#f0fdf4", color: "#166534" }}>
            <strong>{week.weekCommencing}</strong>
            <span>{formatHours(week.totalHours ?? timesheetWeekTotal(week))}</span>
            <span>{week.status}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: 18, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Week commencing {currentWeek.weekCommencing}</h3>
            <div style={{ borderRadius: 999, background: currentTotal > 48 ? "#fee2e2" : "#e0f2fe", color: currentTotal > 48 ? "#991b1b" : "#075985", padding: "8px 12px", fontWeight: 900 }}>{formatHours(currentTotal)}</div>
          </div>
          <ActivityTable week={currentWeek} onSignActivity={onSignActivity} onRemoveActivity={onRemoveActivity} />
        </div>
      </div>

      {record.timesheets?.removedActivityIds?.includes("2026-08-11-tue") ? (
        <div style={{ marginTop: 18, borderRadius: 16, background: "#dcfce7", border: "1px solid #bbf7d0", color: "#166534", padding: 14, fontWeight: 800 }}>
          Tuesday's activity has been removed from the timesheet.
        </div>
      ) : null}
    </PageCard>
  );
}
