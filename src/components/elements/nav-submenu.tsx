import {
  NavCategory,
  NavCategoryItem,
  NavCategoryItemProps,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { Link } from 'react-router-dom';
import { TRoutes } from '@/types';
import { useId } from 'react';

type TProps = NavCategoryItemProps & {
  onClick: () => void;
  open: boolean;
  menuName: string;
  routes: TRoutes[];
};

export const NavSubmenu = (props: TProps) => {
  return (
    <NavCategory value={props.value}>
      <NavCategoryItem {...props} onClick={props.onClick} icon={props.icon}>
        {props.open && props.menuName}
      </NavCategoryItem>
      {props.open && (
        <NavSubItemGroup>
          {props.routes.map(({ submenuName, path }, index) => {
            return (
              <Link style={{ textDecoration: 'none' }} to={path!}>
                <NavSubItem onClick={props.onClick} value={useId()}>
                  {submenuName}
                </NavSubItem>
              </Link>
            );
          })}
        </NavSubItemGroup>
      )}
    </NavCategory>
  );
};
