'use client';

import Chat from '@/components/Chat';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Home() {
  const { id } = useParams();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Chat userId={id} />
    </main>
  );
}
