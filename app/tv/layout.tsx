export default function TvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="tv-menu-shell"
      style={{
        minHeight: "100dvh",
        background: "#121212",
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </div>
  );
}
