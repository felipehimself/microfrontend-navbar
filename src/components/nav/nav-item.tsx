import { TAppRoutes } from '@/types';
import {
  NavItem as NI,
  NavCategory,
  NavCategoryItem,
  NavCategoryItemProps,
  NavItemProps,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { useId } from 'react';
import { Link } from 'react-router-dom';

type TProps = NavCategoryItemProps &
  NavItemProps &
  Omit<TAppRoutes, 'appIcon'> & {
    open: boolean;
    currentApp: string;
  };

export const NavItem = (props: TProps) => {
  const hasSubRoutes = props.routes.length > 0;

  return hasSubRoutes ? (
    <NavCategory value={props.value}>
      <NavCategoryItem onClick={props.onClick} {...props} icon={props.icon}>
        {props.open && props.appName}
      </NavCategoryItem>
      {props.open && props.currentApp === props.appName && (
        <NavSubItemGroup>
          {props.routes.map(({ submenuName, path }) => {
            return (
              <Link style={{ textDecoration: 'none' }} to={path}>
                <NavSubItem onClick={props.onClick} value={useId()}>
                  {submenuName}
                </NavSubItem>
              </Link>
            );
          })}
        </NavSubItemGroup>
      )}
    </NavCategory>
  ) : (
    <Link style={{ textDecoration: 'none' }} to={props.path}>
      <NI
        icon={props.icon}
        onClick={props.onClick}
        value={props.value}
        className={props.className}
        href={props.path}
      >
        {props.open && props.appName}
      </NI>
    </Link>
  );
};
