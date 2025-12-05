import ProfileContainer from "@/components/profile";
import { User } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md">
        {/* <div className="bg-linear-to-r from-blue-600 to-blue-800 h-32"></div> */}
        <div className="px-6 pb-6">
          <div className="-mt-16 mb-4">
            {/* <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <User size={64} className="text-blue-600" />
            </div> */}
          </div>
          
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-1">John Doe</h2>
          <p className="text-gray-600 mb-6">Senior Compliance Officer</p> */}

          <div className="border-t mt-1 border-gray-200 pt-6">
            <ProfileContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;