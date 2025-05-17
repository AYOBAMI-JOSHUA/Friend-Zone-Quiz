import logo from './logo.svg';

function Header() {

    return (
        <div className="app-header">
            <header >
              <img src={logo} alt="Friend Zone Quiz" />
              <h1>The Friend Zone Quiz</h1>
            </header>
        </div>
        
    )
    
}

export default Header