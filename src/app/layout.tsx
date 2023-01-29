import { supabaseServer } from '@/utils/supabaseServer'
import { AuthArea } from '@/components/AuthArea'
import { AuthProvider } from '@/components/AuthProvider'
import './styles/globals.css'
import Link from 'next/link'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serverClient = supabaseServer()
  const { data: { session } } = await serverClient.auth.getSession()

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <>
        <head />
        <body>
          <AuthProvider accessToken={accessToken}>
            <main className="container mx-auto p-8">
              <header className="flex-gap mb-12 flex items-center justify-between gap-8 border-b border-slate-200 pb-8">
                <div className="flex gap-4 items-baseline">
                  <Link className="text-2xl font-extrabold" href="/">Rewali</Link>
                  <span className="underline-offset-2">Easy <u className="underline decoration-slate-400">Re</u>ading & <u className="underline decoration-slate-400">Wa</u>tching <u className="underline decoration-slate-400">Li</u>st</span>
                </div>
                <AuthArea />
              </header>
              {children}
            </main>
          </AuthProvider>
        </body>
      </>
    </html>
  )
}
