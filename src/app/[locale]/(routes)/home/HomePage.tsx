import { Suspense } from "react";
import HomeClientWrapper from "./_homeComponents/HomeClientWrapper";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeClientWrapper />
    </Suspense>
  );
}
