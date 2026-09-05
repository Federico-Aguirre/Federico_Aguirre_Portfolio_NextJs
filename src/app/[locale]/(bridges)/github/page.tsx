import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GitHub Profile | Federico Aguirre',
  description: 'Explora mis repositorios de código abierto, arquitectura de software y proyectos.',
  // ⚡ Next.js inyecta automáticamente la imagen 'opengraph-image.png' de esta carpeta
};

export default function GithubBridgePage() {
  const githubUrl = 'https://github.com/Federico-Aguirre';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirigiendo a GitHub...</h1>
      <p className="mb-6 text-gray-600">
        Si no eres redirigido automáticamente, haz clic en el siguiente botón:
      </p>
      <a
        href={githubUrl}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        Ir a mi perfil de GitHub
      </a>

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => { window.location.href = "${githubUrl}"; }, 1000);`,
        }}
      />
    </div>
  );
}