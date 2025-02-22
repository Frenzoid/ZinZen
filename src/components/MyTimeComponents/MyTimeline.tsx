/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { darkModeState } from "@src/store";
import { ITask } from "@src/Interfaces/Task";

import "./MyTimeline.scss";

export const MyTimeline = ({ myTasks, impossible }: {myTasks: ITask[], impossible: ITask[]}) => {
  const navigate = useNavigate();
  const darkModeStatus = useRecoilValue(darkModeState);
  const [displayOptionsIndex, setDisplayOptionsIndex] = useState("root");
  const [showScheduled, setShowScheduled] = useState(true);

  const handleView = () => { setShowScheduled(!showScheduled); };
  return (
    <>
      {impossible.length > 0 && (
        <div className={`timeline-view${darkModeStatus ? "-dark" : ""}`}>
          <button type="button" className={`${showScheduled && "activeView"}`} onClick={handleView}>Scheduled</button>
          <button type="button" className={`${!showScheduled && "activeView"}`} onClick={handleView}>Impossible</button>
        </div>
      )}
      <div className={`MTL-display-${darkModeStatus ? "dark" : "light"}`}>
        { (showScheduled ? myTasks : impossible).map((task) => {
          let startTime = task.start ? task.start.split("T")[1].slice(0, 2) : null;
          const endTime = task.deadline ? task.deadline.split("T")[1].slice(0, 2) : null;
          if (startTime && endTime) {
            startTime = Number(startTime) > Number(endTime) ? "0" : startTime;
          }
          return (
            <div>
              <div style={{
                display: "flex" }}
              >
                <button
                  type="button"
                  className="MTL-circle"
                  style={{ backgroundColor: `${task.goalColor}` }}
                >.
                </button>
                <div style={{ marginLeft: "11px", color: `${task.goalColor}` }}>
                  <button
                    type="button"
                    className="MTL-taskTitle"
                    onClick={() => {
                      setDisplayOptionsIndex(task.goalid);
                      if (displayOptionsIndex === task.goalid) {
                        navigate("/MyGoals", { state: { isRootGoal: task.parentGoalId === "root", openGoalOfId: task.goalid } });
                      }
                    }}
                  >
                    {task.title}
                  </button>
                  <p className="MTL-goalTiming">
                    {startTime ? `${startTime}:00` : ""}-{endTime ? `${endTime}:00` : ""}
                  </p>
                </div>
              </div>
              { displayOptionsIndex === task.goalid ? (
                <div className="MTL-options">
                  <button type="button"> Forget</button><div />
                  <button type="button"> Reschedule</button><div />
                  <button type="button"> Done</button><div />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
