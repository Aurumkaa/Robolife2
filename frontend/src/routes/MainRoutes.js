import { lazy } from 'react';

// project imports
// eslint-disable-next-line no-unused-vars
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import SystemParams from '../views/dashboard/SystemParams';
import { Navigate } from 'react-router';
import RequiredAuth from '../utils/RequiredAuth';

// dashboard routing
const WelcomePage = Loadable(lazy(() => import('views/welcome-page/WelcomePage')));

const TemperaturePage = Loadable(lazy(() => import('views/dashboard/Temperature')));

const PrecipitationPage = Loadable(lazy(() => import('views/dashboard/Precipitation')));

const WindSpeedPage = Loadable(lazy(() => import('views/dashboard/WindSpeed')));

const SystemParamsPage = Loadable(lazy(() => import('views/dashboard/SystemParams')));

const HumidityPage = Loadable(lazy(() => import('views/dashboard/Humidity')));

const SolarRadiationPage = Loadable(lazy(() => import('views/dashboard/SolarRadiation')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <RequiredAuth>
            <MainLayout />
        </RequiredAuth>
    ),
    children: [
        {
            path: '/',
            element: (
                <RequiredAuth>
                    <WelcomePage />
                </RequiredAuth>
            )
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'temperature',
                    element: (
                        <RequiredAuth>
                            <TemperaturePage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'precipitation',
                    element: (
                        <RequiredAuth>
                            <PrecipitationPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'wind_speed',
                    element: (
                        <RequiredAuth>
                            <WindSpeedPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'system_params',
                    element: (
                        <RequiredAuth>
                            <SystemParamsPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'humidity',
                    element: (
                        <RequiredAuth>
                            <HumidityPage />
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'solar_radiation',
                    element: (
                        <RequiredAuth>
                            <SolarRadiationPage />
                        </RequiredAuth>
                    )
                }
            ]
        }
    ]
};

export default MainRoutes;
