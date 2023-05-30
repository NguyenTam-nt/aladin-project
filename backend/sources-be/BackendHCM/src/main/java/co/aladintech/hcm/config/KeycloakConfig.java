package co.aladintech.hcm.config;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KeycloakConfig {

    static Keycloak keycloak = null;
    static String serverUrl;
    @Value("${keycloak.serverUrl}")
    public void setServerUrl(String name){
        serverUrl = name;
    }
    public static String realm ;
    @Value("${keycloak.realm}")
    public void setRealm(String name){
        realm = name;
    }
    public static String clientId;
    @Value("${keycloak.clientId}")
    public void setClientId(String name){
        clientId = name;
    }
    static String clientSecret;
    @Value("${keycloak.clientSecret}")
    public void setClientSecret(String name){
        clientSecret = name;
    }
    static String userName;
    @Value("${keycloak.userName}")
    public void setUserName(String name){
        userName = name;
    }

    static String password;
    @Value("${keycloak.password}")
    public void setPassword(String name){
        password = name;
    }
    public KeycloakConfig() {
    }

    public synchronized static Keycloak getInstance(){
        if(keycloak == null){
            keycloak = KeycloakBuilder.builder()
                    .serverUrl(serverUrl)
                    .realm(realm)
                    .grantType(OAuth2Constants.PASSWORD)
                    .username(userName)
                    .password(password)
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .resteasyClient(new ResteasyClientBuilder()
                            .connectionPoolSize(10)
                            .build())
                    .build();
        }
        return keycloak;
    }

    public synchronized static final Keycloak getKeycloakInstance() {
        return Keycloak.getInstance(
                serverUrl,
                realm,
                userName,
                password,
                clientId,
                clientSecret);
    }
}
