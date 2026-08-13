import {
  CheckCircle2,
  FileText,
  Code2,
  MessageSquare,
  Trophy,
} from "lucide-react";

const activities = [
  {
    title: "Completed React Hooks lesson",
    time: "Today, 2:30 PM",
    icon: CheckCircle2,
    iconClass: "text-green-400",
  },
  {
    title: "Resume analyzed",
    time: "Yesterday, 6:15 PM",
    icon: FileText,
    iconClass: "text-blue-400",
  },
  {
    title: "Completed 5 coding problems",
    time: "Yesterday, 4:20 PM",
    icon: Code2,
    iconClass: "text-purple-400",
  },
  {
    title: "Completed AI mock interview",
    time: "Aug 7, 7:45 PM",
    icon: MessageSquare,
    iconClass: "text-orange-400",
  },
  {
    title: "Career score increased to 92%",
    time: "Aug 6, 5:10 PM",
    icon: Trophy,
    iconClass: "text-yellow-400",
  },
];

export default function DashboardActivity() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Keep track of your recent progress.
          </p>
        </div>

        <button className="text-sm text-indigo-400 transition hover:text-indigo-300">
          View History
        </button>

      </div>

      <div className="mt-8 divide-y divide-white/5">

        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-center gap-4 py-5"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">

                <Icon
                  size={22}
                  className={activity.iconClass}
                />

              </div>

              <div className="flex-1">

                <p className="font-medium text-gray-200">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {activity.time}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}