import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex items-center justify-between p-4 sm:p-6">
        <Link href="/" className="flex items-center space-x-2 font-bold text-2xl text-primary hover:opacity-90">
          <span>📚</span>
          <span>WriterHub</span>
        </Link>
      </header>
      {children}
    </>
  );
}
