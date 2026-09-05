import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Degrees & Credentials | Federico Aguirre',
  description: 'Official academic diplomas, higher education degrees, and professional technical certifications.',
  // ⚡ Next.js inyecta automáticamente 'opengraph-image.png' de esta carpeta
};

export default function CredentialsBridgePage() {
  // Enlace público a carpeta de Google Drive
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