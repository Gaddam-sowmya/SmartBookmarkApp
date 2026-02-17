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
      <body className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
        {children}
      </body>
    </html>
  );
}
