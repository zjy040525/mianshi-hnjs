const shuffle = string => {
  const a = string.split('');
  const n = a.length;

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};

const pwd = () => {
  let password = '';
  const pattern = '1234567890';
  const pattern2 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < 8; i++) {
    if (i % 2) {
      password += pattern[Math.floor(Math.random() * pattern.length)];
      continue;
    }
    password += pattern2[Math.floor(Math.random() * pattern2.length)];
  }
  return shuffle(password);
};

module.exports = pwd;
