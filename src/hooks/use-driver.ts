import { useCallback } from 'react';
import {driver, DriveStep} from 'driver.js';
import 'driver.js/dist/driver.css';

const useDriver = () => {
    const start = useCallback((steps: DriveStep[]) => {
        const driverObj = driver({
            showProgress: true,
            steps,
        });

        driverObj.drive();
    }, []);

    return { start };
};

export default useDriver;