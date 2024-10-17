// import React, { useEffect, useState } from "react";
// import uploadPhoto from '../../assets/upload-photo.jpg';
// import "./ProgressPhoto.css";

// const ProgressPhoto = ({workoutId}) => {
//     const [ defaultPhoto, setDefaultPhoto ] = useState(() => {
//         return localStorage.getItem(`savedPhoto_${workoutId}`) || uploadPhoto;
//     })

//     useEffect(() => {
//         const savedPhoto = localStorage.getItem(`savedPhoto_${workoutId}`);
//         if (savedPhoto) {
//             setDefaultPhoto(savedPhoto);
//         }
//     }, [workoutId]);

//     const handleClick = () => {
//         document.getElementById(`file_${workoutId}`).click();
//     };

//     const imageUpload = (event) => {
//         event.preventDefault();
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             setDefaultPhoto(imageUrl);
//             localStorage.setItem(`savedPhoto_${workoutId}`, imageUrl);
//         }
//     };

//     return (
//         <>
//             <button className="div-placeholder-photo" onClick={handleClick}>
//                 <img className="placeholder-photo" src={defaultPhoto} alt="Progress Photo" />
//             </button>
//             <input hidden id={`file_${workoutId}`} type="file" accept="image/*" onChange={imageUpload} />
//         </>
//     );
// };

// export default ProgressPhoto;
