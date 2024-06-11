import Link from "next/link";

export default function ProjectListPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-end">
        <Link href="/dashboard/create">
          <button className="border rounded p-3 m-2">Create Project</button>
        </Link>
      </div>
      <p className="text-center">You have no projects</p>
    </div>
  );
}
