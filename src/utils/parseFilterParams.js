const parseContactType = (type) => {
  if (typeof type !== 'string') return;
  const allowed = ['work', 'home', 'personal'];
  return allowed.includes(type) ? type : undefined;
};

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite, name, email } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    ...(parsedContactType && { contactType: parsedContactType }),
    ...(parsedIsFavourite !== undefined && { isFavourite: parsedIsFavourite }),
    ...(name && { name: new RegExp(name, 'i') }),
    ...(email && { email: new RegExp(email, 'i') }),
  };
};
