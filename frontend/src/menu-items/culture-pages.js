// assets
import { GiCorn, GiGooeyMolecule, GiChemicalDrop } from 'react-icons/gi';

// constant
const icons = {
    GiCorn,
    GiGooeyMolecule,
    GiChemicalDrop
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const culturePages = {
    id: 'pages',
    title: '',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'culture',
            title: 'Параметры для вегетации растений',
            type: 'item',
            url: '/culture',
            icon: icons.GiCorn
        },
        {
            id: 'chemical-treatments',
            title: 'Химические обработки',
            type: 'item',
            url: '/chemical-treatments',
            icon: icons.GiChemicalDrop
        },
        {
            id: 'culture-diseases',
            title: 'Болезни',
            type: 'item',
            url: '/culture/culture-diseases',
            icon: icons.GiGooeyMolecule
        }
    ]
};

export default culturePages;
