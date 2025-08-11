import ProfileClient from "@/components/profile/ProfileClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MyProfilePage() {
  return <ProfileClient />;
}
