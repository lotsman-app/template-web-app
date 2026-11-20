import type { ReactNode } from 'react';
import './theme.css';

export const metadata = {
  title: 'Web app',
  description: 'A web app that builds and deploys without any setup.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
