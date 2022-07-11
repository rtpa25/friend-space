export const generateRandomString = () => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 13; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
