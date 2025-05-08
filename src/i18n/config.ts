import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

const supportedLanguages = ['en', 'fr'];

export function detectUserLanguage(): string {
    if (!localStorage.getItem('tc_language')) {
        const preferredLanguages = navigator.languages || [navigator.language];
        const detectedLang = preferredLanguages[0].split('-')[0];
        return supportedLanguages.includes(detectedLang) ? detectedLang : 'en';
    } else {
        return localStorage.getItem('tc_language')?.toLowerCase() || 'en';
    }
}

const userLanguage = detectUserLanguage();

export const i18n = createI18n({
    locale: userLanguage,
    fallbackLocale: 'en',
    messages: {
        en,
        fr,
    },
});
