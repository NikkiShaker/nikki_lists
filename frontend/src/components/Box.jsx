import '../styles/Box.css';

function Box({ children, ...props }) {
    return (
        <div className="box" {...props}>
            <div className="box-content">
                {children}
            </div>;
        </div>
    )
}

export default Box;