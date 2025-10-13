import React, { useState, useEffect } from "react";

export default function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const tick = () => {
    setCurrentDate(new Date());
  };
  useEffect(() => {
    const timerID = setInterval(tick, 1000);
        return () => {
      clearInterval(timerID);
    };
  }, []);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>⏰ Local Time Live Clock</h2>
      <h1>{currentDate.toLocaleTimeString()}</h1>
    </div>
  );
}
