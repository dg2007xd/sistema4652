import './MainHeader.css'
import logo from '../assets/images/ideas-digitales-color.png';
function MainHeader() {
    return (
        <header id='main-header'>
            <div className="container">
                <figure id="logo">
                    <img src={logo} alt="Ideas Digitales" className='img-fluid'/>
                </figure>
            </div>
        </header>
    )
}

export default MainHeader