const regexEmail = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

const validEmail = email => regexEmail.test(email);

const trimValue = val => val.trim();

const hasError = (elem) => {
  const { type, value: inputValue, required, id, tagName } = elem;
  if (required) {
    if (trimValue(inputValue) === '') {
      // if (!id || !name) throw new Error(`Attribute name and id are required on field ${tagName} type:${type}`);
      return `${id} is required`;
    }
  }
  switch (type) {
    case 'email':
      if (!validEmail(inputValue)) {
        return 'Invalid email';
      }
    break;
    default:
    break;
  }
  return '';
};

export const parseFormValueFromElements = (elements, keys) => {
  // id and name are required for validation, or skipped
  const errors = {};
  const values = {};

  for (const elem of elements) {
    const { name, id } = elem;
    if (!name || !id) continue;
    if (keys) {
      if (!keys.includes(name)) {
        continue;
      }
    }
    values[name] = trimValue(elem.value);
    const error = hasError(elem);
    if (error) {
      errors[name] = error;
      continue;
    }
  }

  return { values, errors };
};
