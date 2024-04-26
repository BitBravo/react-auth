import { createContext, useState, useCallback, ReactNode, useEffect, useRef, FC } from "react";
import axios, { CancelTokenSource } from "axios";
import toast from "react-hot-toast";
import { fetchAuthor, fetchQuote, fetchProfile } from "../api/api";
import { Author, ErrorWithMessage, ProfileStep, Quote, User } from "../types";
import { errorMsgs } from "../config/errorMsg";

interface ProfileContextState {
  profile: User | null;
  author: Author | null;
  quote: Quote | null;
  loading: boolean;
  step: ProfileStep;
  getProfile: () => void;
  updateData: () => void;
  handleCancel: () => void;
}

const initialState = {
  loading: true,
  profile: null,
  author: null,
  quote: null,
  step: ProfileStep.READY,
  getProfile: () => {},
  updateData: () => {},
  handleCancel: () => {},
};

export const ProfileContext = createContext<ProfileContextState>(initialState);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<ProfileStep>(ProfileStep.READY);
  const apiSourceRef = useRef<CancelTokenSource>();

  useEffect(() => {
    return () => {
      if (apiSourceRef.current?.cancel) {
        apiSourceRef.current?.cancel();
      }
    };
  }, []);

  const getProfile = useCallback(async () => {
    setLoading(true);
    const userRes = await fetchProfile();
    if (userRes.success) setProfile(userRes.data);
    setLoading(false);
  }, []);

  const updateData = async () => {
    if (apiSourceRef.current?.cancel) {
      apiSourceRef.current.cancel();
    }

    apiSourceRef.current = axios.CancelToken.source();
    setStep(ProfileStep.START);

    try {
      const author = await fetchAuthor(apiSourceRef.current);
      setStep(author.success ? ProfileStep.FETCH_AUTHOR_SUCCESS : ProfileStep.FETCH_AUTHOR_FAILED);
      if (author.success && author?.data?.authorId) {
        setAuthor(author.data);
        const quote = await fetchQuote(author?.data?.authorId, apiSourceRef.current);
        setQuote(quote.data);
        setStep(quote.success ? ProfileStep.FETCH_QUOTE_SUCCESS : ProfileStep.FETCH_QUOTE_FAILED);
      }
    } catch (error) {
      const errorKey = (error as ErrorWithMessage)?.message;
      toast.error(errorMsgs[errorKey] ?? errorKey);
    } finally {
      handleCancel();
      setLoading(false);
    }
  };

  const handleCancel = useCallback(() => {
    apiSourceRef.current?.cancel();
    setStep(ProfileStep.READY);
  }, []);

  const value = {
    loading,
    profile,
    author,
    quote,
    step,
    getProfile,
    updateData,
    handleCancel,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
