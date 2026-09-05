import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://federico-aguirre-portafolio-next-js.vercel.app'),
  title: 'Curriculum Vitae & Resume | Federico Aguirre',
  description: 'Official Resume and Curriculum Vitae (CV) of Federico Aguirre. Full Stack Software Engineer specializing in React, Next.js, and TypeScript.',
  openGraph: {
    title: 'Curriculum Vitae & Resume | Federico Aguirre',
    description: 'Official Resume and Curriculum Vitae (CV) of Federico Aguirre. Full Stack Software Engineer specializing in React, Next.js, and TypeScript.',
  },
};

export default function ResumeBridgePage() {
  // ⚠️ Reemplaza con el enlace público directo a tu CV en PDF en Google Drive
  const driveUrl = 'https://drive.google.com/file/d/TU_ID_DEL_ARCHIVO/view?usp=sharing';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Resume / CV...</h1>
      <p className="mb-6 text-gray-600">
        If you are not redirected automatically, click the button below:
      </p>
      <a
        href={driveUrl}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        View Resume on Google Drive
      </a>

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => { window.location.href = "${driveUrl}"; }, 1000);`,
        }}
      />
    </div>
  );
}