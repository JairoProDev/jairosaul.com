import PlasticityProvider from '@/components/layout/PlasticityProvider';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PlasticityProvider>{children}</PlasticityProvider>;
}
