import React from 'react';
import { 
  Palette, 
  Camera, 
  PenTool, 
  Video, 
  Music, 
  Brush, 
  Code, 
  Gamepad2, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ icon: Icon, label, color }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/all-contests?category=${encodeURIComponent(label)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 group border border-transparent hover:border-gray-100"
    >
      <div 
        className={`p-4 rounded-xl transition-colors duration-300 group-hover:scale-110 transform`}
        style={{ backgroundColor: `${color}15` }} // 15 is roughly 10% opacity in hex
      >
        <Icon 
          size={32} 
          style={{ color: color }}
          className="transition-colors duration-300"
        />
      </div>
      <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </div>
  );
};

const CategorySection = () => {
  const categories = [
    { icon: Palette, label: 'Design', color: '#FF4D8C' },
    { icon: PenTool, label: 'Writing', color: '#00BBE4' },
    { icon: Code, label: 'Coding', color: '#5856D6' },
    { icon: Camera, label: 'Photography', color: '#FF9500' },
    { icon: Video, label: 'Video', color: '#FF3B30' },
    { icon: Music, label: 'Music', color: '#AF52DE' },
    { icon: Brush, label: 'Art', color: '#34C759' },
    { icon: GraduationCap, label: 'Education', color: '#30B0C7' },
    { icon: Gamepad2, label: 'Gaming', color: '#A2845E' },
    { icon: Briefcase, label: 'Business', color: '#8E8E93' },
    { icon: Palette, label: 'Other', color: '#6c757d' } 
  ];

  return (
    <section className="py-16 px-4 bg-[#FAFAFA] font-urbanist">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600">
            Find contests that match your passion and expertise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              icon={category.icon}
              label={category.label}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
