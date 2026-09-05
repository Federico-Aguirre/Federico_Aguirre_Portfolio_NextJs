import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GitHub Profile | Federico Aguirre',
  description: 'Explore my open-source repositories, software architecture, and projects.',
  // ⚡ Next.js automatically injects 'opengraph-image.png' from this directory
};

export default function GithubBridgePage() {
  const githubUrl = 'https://github.com/Federico-Aguirre';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to GitHub...</h1>
      <p className="mb-6 text-gray-600">
        If you are not redirected automatically, click the button below:
      </p>
      <a
        href={githubUrl}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        Go to my GitHub Profile
      </a>

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => { window.location.href = "${githubUrl}"; }, 1000);`,
        }}
      />
    </div>
  );
}