import React from "react";
export default function DatePicker({ selectedDay, setSelectedDay }) {
  return (
    <div className="mb-4">
      <label>Select a day: </label>
      <input
        type="date"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="border p-2 rounded"
      />
    </div>
  );
}
