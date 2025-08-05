const Header = ({ mode }) => {
  const getModeTitle = () => {
    switch (mode) {
      case 'countdown':
        return 'React Flip Countdown';
      case 'stopwatch':
        return 'React Flip Stopwatch';
      default:
        return 'React Flip Clock';
    }
  };

  return (
    <header>
      <h1>{getModeTitle()}</h1>
    </header>
  );
};

export default Header;