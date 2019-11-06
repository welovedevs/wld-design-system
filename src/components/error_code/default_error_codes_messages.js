import { defineMessages } from 'react-intl';

const translations = defineMessages({
    shortMessage404: {
        id: 'ErrorCodes.404.shortMessage',
        defaultMessage: 'Ressource non trouvée'
    },
    longMessage404: {
        id: 'ErrorCodes.404.longMessage',
        defaultMessage: "Cette ressource n'est plus disponible ou l'URL n'est pas correcte."
    },
    shortMessage410: {
        id: 'ErrorCodes.410.shortMessage',
        defaultMessage: 'Ressource non disponible'
    },
    longMessage410: {
        id: 'ErrorCodes.410.longMessage',
        defaultMessage: "Cette ressource n'est plus disponible, probablement supprimée par notre équipe."
    },
    shortMessageUnknown: {
        id: 'ErrorCodes.unknown.shortMessage',
        defaultMessage: 'Erreur inconnue'
    },
    longMessageUnknown: {
        id: 'ErrorCodes.unknown.longMessage',
        defaultMessage: 'Cette erreur est inconnue, merci de contacter le support !'
    }
});

export const DEFAULT_ERROR_CODES_MESSAGES = Object.freeze({
    404: {
        shortMessage: translations.shortMessage404,
        longMessage: translations.longMessage404
    },
    410: {
        shortMessage: translations.shortMessage410,
        longMessage: translations.longMessage410
    },
    unknown: {
        shortMessage: translations.shortMessageUnknown,
        longMessage: translations.longMessageUnknown
    }
});
