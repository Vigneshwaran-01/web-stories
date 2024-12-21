import './globals.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata = {
  title: 'Web Stories',
  description: 'Visual Stories Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="http://localhost:3000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
