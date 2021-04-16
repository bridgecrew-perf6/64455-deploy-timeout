import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useMounted } from './hooks';

export function useGoogleMaps(apiKey, options = {}) {
  const { marker: mapMarker, ...mapOptions } = options;
  const mounted = useMounted();
  const google = useGoogleMapsApi(apiKey);
  const ref = useRef(null);
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (ref.current && google && mounted) {
      let gmap;
      let gmarker;

      gmap = new google.maps.Map(ref.current, mapOptions);

      if (typeof mapMarker === 'function') {
        gmarker = mapMarker(gmap, google.maps.Marker);
      } else if (typeof mapMarker === 'object') {
        gmarker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          ...mapMarker,
          map: gmap,
        });
        setMarker(gmarker);
      }

      setMap(gmap);

      return () => {
        if (gmarker) gmarker.setMap(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, google]);

  return { ref, map, marker, google };
}

export function useGoogleMapsApi(apiKey) {
  const [googleApi, setGoogleApi] = useState();

  useEffect(() => {
    if (!apiKey || googleApi) return;
    new Loader({
      apiKey,
      version: 'weekly',
    })
      .load()
      .then(() => {
        // eslint-disable-next-line no-undef
        setGoogleApi(google);
      });
  }, [apiKey, googleApi]);

  return googleApi;
}
