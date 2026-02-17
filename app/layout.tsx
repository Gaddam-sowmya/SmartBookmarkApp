import "./globals.css";

export const metadata = {
  title: "Smart Bookmark",
  description: "Private realtime bookmark manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0f172a] relative overflow-x-hidden">
        
        {/* Background Glow Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/30 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full" />
        </div>

        {children}
      </body>
    </html>
  );
}
