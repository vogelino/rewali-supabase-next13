import { supabaseServer } from '@/utils/supabaseServer'
import { AuthArea } from './components/AuthArea'
import './styles/globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serverClient = supabaseServer()
  const { data: { session: initialSession } } = await serverClient.auth.getSession()
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className="container mx-auto p-8">
          <header className="flex-gap mb-12 flex items-center justify-between gap-8 border-b border-slate-200 pb-8">
            <span className="text-2xl font-extrabold">Rewali</span>
            <AuthArea initialSession={initialSession} />
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}
