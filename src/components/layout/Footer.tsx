export default function Footer() {
  return (
    <footer style={{
      padding: "2rem",
      textAlign: "center",
      marginTop: "auto", // Push to bottom
    }}>
      <span style={{
        fontSize: "calc(var(--text-sm) - 5px)",
        color: "var(--text-secondary)",
        letterSpacing: "0.1em",
        opacity: 0.4,
      }} className="mono">
        Keep Looking.
      </span>
    </footer>
  );
}
