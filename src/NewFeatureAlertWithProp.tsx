import { useEffect, useState } from 'react';

interface NewFeatureAlertProps {
  hasDiscoveredFav: boolean;
}

export const NewFeatureAlert = ({ hasDiscoveredFav }: NewFeatureAlertProps) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log('Ejecutando efecto', { hasDiscoveredFav });
    if (hasDiscoveredFav) {
      return;
    }

    const timeoutId = setTimeout(() => {
      alert('hola');
      setShowAlert(true);
    }, 5000);

    return () => {
      console.log('limpiando');
      clearTimeout(timeoutId);
    };
  }, [hasDiscoveredFav]);

  if (!showAlert) {
    return null;
  }

  return <div className="new-feature">Hemos lanzado una funcionalidad maravillosa</div>;
};
