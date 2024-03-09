
import Notice from "../components/Notice";

const NotFound = () => {
    return (
        <Notice
            title="404"
            message="There&apos;s no way forward."
            link="Return Home"
            to="/"
        />
    );
};

export default NotFound;