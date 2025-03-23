// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
// import './Tab1.css';

// const Tab1: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Tab 1</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen>
//         <IonHeader collapse="condense">
//           <IonToolbar>
//             <IonTitle size="large">Tab 1</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <ExploreContainer name="Tab 1 page" />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Tab1;
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail
} from '@ionic/react';
import { camera, heart, heartOutline, star } from 'ionicons/icons';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useState, useEffect } from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const { photos } = usePhotoGallery();
  const [featuredPhotos, setFeaturedPhotos] = useState<{ id: number; path: string; likes: number; title: string }[]>([]);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    // Load featured photos based on user's gallery
    if (photos.length > 0) {
      const featured = photos.slice(0, Math.min(3, photos.length)).map((photo, index) => ({
        id: index,
        path: photo.webviewPath || '',
        likes: Math.floor(Math.random() * 50) + 10,
        title: `Photo ${index + 1}`
      }));
      setFeaturedPhotos(featured);
    } else {
      // Default placeholders if no photos available
      setFeaturedPhotos([
        { id: 1, path: '', likes: 24, title: 'Sunset at the beach' },
        { id: 2, path: '', likes: 17, title: 'Mountain hike' },
        { id: 3, path: '', likes: 32, title: 'City skyline' }
      ]);
    }
  }, [photos]);

  const toggleLike = (id: number) => {
    if (likedPhotos.includes(id)) {
      setLikedPhotos(likedPhotos.filter(photoId => photoId !== id));
      setFeaturedPhotos(featuredPhotos.map(photo => 
        photo.id === id ? { ...photo, likes: photo.likes - 1 } : photo
      ));
    } else {
      setLikedPhotos([...likedPhotos, id]);
      setFeaturedPhotos(featuredPhotos.map(photo => 
        photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
      ));
    }
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Simulate a data refresh
      setLastRefresh(new Date());
      event.detail.complete();
    }, 1500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Welcome to Photo Gallery</IonCardTitle>
            <IonCardSubtitle>Capture and share your moments</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Your one-stop app for capturing and organizing your photos. Take photos, browse your gallery, and manage your collection with ease.</p>
            <IonButton expand="block" href="/tab2">
              <IonIcon slot="start" icon={camera}></IonIcon>
              Go to Gallery
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Featured Photos</IonCardTitle>
            <IonCardSubtitle>Last updated: {lastRefresh.toLocaleTimeString()}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {featuredPhotos.map((photo) => (
                <IonItem key={photo.id}>
                  {photo.path ? (
                    <IonThumbnail slot="start">
                      <img src={photo.path} alt={photo.title} />
                    </IonThumbnail>
                  ) : (
                    <IonIcon slot="start" icon={camera} size="large"></IonIcon>
                  )}
                  <IonLabel>
                    <h2>{photo.title}</h2>
                    <p>{photo.likes} likes</p>
                  </IonLabel>
                  <IonButton fill="clear" onClick={() => toggleLike(photo.id)}>
                    <IonIcon icon={likedPhotos.includes(photo.id) ? heart : heartOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tips & Tricks</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon slot="start" icon={star} color="warning"></IonIcon>
                <IonLabel>Tap the camera button to take a new photo</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={star} color="warning"></IonIcon>
                <IonLabel>Tap on a photosss in the gallery to delete it</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={star} color="warning"></IonIcon>
                <IonLabel>Pull down to refresh the featured photos</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;