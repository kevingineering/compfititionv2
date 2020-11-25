//changes between day and night theme
export const toggleNightTheme = (status: boolean) => {
  if (status) {
    document.documentElement.style.setProperty('--primary-color', '#999999');
    document.documentElement.style.setProperty('--secondary-color', '#181818');
    document.documentElement.style.setProperty('--danger-color', '#8B0000');
    document.documentElement.style.setProperty('--success-color', '#006400');
    document.documentElement.style.setProperty('--today-color', '#BE9313');
    document.documentElement.style.setProperty('--yesterday-color', '#8B6000');
    document.documentElement.style.setProperty('--tooltip-color', '#999999');
  } else {
    document.documentElement.style.setProperty('--primary-color', '#000000');
    document.documentElement.style.setProperty('--secondary-color', '#FFFFFF');
    document.documentElement.style.setProperty('--danger-color', '#FF0000');
    document.documentElement.style.setProperty('--success-color', '#008000');
    document.documentElement.style.setProperty('--today-color', '#FFFF00');
    document.documentElement.style.setProperty('--yesterday-color', '#FFFFBB');
    document.documentElement.style.setProperty('--tooltip-color', '#FFFFFF');
  }
};
