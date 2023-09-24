import Chat from '@/components/Chat';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/chat/1">Chat 1</Link>
          </li>
          <li>
            <Link href="/chat/2">Chat 2</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
