import React, { createContext, useState, useCallback, useContext, ReactNode, useEffect, useRef } from "react";
import axios, { CancelTokenSource } from "axios";
import { fetchAuthor, fetchQuote, fetchProfile } from "../api/api";
import { Author, ProfileStepEnum, Quote, User } from "../types";

interface ProfileContextState {
  profile: User | null;
  author: Author | null;
  quote: Quote | null;
  loading: boolean;
  step: ProfileStepEnum;
  getProfile: () => void;
  updateData: () => void;
  handleCancel: () => void;
}

const initialState = {
  loading: true,
  profile: null,
  author: null,
  quote: null,
  step: ProfileStepEnum.READY,
  getProfile: () => {},
  updateData: () => {},
  handleCancel: () => {},
};

const ProfileContext = createContext<ProfileContextState>(initialState);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<ProfileStepEnum>(ProfileStepEnum.READY);
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
      apiSourceRef.current?.cancel();
    }

    apiSourceRef.current = axios.CancelToken.source();

    setStep(ProfileStepEnum.START);

    try {
      const author = await fetchAuthor(apiSourceRef.current);
      setStep(author.success ? ProfileStepEnum.FETCH_AUTHOR_SUCCESS : ProfileStepEnum.FETCH_AUTHOR_FAILED);
      if (author.success && author?.data?.authorId) {
        setAuthor(author.data);
        const quote = await fetchQuote(author?.data?.authorId, apiSourceRef.current);
        setQuote(quote.data);
        setStep(quote.success ? ProfileStepEnum.FETCH_QUOTE_SUCCESS : ProfileStepEnum.FETCH_QUOTE_FAILED);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = useCallback(() => {
    apiSourceRef.current?.cancel();
    setStep(ProfileStepEnum.READY);
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

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
