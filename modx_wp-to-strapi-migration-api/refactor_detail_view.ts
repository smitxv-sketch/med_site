import fs from 'fs';
import path from 'path';

const chelPath = path.join(process.cwd(), 'src/components/detail/ChelDetailView.tsx');
const spbPath = path.join(process.cwd(), 'src/components/detail/SpbDetailView.tsx');

let chelContent = fs.readFileSync(chelPath, 'utf-8');
let spbContent = fs.readFileSync(spbPath, 'utf-8');

// Rename components
chelContent = chelContent.replace('export const DetailView: React.FC<DetailViewProps> =', 'export const ChelDetailView: React.FC<DetailViewProps> =');
spbContent = spbContent.replace('export const DetailView: React.FC<DetailViewProps> =', 'export const SpbDetailView: React.FC<DetailViewProps> =');

fs.writeFileSync(chelPath, chelContent);
fs.writeFileSync(spbPath, spbContent);

console.log('Renamed components');
