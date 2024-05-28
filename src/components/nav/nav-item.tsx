import { useStyles } from '@/styles';
import { TAppRoutes } from '@/types';
import { mergeClasses } from '@fluentui/react-components';
import {
  NavItem as NI,
  NavCategory,
  NavCategoryItem,
  NavCategoryItemProps,
  NavItemProps,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import { useNavigate } from 'react-router-dom';

type TProps = NavCategoryItemProps &
  NavItemProps &
  Omit<TAppRoutes, 'appIcon'> & {
    open: boolean;
    currentApp: string;
  } & {
    handleSingleRouteClick: () => void;
  }

export const NavItem = (props: TProps) => {
  const hasSubRoutes = props.routes.length > 0;

  const navigate = useNavigate();

  const styles = useStyles();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return hasSubRoutes ? (
    <NavCategory value={props.value}>
      <NavCategoryItem onClick={props.onClick} {...props} icon={props.icon}>
        {props.open && props.appName}
      </NavCategoryItem>
      {props.open && props.currentApp === props.appName && (
        <NavSubItemGroup>
          {props.routes.map(({ submenuName, path }) => {

            return (
              <NavSubItem className={styles.cursorPointer} onClick={() => {
                props.onClick!;
                handleNavigate(path);
              }} value={submenuName}>
                {submenuName}
              </NavSubItem>

            );
          })}
        </NavSubItemGroup>
      )}
    </NavCategory>
  ) : (
    <NI
      icon={props.icon}
      onClick={() => {
        props.handleSingleRouteClick();
        handleNavigate(props.path);
      }}
      value={props.appName}
      className={mergeClasses(props.className, styles.cursorPointer)}
    >
      {props.open && props.appName}
    </NI>
  );
};
