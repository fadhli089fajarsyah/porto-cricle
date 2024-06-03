import { useEffect, useState } from "react";
import CardProfile from "./components/cardProfile"
import Sugested from "./sugested"
const index = () => {
    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        setShowFooter(!location.pathname.includes("/profile"));
    }, [location.pathname]);

    return (
        <div className="w-[90%] text-">
            {showFooter && (
                <CardProfile styleContainer="bg-[#262626] " myProfile="myProfile" styleImgCover="" />
            )}

            <Sugested />
        </div>
    )
}

export default index
