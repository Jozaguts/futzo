const monthsNumeric = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const monthsTextShort = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const monthsTextLong = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// Expresión regular para validar el día con o sin ceros iniciales (1-31, 01-31)
const dayPattern = /^(0?[1-9]|[12][0-9]|3[01])$/;

// Expresión regular para el año (cuatro dígitos)
const yearPattern = /^\d{2,4}$/;

// Separadores posibles: espacio, guion, slash o backslash
const separatorPattern = /[ \-\/\\]/;
const getMonthNumber = (month: string): number => {
  const monthIndexShort = monthsTextShort.indexOf(month.toLowerCase());
  const monthIndexLong = monthsTextLong.indexOf(month.toLowerCase());

  if (monthIndexShort !== -1) {
    return monthIndexShort + 1; // Convertir a 1-index (enero es 1)
  }

  if (monthIndexLong !== -1) {
    return monthIndexLong + 1;
  }

  return parseInt(month, 10); // Si es numérico, devolver el número
};
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getFullYear = (year: string): number => {
  const currentYear = new Date().getFullYear(); // Año actual, por ejemplo, 2024
  const currentYearTwoDigits = currentYear % 100; // Últimos 2 dígitos del año actual, por ejemplo, 24

  // Si el año tiene 4 dígitos, devolverlo como está
  if (year.length === 4) {
    return parseInt(year, 10);
  }

  // Si tiene 2 dígitos, verificar si es mayor o menor que los últimos dos dígitos del año actual
  const yearTwoDigits = parseInt(year, 10);
  if (yearTwoDigits <= currentYearTwoDigits) {
    return 2000 + yearTwoDigits; // Siglo 21
  } else {
    return 1900 + yearTwoDigits; // Siglo 20
  }
};
const validateAndFormatDate = (
  input: string,
): { format: string; raw: Date } | null => {
  const separators = input.split(separatorPattern);

  if (separators.length !== 3) {
    return null;
  }

  const [day, month, year] = separators;

  // Validar el día
  if (!dayPattern.test(day)) {
    return null;
  }
  // Validar el año
  if (!yearPattern.test(year)) {
    return null;
  }
  const fullYear = getFullYear(year);
  // Obtener el mes en número
  const monthNumber = getMonthNumber(month);

  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return null;
  }
  const formattedDate = new Date(fullYear, monthNumber - 1, parseInt(day));
  // Crear la fecha y formatearla
  const format = formatDate(formattedDate);
  return {
    format,
    raw: formattedDate,
  };
};
export default validateAndFormatDate;
