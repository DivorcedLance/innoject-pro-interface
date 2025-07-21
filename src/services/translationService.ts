// Translation Service using AI APIs

type TranslationData = Record<string, unknown>;

export interface TranslationProvider {
  name: string;
  translate: (text: string, targetLanguage: string, sourceLanguage?: string) => Promise<string>;
  translateBatch: (texts: TranslationData, targetLanguage: string, sourceLanguage?: string) => Promise<TranslationData>;
}

// Google Translate API provider
class GoogleTranslateProvider implements TranslationProvider {
  name = 'Google Translate';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translate(text: string, targetLanguage: string, sourceLanguage = 'en'): Promise<string> {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            source: sourceLanguage,
            target: targetLanguage,
            format: 'text',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Google Translate error:', error);
      throw error;
    }
  }

  async translateBatch(
    texts: TranslationData,
    targetLanguage: string,
    sourceLanguage = 'en'
  ): Promise<TranslationData> {
    const flatTexts = this.flattenObject(texts);
    const translatedTexts: Record<string, string> = {};

    // Batch translate in chunks to avoid API limits
    const chunks = this.chunkArray(Object.entries(flatTexts), 100);
    
    for (const chunk of chunks) {
      const promises = chunk.map(async ([key, text]) => {
        try {
          const translated = await this.translate(text, targetLanguage, sourceLanguage);
          return [key, translated];
        } catch (error) {
          console.warn(`Failed to translate "${key}": ${text}`, error);
          return [key, text]; // Fallback to original text
        }
      });

      const results = await Promise.all(promises);
      results.forEach(([key, translatedText]) => {
        translatedTexts[key] = translatedText;
      });
    }

    return this.unflattenObject(translatedTexts);
  }

  private flattenObject(obj: TranslationData, prefix = ''): Record<string, string> {
    const flattened: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        Object.assign(flattened, this.flattenObject(value as TranslationData, newKey));
      } else if (typeof value === 'string') {
        flattened[newKey] = value;
      }
    }
    
    return flattened;
  }

  private unflattenObject(flattened: Record<string, string>): TranslationData {
    const result: TranslationData = {};
    
    for (const [key, value] of Object.entries(flattened)) {
      const keys = key.split('.');
      let current = result;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {};
        }
        current = current[keys[i]] as TranslationData;
      }
      
      current[keys[keys.length - 1]] = value;
    }
    
    return result;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

// OpenAI GPT provider (alternative)
class OpenAITranslateProvider implements TranslationProvider {
  name = 'OpenAI GPT';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'gpt-3.5-turbo') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async translate(text: string, targetLanguage: string, sourceLanguage = 'en'): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are a professional translator. Translate the given text from ${sourceLanguage} to ${targetLanguage}. Return only the translated text without any additional commentary.`,
            },
            {
              role: 'user',
              content: text,
            },
          ],
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI Translate error:', error);
      throw error;
    }
  }

  async translateBatch(
    texts: TranslationData,
    targetLanguage: string,
    sourceLanguage = 'en'
  ): Promise<TranslationData> {
    const flatTexts = this.flattenObject(texts);
    const translatedTexts: Record<string, string> = {};

    // Process in smaller batches for OpenAI
    const chunks = this.chunkArray(Object.entries(flatTexts), 10);
    
    for (const chunk of chunks) {
      const promises = chunk.map(async ([key, text]) => {
        try {
          const translated = await this.translate(text, targetLanguage, sourceLanguage);
          return [key, translated];
        } catch (error) {
          console.warn(`Failed to translate "${key}": ${text}`, error);
          return [key, text];
        }
      });

      const results = await Promise.all(promises);
      results.forEach(([key, translatedText]) => {
        translatedTexts[key] = translatedText;
      });

      // Add delay between batches to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return this.unflattenObject(translatedTexts);
  }

  private flattenObject(obj: TranslationData, prefix = ''): Record<string, string> {
    const flattened: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        Object.assign(flattened, this.flattenObject(value as TranslationData, newKey));
      } else if (typeof value === 'string') {
        flattened[newKey] = value;
      }
    }
    
    return flattened;
  }

  private unflattenObject(flattened: Record<string, string>): TranslationData {
    const result: TranslationData = {};
    
    for (const [key, value] of Object.entries(flattened)) {
      const keys = key.split('.');
      let current = result;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {};
        }
        current = current[keys[i]] as TranslationData;
      }
      
      current[keys[keys.length - 1]] = value;
    }
    
    return result;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

// Translation Service Manager
export class TranslationService {
  private provider: TranslationProvider;

  constructor(provider: TranslationProvider) {
    this.provider = provider;
  }

  static createGoogleProvider(apiKey: string): TranslationService {
    return new TranslationService(new GoogleTranslateProvider(apiKey));
  }

  static createOpenAIProvider(apiKey: string, model?: string): TranslationService {
    return new TranslationService(new OpenAITranslateProvider(apiKey, model));
  }

  async translateText(text: string, targetLanguage: string, sourceLanguage?: string): Promise<string> {
    return this.provider.translate(text, targetLanguage, sourceLanguage);
  }

  async translateJSON(
    jsonData: TranslationData,
    targetLanguage: string,
    sourceLanguage?: string
  ): Promise<TranslationData> {
    return this.provider.translateBatch(jsonData, targetLanguage, sourceLanguage);
  }

  async generateTranslationFile(
    baseLanguageData: TranslationData,
    targetLanguage: string,
    sourceLanguage = 'en'
  ): Promise<string> {
    try {
      const translatedData = await this.translateJSON(baseLanguageData, targetLanguage, sourceLanguage);
      return JSON.stringify(translatedData, null, 2);
    } catch (error) {
      console.error('Failed to generate translation file:', error);
      throw error;
    }
  }

  getProviderName(): string {
    return this.provider.name;
  }
}

// Language code mapping for different services
export const LANGUAGE_CODES = {
  'ar': { google: 'ar', openai: 'Arabic' },
  'bg': { google: 'bg', openai: 'Bulgarian' },
  'cs': { google: 'cs', openai: 'Czech' },
  'da': { google: 'da', openai: 'Danish' },
  'de': { google: 'de', openai: 'German' },
  'el': { google: 'el', openai: 'Greek' },
  'en': { google: 'en', openai: 'English' },
  'es': { google: 'es', openai: 'Spanish' },
  'fi': { google: 'fi', openai: 'Finnish' },
  'fr': { google: 'fr', openai: 'French' },
  'hi': { google: 'hi', openai: 'Hindi' },
  'hu': { google: 'hu', openai: 'Hungarian' },
  'it': { google: 'it', openai: 'Italian' },
  'ja': { google: 'ja', openai: 'Japanese' },
  'ko': { google: 'ko', openai: 'Korean' },
  'nl': { google: 'nl', openai: 'Dutch' },
  'no': { google: 'no', openai: 'Norwegian' },
  'pl': { google: 'pl', openai: 'Polish' },
  'pt': { google: 'pt', openai: 'Portuguese' },
  'ro': { google: 'ro', openai: 'Romanian' },
  'ru': { google: 'ru', openai: 'Russian' },
  'sv': { google: 'sv', openai: 'Swedish' },
  'th': { google: 'th', openai: 'Thai' },
  'tr': { google: 'tr', openai: 'Turkish' },
  'uk': { google: 'uk', openai: 'Ukrainian' },
  'vi': { google: 'vi', openai: 'Vietnamese' },
  'zh-CN': { google: 'zh-cn', openai: 'Chinese (Simplified)' },
  'zh-TW': { google: 'zh-tw', openai: 'Chinese (Traditional)' },
};

export default TranslationService;
