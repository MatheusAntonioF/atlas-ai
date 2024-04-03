import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ClerkProvider
                        appearance={{
                            baseTheme: dark,
                        }}
                    >
                        <div className="h-screen w-full mx-auto max-w-screen-xl">
                            <div className="h-full flex flex-col">
                                <Header />
                                <main className="h-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                                    {children}
                                    <Toaster />
                                </main>
                            </div>
                        </div>
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
