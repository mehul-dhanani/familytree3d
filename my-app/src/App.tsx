import { useState } from "react";

function App() {
  const [showEditor, setShowEditor] = useState(false);
  const [person, setPerson] = useState<{
    name: string;
    dob: string;
    location: string;
    photo: string;
  }>({ name: "", dob: "", location: "", photo: "" });
  const [nodes, setNodes] = useState<
    { name: string; dob: string; location: string; photo: string }[]
  >([]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* TOP RIGHT BUTTON */}
      {/* TOP RIGHT BUTTON - Always on top */}
      <div
        style={{
          position: "fixed",
          top: "clamp(20px, 5vw, 40px)",
          right: "clamp(20px, 5vw, 40px)",
          zIndex: 2000, // Higher than title (10) + nodes
        }}
      >
        <button
          onClick={() => {
            console.log("New Tree clicked!"); // Debug log
            setShowEditor(true);
          }}
          style={{
            background:
              "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 50%, #3730a3 100%)",
            color: "white",
            padding: "clamp(12px, 4vw, 18px) clamp(24px, 6vw, 36px)",
            borderRadius: "9999px",
            border: "none",
            fontSize: "clamp(16px, 4vw, 18px)",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
            minWidth: "clamp(140px, 20vw, 160px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.transform = "translateY(-4px) scale(1.05)";
            target.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.6)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.transform = "translateY(0) scale(1)";
            target.style.boxShadow = "0 10px 30px rgba(139, 92, 246, 0.4)";
          }}
        >
          + New Tree
        </button>
      </div>

      {/* WELCOME SCREEN - TOP CENTER */}
      {!showEditor && (
        <div style={{ position: "relative", height: "100vh" }}>
          {/* TITLE - ALWAYS VISIBLE, TOP 10% */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              maxWidth: "500px",
              zIndex: 10,
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: nodes.length > 0 ? "36px" : "64px", // Smaller when node shown
                fontWeight: "bold",
                margin: "0 0 16px 0",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Family Trees!!
            </h1>
            {nodes.length === 0 && (
              <>
                <p
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "20px",
                    margin: "0 0 8px 0",
                  }}
                >
                  Create and explore your family history
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "16px",
                    margin: 0,
                  }}
                >
                  Start with a new tree or load existing
                </p>
              </>
            )}
          </div>

          {/* NODES - CENTER BELOW TITLE */}
          {nodes.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "55%", // Below title, no overlap
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {nodes.map((node, index) => (
                <div
                  key={index}
                  style={{
                    width: "320px",
                    minHeight: "180px",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                      boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
                    }}
                  >
                    👤
                  </div>
                  <h3
                    style={{
                      color: "#1e293b",
                      fontSize: "28px",
                      fontWeight: "700",
                      margin: "0 0 8px 0",
                      textAlign: "center",
                    }}
                  >
                    {node.name || "Unnamed"}
                  </h3>
                  {node.dob && (
                    <p
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "18px",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {node.dob}
                    </p>
                  )}
                  {node.location && (
                    <p
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      {node.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EDITOR MODAL */}
      {showEditor && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px",
              width: "100%",
              maxWidth: "480px",
              maxHeight: "80vh",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Add New Person
            </h2>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Full Name *
              </label>
              <input
                value={person.name}
                onChange={(e) => setPerson({ ...person, name: e.target.value })}
                placeholder="Enter full name *"
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Date of Birth (optional)
              </label>
              <input
                value={person.dob}
                onChange={(e) => setPerson({ ...person, dob: e.target.value })}
                placeholder="DD-MM-YYYY"
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Location (optional)
              </label>
              <input
                value={person.location}
                onChange={(e) =>
                  setPerson({ ...person, location: e.target.value })
                }
                placeholder="City, Country"
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setShowEditor(false)}
                style={{
                  padding: "14px 28px",
                  backgroundColor: "#f3f4f6",
                  color: "#6b7280",
                  border: "1px solid #d1d5db",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (person.name.trim()) {
                    console.log("Saving person:", person); //
                    setNodes([person]);
                    setShowEditor(false);
                    setPerson({ name: "", dob: "", location: "", photo: "" });
                  } else {
                    alert("Name is required!");
                  }
                }}
                style={{
                  padding: "14px 28px",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  flex: 1,
                  boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
                }}
              >
                Save Person
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
