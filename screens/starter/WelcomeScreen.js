import { useEffect, useState } from "react";
import WelcomePageWidget from "../../components/WelcomePageWidget";
import { useUser } from "../../hooks/auth/useUser";

function WelcomeScreen({ navigation }) {
    const [page, setPage] = useState(0);
    const { isAuthenticated, isLoading } = useUser();

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const viewWidth = event.nativeEvent.layoutMeasurement.width;
        const newPage = Math.round(contentOffsetX / viewWidth);
        handlePageChange(newPage);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigation.reset({ index: 0, routes: [{ name: 'InApp' }] });
        } 
    }, [isAuthenticated, navigation]);

    if (isLoading) return null;

    return !isAuthenticated ? (
        <WelcomePageWidget
            onRegister={() => navigation.navigate("Register")}
            onLogin={() => navigation.navigate("Login")}
            page={page}
            handleScroll={handleScroll}
        />
        ) : null;
}

export default WelcomeScreen;
