import DashboardLayout from "@/components/layout/dashboard-layout";

type BaseDashboardLayoutProps = {
  children: React.ReactNode;
};

export default function BaseDashboardLayout({
  children,
}: BaseDashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
