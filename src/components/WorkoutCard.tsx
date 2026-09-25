import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-[#d7ff00]/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#181818]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="border border-[#d7ff00]/35 bg-[#d7ff00]/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#d7ff00]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="display-font text-2xl font-black uppercase leading-tight text-white transition group-hover:text-[#d7ff00]">
          {workout.name}
        </h3>
        <p className="mt-2 text-sm text-white/45">{workout.equipment}</p>

        <div className="mt-5 grid grid-cols-3 border-t border-white/10 pt-4 text-xs text-white/58">
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} className="text-[#f05656]" />
            {workout.duration} min
          </span>
          <span className="flex items-center justify-center gap-1.5">
            <Flame size={14} className="text-[#f05656]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center justify-end gap-1.5">
            <Star size={14} className="text-[#f05656]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
