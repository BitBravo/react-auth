import { useEffect, useMemo } from "react";
import Seo from "../components/Seo";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProfile } from "../hooks/useProfile";
import { ProfileStep } from "../types";

const ProfilePage = () => {
  const { loading, profile, quote, step, getProfile, updateData, handleCancel } = useProfile();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const { showModal, authorStatus, quoteStatus } = useMemo(() => {
    let authorStatus = "";
    let quoteStatus = "";
    if (step === ProfileStep.FETCH_AUTHOR_FAILED) authorStatus = "Failed";
    else if (step >= ProfileStep.FETCH_AUTHOR_SUCCESS) authorStatus = "Completed";

    if (step === ProfileStep.FETCH_QUOTE_FAILED) quoteStatus = "Failed";
    else if (step === ProfileStep.FETCH_QUOTE_SUCCESS) quoteStatus = "Completed";

    return {
      showModal: step > ProfileStep.READY,
      authorStatus,
      quoteStatus,
    };
  }, [step]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Seo title="Profile" />
      <div className="mt-6 flex gap-2">
        <img src="/profile.jpeg" alt="profile-avatar" className="h-24 w-24 rounded-full" />
        <div className="ml-6">
          <h1 className="mb-2 text-4xl font-semibold">Welcome, {profile?.fullName}!</h1>

          <button
            type="button"
            className="mt-2 rounded-lg border bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-400"
            onClick={updateData}
          >
            Update
          </button>
        </div>
      </div>
      {!!quote?.quote && <div className="mt-8 text-sm text-slate-800">{quote?.quote}</div>}

      <Modal isOpen={showModal} onClose={handleCancel} title="Requesting the quote">
        <p>Step 1: Requesting author.. {authorStatus}</p>
        <p>Step 2: Requesting quote.. {quoteStatus}</p>
      </Modal>
    </div>
  );
};

export default ProfilePage;
