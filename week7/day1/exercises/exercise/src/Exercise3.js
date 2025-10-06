import logo from './logo.svg';
import './Exercise.css';

function Exercise3() {
    const list = ['coffee', 'tea', 'milk'];

    const style_header = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
    };
    return (
        <div>
            <h1 style={style_header}>This is a Header</h1>
            <p className='para'>This is a paragraph</p>
            <a href="#">This is a link</a>
            <h3>This is a From:</h3>
            <form>
                <label>
                    Enter your name:
                </label>
                <input type="text" placeholder="Enter your name" />
                <button type="submit">Submit</button>
            </form>
            <h4>Here is an Image:</h4>
            <img src={logo} alt="React Logo" />
            <h5>This is a List:</h5>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Exercise3;