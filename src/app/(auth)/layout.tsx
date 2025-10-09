import { Logo } from '@/components/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8">
        <Logo />
      </div>
      {children}
    </main>
  );
}
