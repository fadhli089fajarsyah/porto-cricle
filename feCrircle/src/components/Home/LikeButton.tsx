

// import React, { useEffect, useState } from "react";

// import { useAppSelector } from "../../store";
// import API from "../../lib/";
// import { FaHeart } from "react-icons/fa";

// interface ILikeButtonProps {
//     id: number;
// }

// const LikeButton: React.FC<ILikeButtonProps> = ({ id }) => {
//     const { user } = useAppSelector((state) => state.auth);
//     const [liked, setliked] = useState(false);
//     const [likedForm, setLikedForm] = useState<{ threadId: number }>({ threadId: 0 });
//     const [countliked, setCountliked] = useState(0);

//     const getLike = async () => {
//         try {
//             const res = await API.get(`like/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             console.log(res.data.data.length);
            
//             setCountliked(res.data.data.length)
//             setliked(res.data.data.user === null ? false : true);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleLike = async () => {
//         try {
//             const res = await API.post(
//                 `like`,
//                 {
//                     id: id,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );

//             console.log(res);
//             await getLike();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getLike();
//     }, []);

//     return (
//         <button aria-label="delete" onClick={() => handleLike()}>
//             <FaHeart color={liked ? "red" : ""} />
//             <p>{countliked}</p>
//         </button>
//     );
// };

// export default LikeButton;
