import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Genera wrappers de navegación e i18n tipados con la configuración de routing
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);