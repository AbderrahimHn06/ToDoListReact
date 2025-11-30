import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

 

  return (
    <div style={style.container}>
      <h1 style={style.title}>Settings</h1>

      <div style={style.card}>
        {/* Enable Notifications */}
        <div style={style.row}>
          <span style={style.label}>Enable Notifications</span>
          <div
            style={{
              ...style.toggleContainer,
              background: notifications ? "#1b4db3" : "#d7e2f5",
            }}
            onClick={() => setNotifications(!notifications)}
          >
            <div
              style={{
                ...style.toggleCircle,
                transform: notifications ? "translateX(22px)" : "translateX(0)",
              }}
            ></div>
          </div>
        </div>

        {/* Dark Mode */}
        <div style={style.row}>
          <span style={style.label}>Dark Mode</span>
          <div
            style={{
              ...style.toggleContainer,
              background: darkMode ? "#1b4db3" : "#d7e2f5",
            }}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div
              style={{
                ...style.toggleCircle,
                transform: darkMode ? "translateX(22px)" : "translateX(0)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

 const style:any = {
    container: {
      width: "100%",
      maxWidth: "600px",
      padding: "24px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "28px",
      fontWeight: 700,
      marginBottom: "20px",
      color: "#1b4db3",
    },
    card: {
      background: "#ffffff",
      padding: "22px",
      borderRadius: "18px",
      boxShadow: "0 4px 12px rgba(0, 70, 160, 0.12)",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      border: "1px solid #e5eaf5",
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    label: {
      fontSize: "17px",
      fontWeight: 500,
      color: "#2a2a2a",
    },
    toggleContainer: {
      width: "50px",
      height: "28px",
      borderRadius: "14px",
      background: "#d7e2f5",
      position: "relative",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    toggleCircle: {
      position: "absolute",
      top: "2px",
      left: "2px",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      transition: "transform 0.3s",
    },
  };
