"use client";

import Link from "next/link";
import FormSliders from "../../form/FormSliders";

export default function EditSlider({ params }) {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg mt-14">
        <h1 className="font-bold md:text-3xl text-2xl mb-8">
          Edit Slider /{" "}
          <span className="text-lg bg-blue-600 px-4 py-3 text-white rounded-md md:inline-block block">
            <Link href="/dashboard/sliders/">List Sliders</Link>
          </span>
        </h1>
        <FormSliders sliderId={params.id} />
      </div>
    </div>
  );
}
