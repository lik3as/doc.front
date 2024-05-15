// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Document } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  file: Document
};

// ==============================|| MENU ITEMS - MAIN ||============================== //

const main: NavItemType = {
  id: 'other',
  title: <FormattedMessage id="Principal" />,
  type: 'group',
  children: [
    {
      id: 'file-manager',
      title: <FormattedMessage id="Gerenciar Dados" />,
      type: 'item',
      url: '/file-manager',
      icon: icons.file
    },
  ]
};

export default main;
