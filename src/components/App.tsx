import Footer from "./Footer";
import Header from "./Header";
import WelcomeScreen from "./WelcomeScreen";

function App() {
  return (
    <div className="app">
      <Header />
      <WelcomeScreen />
      <Footer>
        <h2>Footer</h2>
      </Footer>
    </div>
  );
}

export default App;
