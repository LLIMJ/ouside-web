import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Link href={`/video-player`}>비디오플레이어</Link>
      <br />
      <Link href={`/last`}>마지막 증언 화면</Link>
    </>
  );
}
