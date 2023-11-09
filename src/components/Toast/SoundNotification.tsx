// import { useEffect, useState } from 'react';
// import Sound from 'react-native-sound';


// const NotificationSound = () => {
//   const [notificationSound, setNotificationSound] = useState<Sound | null>(null);

//   useEffect(() => {
//     const sound = new Sound('sound_notification.mp3', Sound.MAIN_BUNDLE, error => {
//       if (error) {
//         console.log('Error loading  :', error);
//         return;
//       }
//       setNotificationSound(sound);
//     });

//     return () => {
//       if (notificationSound) {
//         notificationSound.release();
//       }
//     };
//   }, []);
//   const playNotificationSound = () => {
//     if (notificationSound) {
//       notificationSound.play(success => {
//         if (!success) {
//           console.log('Sound play failed');
//         }
//       });
//     }
//   };


//   return {
//     notificationSound,
//     playNotificationSound,

//   };


// };

// export default NotificationSound;
