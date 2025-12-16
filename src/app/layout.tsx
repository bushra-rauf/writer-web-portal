import './globals.css';
import { QueryClientProvider } from '@/providers/query-client-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'WriterHub - Publish Your Books',
  description: 'A digital marketplace for independent writers to self-publish and sell books.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Toaster richColors position="top-center" />
        <LanguageProvider>
          <QueryClientProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </QueryClientProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
