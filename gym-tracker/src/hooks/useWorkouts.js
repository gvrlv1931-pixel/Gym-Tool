import { useState, useEffect, useCallback } from 'react';
import { EXERCISES } from '../data/exercises.js';

const STORAGE_KEY = 'gym_tool_workouts';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useWorkouts() {
  const [workouts, setWorkouts] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = useCallback((entry) => {
    const workout = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry };
    setWorkouts(prev => [workout, ...prev]);
    return workout;
  }, []);

  const deleteWorkout = useCallback((id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  }, []);

  const getLastWorkout = useCallback((exerciseId) => {
    return workouts.find(w => w.exerciseId === exerciseId) || null;
  }, [workouts]);

  const getPersonalRecord = useCallback((exerciseId) => {
    const matches = workouts.filter(w => w.exerciseId === exerciseId);
    if (!matches.length) return null;
    return Math.max(...matches.map(w => w.weight));
  }, [workouts]);

  const getDaysSince = useCallback((exerciseId) => {
    const match = workouts.find(w => w.exerciseId === exerciseId);
    if (!match) return null;
    return Math.floor((Date.now() - new Date(match.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  }, [workouts]);

  const getStaleSuggestions = useCallback((thresholdDays = 14) => {
    return EXERCISES.filter(ex => {
      const days = getDaysSince(ex.id);
      return days === null || days >= thresholdDays;
    });
  }, [getDaysSince]);

  return {
    workouts,
    addWorkout,
    deleteWorkout,
    getLastWorkout,
    getPersonalRecord,
    getDaysSince,
    getStaleSuggestions,
  };
}
