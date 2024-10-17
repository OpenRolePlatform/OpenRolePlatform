export function getBonusValue(value?: number) {
  switch (value) {
    case 0:
      return '-5';
    case 1:
      return '-5';
    case 2:
      return '-4';
    case 3:
      return '-4';
    case 4:
      return '-3';
    case 5:
      return '-3';
    case 6:
      return '-2';
    case 7:
      return '-2';
    case 8:
      return '-1';
    case 9:
      return '-1';
    case 10:
      return '+0';
    case 11:
      return '+0';
    case 12:
      return '+1';
    case 13:
      return '+1';
    case 14:
      return '+2';
    case 15:
      return '+2';
    case 16:
      return '+3';
    case 17:
      return '+3';
    case 18:
      return '+4';
    case 19:
      return '+4';
    case 20:
      return '+5';
    default:
      return '-';
  }
}
