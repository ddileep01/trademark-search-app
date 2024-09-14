import './globals.css';

export const metadata = {
  title: 'Trademark Search',
  description: 'Search trademarks easily',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
