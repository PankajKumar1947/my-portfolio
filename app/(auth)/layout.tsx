export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background with diagonal split */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Color Base */}
        <div className="absolute inset-0 bg-primary" />

        {/* Accent Color Diagonal Slice */}
        <div
          className="absolute right-0 bottom-0 w-[60%] h-full bg-accent"
          style={{ clipPath: 'polygon(100% 10% , 100% 100%, 0% 100%)' }}
        />

        {/* Subtle Overlays for Premium Feel */}
        <div className="absolute inset-0 bg-background/5 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl p-4">
        {children}
      </div>
    </div>
  );
}
