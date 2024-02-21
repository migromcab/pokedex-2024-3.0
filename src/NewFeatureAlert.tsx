import { useEffect, useState } from 'react';

export const NewFeatureAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(true);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert]);

  if (!showAlert) {
    return null;
  }

  return <div className="new-feature">Hemos lanzado una funcionalidad maravillosa</div>;
};
