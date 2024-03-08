// assets
import { IconSeeding, IconGrowth } from '@tabler/icons';

// constant
const icons = {
    IconSeeding,
    IconGrowth
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const calculation = {
    id: 'calculation',
    title: 'Расчеты',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'soil_moisture',
            title: 'Продуктивная влага в почве',
            type: 'item',
            url: '/calculation/soil_moisture',
            icon: icons.IconSeeding
        },
        {
            id: 'culture_prediction',
            title: 'Прогноз оптимальности посева',
            type: 'item',
            url: '/calculation/best_culture',
            icon: icons.IconGrowth
        }
    ]
};

export default calculation;
