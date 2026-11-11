import React from 'react';
import { Link } from 'react-router-dom'; // استبدل بـ import Link from "next/link" إذا كنت تستخدم Next.js
import { ArrowLeft } from 'lucide-react';

export default function CityCard({ image, cityName, description, to = "/book" }) {
  return (
    <Link 
      to={to} 
      className="group relative h-[420px] rounded-[24px] overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl block"
    >
      {/* صورة الخلفية مع تأثير تكبير خفيف عند الهوفر */}
      <img 
        src={image} 
        alt={cityName} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      
      {/* تدرج لوني داكن أسفل الصورة لظهور النصوص بوضوح */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

      {/* محتوى الكارت (الأسفل) */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between z-10">
        <div className="flex flex-col text-right">
          <h3 className="text-2xl font-black text-white mb-1">{cityName}</h3>
          <p className="text-xs text-gray-200 font-medium">{description}</p>
        </div>

        {/* الزر الدائر مع السهم الذي يتغير لونه وتأثيره */}
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-primary shadow-md">
          <ArrowLeft className="w-4 h-4 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}