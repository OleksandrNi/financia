import { useUser } from "../firebase/useUser";

export default function ErrorPage() {
  const { user } = useUser();
  if (!user) return null;
  window.location.replace('/')
  return null
}
