import { useState } from "react";
import WelcomePageWidget from "../../components/WelcomePageWidget";

function WelcomeScreen({ navigation }) {
    const [page, setPage] = useState(0);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const viewWidth = event.nativeEvent.layoutMeasurement.width;
        const newPage = Math.round(contentOffsetX / viewWidth);
        handlePageChange(newPage);
    };

    return (
        <WelcomePageWidget
            onRegister={() => navigation.navigate("Register")}
            onLogin={() => navigation.navigate("Login")}
            page={page}
            handleScroll={handleScroll}
        />
    );
}

export default WelcomeScreen;
