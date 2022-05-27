import { db } from '@models';
import { getJustDate } from '@src/utils';
import { GoalItem, Repeat } from '@src/models/GoalItem';

export const resetDatabase = () => db.transaction('rw', db.goalsCollection, async () => {
  await Promise.all(db.tables.map((table) => table.clear()));
});

export const addGoal = (goalDetails :{
  title: string,
  duration: Number,
  repeat: Repeat | string,
  start: Date,
  finish: Date,
  createdAt: Date}) => {
  const currentDate = getJustDate(new Date());
  const goals : GoalItem = { ...goalDetails, createdAt: currentDate };
  db.transaction('rw', db.goalsCollection, async () => {
    await db
      .goalsCollection
      .add(goals);
  }).catch((e) => {
    console.log(e.stack || e);
  });
};

export const removeGoal = (goalId: number) => {
  db.transaction('rw', db.goalsCollection, async () => {
    await db.goalsCollection.delete(goalId);
  }).catch((e) => {
    console.log(e.stack || e);
  });
};

export const getAllGoals = async () => {
  const allGoals = await db.goalsCollection.toArray();
  return allGoals;
};

export const getGoalsOnDate = async (date: Date) => {
  db.transaction('rw', db.goalsCollection, async () => {
    const goalsList = await db.goalsCollection.where('start').equals(date);
    return goalsList;
  }).catch((e) => {
    console.log(e.stack || e);
  });
};
