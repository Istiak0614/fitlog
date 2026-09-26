import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-lg bg-[#111318] transition duration-300 hover:border-[#d7ff00]">
      <div className="relative aspect-[2/1] overflow-hidden bg-[#181818]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-fit transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="px-3 py-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#d7ff00] px-2 py-[3px] text-[8px] font-black uppercase leading-none text-black"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="display-font text-[14px] font-black uppercase leading-tight text-white transition group-hover:text-[#d7ff00]">
          {workout.name}
        </h3>
        <p className="mt-1 text-[9px] text-white/40">
          {workout.equipment}
        </p>
        <div className="mt-3 flex items-center gap-4 border-t border-white/[0.06] pt-3 text-[9px] text-white/45">
          <span className="flex items-center gap-1">
            <Clock3 size={10} strokeWidth={1.5} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={10} strokeWidth={1.5} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={10} strokeWidth={1.5} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;