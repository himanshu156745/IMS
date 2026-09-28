import { CheckCircle2, Circle } from "lucide-react";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import { profileChecklist, studentProfile } from "../data/Data";

const Percent = studentProfile.profileCompletionPercent

export default function ProfileCompletion() {
    return (
        <Card className="p-5 sm:p-6">
            <SectionHeader title="Complete Your Profile" />

            <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-600">Profile strength</span>
                    <span className="font-semibold text-indigo-600">{Percent}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all"
                        style={{ width: `${Percent}%` }}
                    />
                </div>
            </div>

            <ul className="mb-5 space-y-2.5">
                {profileChecklist.map((item) => (
                    <li key={item.id} className="flex items-center gap-2.5 text-sm">
                        {item.completed ? (
                            <CheckCircle2 className="h-[18px] w-[18px] flex-shrink-0 text-emerald-500" />
                        ) : (
                            <Circle className="h-[18px] w-[18px] flex-shrink-0 text-gray-300" />
                        )}
                        <span className={item.completed ? "text-gray-700" : "text-gray-400"}>{item.label}</span>
                    </li>
                ))}
            </ul>

            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                Complete Profile
            </button>
        </Card>
    );
}
