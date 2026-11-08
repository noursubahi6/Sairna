import { NavLink } from "react-router-dom";

export default function FooterColumn({ title, links = [] }) {
  return (
    <div className="flex flex-col gap-3.5 items-start">
      {/* عنوان العمود */}
      <h4 className="text-white text-xs my-1 font-extrabold">
        {title}
      </h4>

      {/* قائمة الروابط النافجة إلى صفحات الموقع */}
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.path || "/"}
          className={({ isActive }) =>
            `text-[11px] font-bold no-underline whitespace-nowrap transition-colors duration-200 ${
              isActive
                ? "text-primary" // إذا كانت الصفحة الحالية مفعلة
                : "text-[#a3c0ca] hover:text-primary" // لون الخمول ولون الهوفر عند الوقوف بالماوس
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}