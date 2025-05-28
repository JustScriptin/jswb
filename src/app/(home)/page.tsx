import type { ReactElement } from "react";

import { HomePage } from "./components";

export default function Home(): ReactElement {
  return <HomePage />;
}
Home.displayName = "Home";

export const dynamic = "force-static";
