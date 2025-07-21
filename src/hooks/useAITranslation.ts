import { useState, useCallback } from 'react';
import { TranslationService, LANGUAGE_CODES } from '../services/translationService';

interface TranslationState {
  isTranslating: boolean;
  progress: number;
  error: string | null;
  completedLanguages: string[];
}

interface UseAITranslationReturn {
  state: TranslationState;
  translateLanguage: (languageCode: string, baseLanguageData: Record<string, unknown>, apiKey: string, provider: 'google' | 'openai') => Promise<string | null>;
  translateMultipleLanguages: (languageCodes: string[], baseLanguageData: Record<string, unknown>, apiKey: string, provider: 'google' | 'openai') => Promise<Record<string, string>>;
  reset: () => void;
}

export const useAITranslation = (): UseAITranslationReturn => {
  const [state, setState] = useState<TranslationState>({
    isTranslating: false,
    progress: 0,
    error: null,
    completedLanguages: [],
  });

  const reset = useCallback(() => {
    setState({
      isTranslating: false,
      progress: 0,
      error: null,
      completedLanguages: [],
    });
  }, []);

  const translateLanguage = useCallback(
    async (
      languageCode: string,
      baseLanguageData: Record<string, unknown>,
      apiKey: string,
      provider: 'google' | 'openai'
    ): Promise<string | null> => {
      try {
        setState(prev => ({
          ...prev,
          isTranslating: true,
          error: null,
        }));

        // Create translation service
        const translationService = provider === 'google'
          ? TranslationService.createGoogleProvider(apiKey)
          : TranslationService.createOpenAIProvider(apiKey);

        // Get the correct language code for the provider
        const languageMapping = LANGUAGE_CODES[languageCode as keyof typeof LANGUAGE_CODES];
        if (!languageMapping) {
          throw new Error(`Language code ${languageCode} is not supported`);
        }

        const targetLanguageCode = provider === 'google' 
          ? languageMapping.google 
          : languageMapping.openai;

        // Generate translation file
        const translatedJSON = await translationService.generateTranslationFile(
          baseLanguageData,
          targetLanguageCode,
          'en' // Source language is always English
        );

        setState(prev => ({
          ...prev,
          isTranslating: false,
          completedLanguages: [...prev.completedLanguages, languageCode],
          progress: 100,
        }));

        return translatedJSON;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Translation failed';
        setState(prev => ({
          ...prev,
          isTranslating: false,
          error: errorMessage,
        }));
        return null;
      }
    },
    []
  );

  const translateMultipleLanguages = useCallback(
    async (
      languageCodes: string[],
      baseLanguageData: Record<string, unknown>,
      apiKey: string,
      provider: 'google' | 'openai'
    ): Promise<Record<string, string>> => {
      const results: Record<string, string> = {};
      const total = languageCodes.length;

      try {
        setState(prev => ({
          ...prev,
          isTranslating: true,
          error: null,
          progress: 0,
          completedLanguages: [],
        }));

        for (let i = 0; i < languageCodes.length; i++) {
          const languageCode = languageCodes[i];
          
          // Update progress
          setState(prev => ({
            ...prev,
            progress: Math.round((i / total) * 100),
          }));

          const translatedJSON = await translateLanguage(
            languageCode,
            baseLanguageData,
            apiKey,
            provider
          );

          if (translatedJSON) {
            results[languageCode] = translatedJSON;
          }

          // Add delay between translations to respect rate limits
          if (i < languageCodes.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        setState(prev => ({
          ...prev,
          isTranslating: false,
          progress: 100,
        }));

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Translation failed';
        setState(prev => ({
          ...prev,
          isTranslating: false,
          error: errorMessage,
        }));
      }

      return results;
    },
    [translateLanguage]
  );

  return {
    state,
    translateLanguage,
    translateMultipleLanguages,
    reset,
  };
};

export default useAITranslation;
