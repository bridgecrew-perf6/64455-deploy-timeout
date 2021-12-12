import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useMounted } from './hooks';

const grayscaleStyle = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ saturation: -100 }],
  },
];

export function useGoogleMaps(apiKey, options = {}) {
  const { marker: mapMarker, grayscale = false, ...mapOptions } = options;
  const mounted = useMounted();
  const google = useGoogleMapsApi(apiKey);
  const ref = useRef(null);
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (ref.current && google && mounted) {
      let gmap;
      let gmarker;

      if (grayscale) {
        gmap = new google.maps.Map(ref.current, {
          ...mapOptions,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'grayscale'],
          },
        });
      } else {
        gmap = new google.maps.Map(ref.current, mapOptions);
      }

      if (grayscale) {
        const mapType = new google.maps.StyledMapType(grayscaleStyle, {
          name: 'Grayscale',
        });
        gmap.mapTypes.set('grayscale', mapType);
        gmap.setMapTypeId('grayscale');
      }

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
  }, [mounted, google, grayscale]);

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
