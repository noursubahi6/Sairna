// src/constants/companyStyles.js

export const COMPANY_STYLES = {
  1: { // الشام للنقل (تجريبي)
    rating: 4.9,
    subtitle: 'الأعلى تقييماً',
    bgBadge: 'bg-[#d5f5ef] text-[#0d9488]',
    borderColor: 'border-[var(--primary)]',
    dotColor: 'bg-[var(--primary)]'
  },
  2: { // الفرات للسياحة (تجريبي)
    rating: 4.8,
    subtitle: 'الأكثر حجزاً',
    bgBadge: 'bg-[#fde8cc] text-[#d97706]',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-500',
    dotColor: 'bg-orange-500'
  },
  3: { // النورس إكسبرس (تجريبي)
    rating: 4.7,
    subtitle: 'سعر مميز',
    bgBadge: 'bg-[#dbeafe] text-[#2563eb]',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    dotColor: 'bg-blue-500'
  },
  4: { // الاتحاد للنقل (تجريبي)
    rating: 4.6,
    subtitle: 'مواعيد مرنة',
    bgBadge: 'bg-[#ede9fe] text-[#7c3aed]',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-600',
    dotColor: 'bg-purple-600'
  }
};

export const getCompanyStyle = (id) => {
  return COMPANY_STYLES[id] || {
    rating: 4.5,
    subtitle: 'رحلات يومية',
    bgBadge: 'bg-amber-100 text-amber-700',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-500',
    dotColor: 'bg-amber-500'
  };
};