import { useStyles } from '@/styles';
import { Button, mergeClasses } from '@fluentui/react-components';
import { NavigationFilled } from '@fluentui/react-icons';
import { Avatar } from './avatar';

type TDrawerHeaderContentProps = {
  setOpenNav: () => void;
  openNav: boolean;
}

export const DrawerHeaderContent = (props: TDrawerHeaderContentProps) => {

  const styles = useStyles();

  return (
    <div className={styles.headerContainer}>
      {/* <div className={styles.drawerHeaderHamburguerContainer} > */}
        <Button
          onClick={props.setOpenNav}
          appearance="transparent"
          icon={<NavigationFilled />}
          className={styles.hamburger}
        />
      {/* </div> */}

      <div className={styles.headerAvatar}>
        <Avatar
          size={props.openNav ? 48 : 32}
          image={{
            src: 'https://randomuser.me/api/portraits/men/21.jpg',
          }}
        />
        {props.openNav && (
          <div>
            <p
              className={mergeClasses(
                styles.headerAvatarName,
                styles.noWrap
              )}
            >
              John Doe
            </p>
            <span
              className={mergeClasses(
                styles.headerAvatarRole,
                styles.noWrap
              )}
            >
              HR Department
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

