import { NavItem as NI, NavItemProps } from '@fluentui/react-nav-preview';
import { Link } from 'react-router-dom';
type TProps = NavItemProps & {
  menuName: string;
  open: boolean;
  to: string;
};

export const NavItem = (props: TProps) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={props.to}>
      <NI
        target="_blank"
        icon={props.icon}
        onClick={props.onClick}
        value={props.value}
        className={props.className}
      >
        {props.open && props.menuName}
      </NI>
    </Link>
  );
};
