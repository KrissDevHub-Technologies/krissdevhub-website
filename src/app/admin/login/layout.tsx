// The login page gets its own full-page layout, bypassing the admin sidebar.
// This overrides the parent /admin/layout.tsx for the /admin/login route.

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
