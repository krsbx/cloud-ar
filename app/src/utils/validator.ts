export const isJson = (values: any, optional?: boolean) => {
  if (optional && (values === '' || values === undefined)) return true;

  try {
    JSON.parse(values);
  } catch {
    return false;
  }

  return true;
};

export const isNumber = (values: any) => {
  if (isNaN(values)) return false;

  return true;
};

export const isImage = (file: File) => {
  if (!file.name) return false;

  const name = file.name.split('.');
  const extensions = name.pop();

  if (extensions === 'png' || extensions === 'jpg') return true;
  return false;
};

const validator = { isJson, isNumber, isImage };

export default validator;
