import reactLogo from "../assets/react.svg";

const Header = () => {
  return (
    <header className="app-header">
      <img src={reactLogo} alt="React logo" className="react-logo" />
      <h1>The React Quiz</h1>
    </header>
  );
};

export default Header;
