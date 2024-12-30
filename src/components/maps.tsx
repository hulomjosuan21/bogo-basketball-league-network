'use client'
import {useEffect, useRef} from "react";
import {Loader} from "@googlemaps/js-api-loader";
import Barangay from "@/types/barangayType";

export function GoogleMapMarkArray({ barangays, className }: { barangays: Barangay[], className: string}) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
                version: 'quarterly',
            });

            const { Map } = await loader.importLibrary('maps');
            const { Geocoder } = (await loader.importLibrary('geocoding'));
            const { Marker } = (await loader.importLibrary('marker'));

            const geocoder = new Geocoder();

            const defaultCenter = { lat: 11.025905588678095, lng: 123.98343717562656 };

            const map = new Map(mapRef.current as HTMLDivElement, {
                center: defaultCenter,
                zoom: 13,
                mapId: 'NEXT_MAPS',
            });

            barangays.forEach((barangay) => {
                geocoder.geocode({ address: barangay.address }, (results: { geometry: { location: never; }; }[], status: string) => {
                    if (status === "OK" && results && results[0]) {
                        const location = results[0].geometry.location;

                        const marker = new Marker({
                            map: map,
                            position: location,
                            title: barangay.address,
                        });

                        marker.addListener('contextmenu', () => {
                        });

                        marker.addListener('click', () => {
                        });
                    }
                });
            });
        })();
    }, [barangays]);

    return <div className={className} ref={mapRef}></div>;
}