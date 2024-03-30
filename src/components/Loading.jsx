import spinner from '../assets/spinner.gif'

const Loading = () => {
    return (
        <div>
            <img src={spinner} alt="loading" style={{height: '16px', width: '16px'}} />
        </div>
    );
};

export default Loading;