// from GH docs Request a user's GitHub identity
const URL = 'https://github.com/login/oauth/authorize';
// needed query string
// Client ID
// 13919678b29846514b47
// Client Secret
// 2ab5e556b0d2b1a785591e6f910034ac4e2f41f9
const options = {
  client_id: '13919678b29846514b47', //required!!
  scope: 'read:user',
  state: '401 lab',
};
// converting the obj to string and formatting the resulting string
const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');

console.log('Query', queryString);
// making the full url
const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('oauth');
link.setAttribute('href', authUrl);