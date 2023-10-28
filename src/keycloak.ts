import {RNKeycloak} from '@react-keycloak/native';

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloak = new RNKeycloak({
  url: 'https://marketmoa.com.vn/auth',
  realm: 'plustmart',
  clientId: 'web_app',
});

export default keycloak;
