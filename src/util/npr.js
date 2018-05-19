import { clientId, secret, stationUrl, authorizeUrl, accessToken, refreshToken } from './constants';

function NPR() {
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
}

function buildStation(item) {
  const { links, attributes: { brand: { call, frequency, name, marketCity, marketState } } } = item;
  const { brand } = links;
  const logo = brand.find(b => b.rel === 'small-logo');
  const image = logo && logo.href;
  return { name, frequency, call, marketCity, marketState, image };
}

NPR.prototype.authorize = function() {
  const formData = new FormData();
  formData.append('grant_type', 'refresh_token');
  formData.append('client_id', clientId);
  formData.append('client_secret', secret);
  formData.append('refresh_token', this.refreshToken);
  return fetch(authorizeUrl, { body: formData, method: 'POST' })
    .then(res => res.json())
    .then(({ access_token, refresh_token}) => {
      this.accessToken = access_token;
      this.refreshToken = refresh_token;
    })
    .catch(err => console.error('Error:', err));
}

NPR.prototype.tryStations = function() {
  const headers = { authorization: `Bearer ${this.accessToken}` };
  return fetch(stationUrl, { headers })
    .then(res => {
      if (res.status === 401) {
        return this.authorize().then(() => this.tryStations());
      }
      return res;
    })
}

NPR.prototype.fetchStations = function() {
  return this.tryStations()
    .then(res => res.json())
    .then(data => data.items)
    .then(items => items.map(buildStation))
    .catch(err => console.error('Error:', err));
}

export default function() {
  return new NPR();
};
