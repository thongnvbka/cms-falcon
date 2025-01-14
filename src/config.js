export const version = '2.10.2';
export const navbarBreakPoint = 'xl'; // Vertical navbar breakpoint
export const topNavbarBreakpoint = 'lg';
export const settings = {
  isFluid: false,
  isRTL: false,
  isDark: false,
  isTopNav: false,
  isVertical: true,
  get isCombo() {
    return this.isVertical && this.isTopNav;
  },
  showBurgerMenu: false, // controls showing vertical nav on mobile
  currency: '$',
  isNavbarVerticalCollapsed: false,
  navbarStyle: 'transparent'
};

const Config = {
  defaultPath: '/login',
  basename: '/',
  layout: 'vertical',
  subLayout: '',
  collapseMenu: false,
  layoutType: 'menu-light',
  headerBackColor: 'header-blue',
  rtlLayout: false,
  navFixedLayout: true,
  headerFixedLayout: false,
  boxLayout: false
};
export default { version, navbarBreakPoint, topNavbarBreakpoint, settings,Config };
