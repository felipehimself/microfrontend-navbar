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
  },
});

const baseRoot = {
  display: 'flex',
  height: '100vh',
  // backgroundColor: '#fff',
  transition: 'width 0.3s ease',
};
export const useStyles = makeStyles({
  relative: {
    position: 'relative',
  },

  transition: {
    transition: 'width 0.3s ease',
  },

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

  headerAvatarName: typographyStyles.body2,
  headerAvatarRole: typographyStyles.caption1,

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnFooterPadding: {
    paddingBottom: '1.5rem',
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
});
