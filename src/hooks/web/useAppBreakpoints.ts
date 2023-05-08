import { useBreakpoints, useCssVar } from '@vueuse/core';

export function useAppBreakpoints() {
  const smValue = useCssVar('--app-screen-sm');
  const mdValue = useCssVar('--app-screen-md');
  const lgValue = useCssVar('--app-screen-lg');
  const xlValue = useCssVar('--app-screen-xl');
  const xxlValue = useCssVar('--app-screen-xxl');
  const appBreakpoints = useBreakpoints({
    sm: smValue.value,
    md: mdValue.value,
    lg: lgValue.value,
    xl: xlValue.value,
    xxl: xxlValue.value,
  });
  const sm = appBreakpoints.smaller('sm');
  const md = appBreakpoints.between('sm', 'md');
  const lg = appBreakpoints.between('md', 'lg');
  const xl = appBreakpoints.between('lg', 'xl');
  const xxl = appBreakpoints.between('xl', 'xxl');
  const xxxl = appBreakpoints['xxl'];
  return {
    sm,
    md,
    lg,
    xl,
    xxl,
    xxxl,
  };
}
