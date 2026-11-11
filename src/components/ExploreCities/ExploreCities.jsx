import React from 'react';

import { ArrowLeft } from 'lucide-react';
import SectionBadge from '../SectionBadge/SectionBadge';
import Button from '../button/Button';
import CityCard from '../CityCard/CityCard';
import Hom from "../../assets/Hom.jpg"
import Lak from "../../assets/Lak.jpg"
import Alep from "../../assets/Alep.jpg"
import Dam from "../../assets/Dam.jpg"

// مصفوفة الأوبجكت الخاصة بالمدن بناءً على التصميم
const CITIES_DATA = [
  {
    id: 1,
    cityName: 'حمص',
    description: 'قلب سوريا',
    image: Hom // استبدل بالمسار الصحيح أو رابط الصورة
  },
  {
    id: 2,
    cityName: 'اللاذقية',
    description: 'نسمة من البحر',
    image:Lak
  },
  {
    id: 3,
    cityName: 'حلب',
    description: 'عاصمة الشهباء',
    image:Alep
  },
  {
    id: 4,
    cityName: 'دمشق',
    description: 'مدينة الياسمين',
    image: Dam
  }
];

export default function ExploreSection() {
  return (
    <section className="py-12 px-4 md:px-12 bg-surface font-cairo dir-rtl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* الترويسة العليا (الهيدر، العنوان والزر) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          
          {/* الجانب الأيمن: البادج والعنوان والوصف */}
          <div className="flex flex-col items-start gap-2">
            <SectionBadge>اكتشف سوريا</SectionBadge>
            <h2 className="text-3xl md:text-4xl font-black text-text">
              على وين حاب تسافر؟
            </h2>
            <p className="text-sm text-muted font-bold">
              وجهات مختلفة ونفس الشعور الحلو لما تكون بالطريق.
            </p>
          </div>

          {/* الجانب الأيسر: زر (استكشف الرحلات) */}
          <div>
            <Button 
              variant="text" 
              icon={ArrowLeft} 
              iconPosition="left"
              to="/explore"
              className="text-primary font-bold hover:gap-3 transition-all"
            >
              استكشف الرحلات
            </Button>
          </div>

        </div>

        {/* شبكة الكروت (Grid) لعرض المدن */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CITIES_DATA.map((city) => (
            <CityCard 
              key={city.id}
              image={city.image}
              cityName={city.cityName}
              description={city.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}