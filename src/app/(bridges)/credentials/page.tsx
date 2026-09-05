import type { Metadata } from 'next';

export const metadata: Metadata = {
  // ⚡ Necesario para que Next.js cree la URL absoluta de la imagen Open Graph
  metadataBase: new URL('https://federico-aguirre-portafolio-next-js.vercel.app'),
  title: 'Academic Degrees & Credentials | Federico Aguirre',
  description: 'Official academic diplomas, higher education degrees, and verified professional technical certifications for Federico Aguirre.',
  openGraph: {
    title: 'Academic Degrees & Credentials | Federico Aguirre',
    description: 'Official academic diplomas, higher education degrees, and verified professional technical certifications for Federico Aguirre.',
  },
};

export default function CredentialsBridgePage() {
  const driveUrl = 'https://drive.google.com/drive/folders/10ba68nUmdU_Oy7nGn8oUexGqy85KSSnU?usp=sharing';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Credentials & Degrees...</h1>
      <p className="mb-6 text-gray-600">
        If you are not redirected automatically, click the button below:
      </p>
      <a
        href={driveUrl}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        View Credentials on Google Drive
      </a>

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => { window.location.href = "${driveUrl}"; }, 1000);`,
        }}
      />
    </div>
  );
}