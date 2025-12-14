import { Outlet } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import ProfileSidebar from '../components/profile/ProfileSidebar';

const ProfilePage: React.FC = () => {
    usePageTitle("Area Personale | Mya Oro");

    return (
        <div className="pt-32 pb-24 min-h-screen bg-white md:bg-[#FAFAFA]">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">

                <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                    {/* Sidebar Navigation */}
                    <ProfileSidebar />

                    {/* Main Content Area */}
                    <div className="flex-grow w-full">
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
