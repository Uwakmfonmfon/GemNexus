 import ProfileCard from "./components/ProfileCard";

  export default function App() {
    return (
      <main className="min-h-screen bg-slate-50 grid place-items-center px-4 py-10 font-body">
        <ProfileCard
          name="Peter Parker"
          role="Best Actor · Marvel"
          avatarUrl="public\avatar.png"
        />
      </main>
    );
  }