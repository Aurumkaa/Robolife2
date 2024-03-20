// assets
import { GiCorn, GiGooeyMolecule, GiChemicalDrop } from 'react-icons/gi';
import { AiOutlineBarChart } from 'react-icons/ai';

// constant
const icons = {
    GiCorn,
    GiGooeyMolecule,
    GiChemicalDrop,
    AiOutlineBarChart
};

const culturePages = {
    id: 'pages',
    title: '',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'forecast',
            title: 'Краткосрочный прогноз',
            type: 'item',
            url: '/forecast',
            icon: icons.AiOutlineBarChart
        },
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
