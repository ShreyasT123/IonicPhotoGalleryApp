// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
// import './Tab3.css';

// const Tab3: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Tab 3</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen>
//         <IonHeader collapse="condense">
//           <IonToolbar>
//             <IonTitle size="large">Tab 3</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <ExploreContainer name="Tab 3 page" />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Tab3;
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonRange,
  IonListHeader,
  IonNote,
  IonAlert,
  IonToast
} from '@ionic/react';
import {
  moon,
  sunny,
  trash,
  cloudUpload,
  helpCircle,
  informationCircle,
  settings,
  colorPalette,
  imageOutline,
  notifications
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [photoQuality, setPhotoQuality] = useState(80);
  const [storageUsed, setStorageUsed] = useState('45 MB');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [photoFormat, setPhotoFormat] = useState('jpeg');
  const [showClearAlert, setShowClearAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleDarkMode = () => {
    document.body.classList.toggle('ion-palette-dark');
  };
  

  const clearAppData = () => {
    // Simulate clearing app data
    setTimeout(() => {
      setStorageUsed('0 MB');
      showToastMessage('All app data has been cleared');
      setShowClearAlert(false);
    }, 1000);
  };

  useEffect(() => {
    // Load dark mode setting from localStorage
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    document.body.classList.toggle("dark", savedTheme);
  }, []);
  const backupPhotos = () => {
    // Simulate backup
    showToastMessage('Backup started. This may take a few minutes.');
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonListHeader>
            <IonLabel>General Settings</IonLabel>
          </IonListHeader>
          
          <IonItem>
            <IonIcon slot="start" icon={darkMode ? moon : sunny} />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onIonChange={toggleDarkMode} />
          </IonItem>
          
          <IonItem>
            <IonIcon slot="start" icon={notifications} />
            <IonLabel>Notifications</IonLabel>
            <IonToggle checked={notificationsEnabled} 
              onIonChange={e => {
                setNotificationsEnabled(e.detail.checked);
                showToastMessage(`Notifications ${e.detail.checked ? 'enabled' : 'disabled'}`);
              }} 
            />
          </IonItem>
          
          <IonItem>
            <IonIcon slot="start" icon={settings} />
            <IonLabel>Auto Save</IonLabel>
            <IonToggle checked={autoSaveEnabled} 
              onIonChange={e => {
                setAutoSaveEnabled(e.detail.checked);
                showToastMessage(`Auto save ${e.detail.checked ? 'enabled' : 'disabled'}`);
              }} 
            />
          </IonItem>
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Photo Settings</IonLabel>
          </IonListHeader>
          
          <IonItem>
            <IonIcon slot="start" icon={imageOutline} />
            <IonLabel>Photo Quality</IonLabel>
            <IonNote slot="end">{photoQuality}%</IonNote>
          </IonItem>
          
          <IonItem>
            <IonRange
              min={40}
              max={100}
              step={10}
              value={photoQuality}
              onIonChange={e => setPhotoQuality(e.detail.value as number)}
            />
          </IonItem>
          
          <IonItem>
            <IonIcon slot="start" icon={colorPalette} />
            <IonLabel>Photo Format</IonLabel>
            <IonSelect value={photoFormat} onIonChange={e => setPhotoFormat(e.detail.value)}>
              <IonSelectOption value="jpeg">JPEG</IonSelectOption>
              <IonSelectOption value="png">PNG</IonSelectOption>
              <IonSelectOption value="webp">WEBP</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Storage</IonLabel>
          </IonListHeader>
          
          <IonItem>
            <IonLabel>Storage Used</IonLabel>
            <IonNote slot="end">{storageUsed}</IonNote>
          </IonItem>
          
          <IonItem>
            <IonButton expand="block" color="danger" onClick={() => setShowClearAlert(true)}>
              <IonIcon slot="start" icon={trash} />
              Clear All Data
            </IonButton>
          </IonItem>
          
          <IonItem>
            <IonButton expand="block" color="primary" onClick={backupPhotos}>
              <IonIcon slot="start" icon={cloudUpload} />
              Backup Photos
            </IonButton>
          </IonItem>
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>About</IonLabel>
          </IonListHeader>
          
          <IonItem button detail onClick={() => showToastMessage('Version 1.0.0')}>
            <IonIcon slot="start" icon={informationCircle} />
            <IonLabel>App Version</IonLabel>
          </IonItem>
          
          <IonItem button detail onClick={() => showToastMessage('Help & Support content would open here')}>
            <IonIcon slot="start" icon={helpCircle} />
            <IonLabel>Help & Support</IonLabel>
          </IonItem>
        </IonList>

        <IonAlert
          isOpen={showClearAlert}
          onDidDismiss={() => setShowClearAlert(false)}
          header="Clear All Data"
          message="Are you sure you want to clear all app data? This action cannot be undone."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Clear',
              role: 'destructive',
              handler: clearAppData,
            },
          ]}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;