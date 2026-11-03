import { ValidationErrorsIBAN } from 'ibantools';
import { translate } from '@/plugins/i18n.plugin';

export { getFriendlyErrors };

const ibanErrorToMessage = {
  [ValidationErrorsIBAN.NoIBANProvided]: 'No IBAN provided',
  [ValidationErrorsIBAN.NoIBANCountry]: 'No IBAN country',
  [ValidationErrorsIBAN.WrongBBANLength]: 'Wrong BBAN length',
  [ValidationErrorsIBAN.WrongBBANFormat]: 'Wrong BBAN format',
  [ValidationErrorsIBAN.ChecksumNotNumber]: 'Checksum is not a number',
  [ValidationErrorsIBAN.WrongIBANChecksum]: 'Wrong IBAN checksum',
  [ValidationErrorsIBAN.WrongAccountBankBranchChecksum]: 'Wrong account bank branch checksum',
  [ValidationErrorsIBAN.QRIBANNotAllowed]: 'QR-IBAN not allowed',
};

function getFriendlyErrors(errorCodes: ValidationErrorsIBAN[]) {
  // Mensagem traduzida pelo nome do código de erro; o mapa original define quais erros são exibidos
  return errorCodes.map(errorCode => (ibanErrorToMessage[errorCode] ? translate(`tools.iban-validator-and-parser.ibanErrors.${ValidationErrorsIBAN[errorCode]}`) : undefined)).filter((message): message is string => Boolean(message));
}
