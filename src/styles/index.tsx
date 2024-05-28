import {
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';

export const useSkeletonStyles = makeStyles({
  root: {
    '> *': {
      margin: tokens.spacingVerticalM,
    },

    '> :nth-child(even)': {
      width: '85% !important',
    },

    '> :nth-child(odd)': {
      width: '75% !important',
    },
  },
});

const baseRoot = {
  display: 'flex',
  height: '100vh',
  transition: 'width 0.3s ease',
};
export const useStyles = makeStyles({
  changeThemeButton: {
    position: 'fixed',
    top: '0.5rem',
    right: '1rem',
  },

  root: {
    ...baseRoot,
  },

  rootSm: {
    ...baseRoot,
    width: '3.6rem',
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding('16px'),

    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: 'max-content',
  },
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },

  headingContent: {
    marginInlineStart: `10px`,
  },
  hamburger: {
    color: tokens.colorNeutralForeground2,
    textDecorationLine: 'none',
    marginRight: '-0.6rem',
  },

  noHover: {
    ':hover': {
      backgroundColor: 'transparent',
    },
  },

  withHover: {
    ':hover': {
      backgroundColor: '#fff',
    },
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '0.6rem',
  },

  headerAvatar: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  noWrap: {
    whiteSpace: 'nowrap',
  },

  headerAvatarName: typographyStyles.body2,
  headerAvatarRole: typographyStyles.caption1,

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnFooterPadding: {
    paddingBottom: '1rem',
  },

  headerActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  homeIcon: {
    ':active': {
      color: '#B878B6',
    },
  },

  cursorContextMenu: {
    cursor: 'context-menu',
  },


  cursorPointer: {
    cursor: 'pointer',
  },

  drawerHeaderHamburguerContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  noOverflowX: {
    overflowX: 'hidden'
  }
});
