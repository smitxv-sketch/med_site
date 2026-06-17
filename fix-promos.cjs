const fs = require('fs');
let content = fs.readFileSync(process.cwd() + '/src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx', 'utf-8');

const target = `  const today = new Date();
  const startDate = new Date(promo.startDate);
  const endDate = new Date(promo.endDate);
  const totalDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const daysLeft = Math.max(
    0,
    Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );`;

const replacement = `  const today = new Date();
  const startDate = new Date(promo.startDate);
  const endDate = new Date(promo.endDate);
  const totalDaysRaw = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalDays = Math.max(1, totalDaysRaw);
  const daysLeft = Math.max(
    0,
    Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );`;

content = content.split(target).join(replacement);

const target2 = `const targetProgress = (daysLeft / totalDays) * 100;`;
const replacement2 = `const targetProgress = Math.min(100, (daysLeft / totalDays) * 100);`;

content = content.split(target2).join(replacement2);

fs.writeFileSync(process.cwd() + '/src/widgets/promotions-widget/ui/PromotionsWidgetVariants.tsx', content);
