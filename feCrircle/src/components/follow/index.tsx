import React from "react";
import { IUser } from "../../types/app";
interface propsFollowing {
    tex:string
    following: IUser
}
const index: React.FC<propsFollowing> = (props) => {
    // console.log("ini log following", following)


    const [follow, setFollow] = React.useState(false);
    
    const handleLikeClick = () => {
        setFollow(!follow);
    };

    return (
        <div>
            
        </div>
    )
}

export default index
