import {createNavigation} from 'next-intl/navigation';

export const {
  Link,           // reemplaza next/link por este
    useRouter,
    usePathname,
    redirect
} = createNavigation({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localePrefix: 'always'
});
