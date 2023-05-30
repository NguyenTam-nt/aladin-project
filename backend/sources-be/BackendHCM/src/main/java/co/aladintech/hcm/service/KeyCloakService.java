package co.aladintech.hcm.service;

import co.aladintech.hcm.config.Credentials;
import co.aladintech.hcm.config.KeycloakConfig;
import co.aladintech.hcm.security.AuthoritiesConstants;
import co.aladintech.hcm.service.dto.UserKeycloak;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class KeyCloakService {
    public void addUser(UserKeycloak userKeycloak){
        CredentialRepresentation credential = Credentials
            .createPasswordCredentials(userKeycloak.getPassword());
        UserRepresentation user = new UserRepresentation();
        user.setUsername(userKeycloak.getLogin());
        user.setEmail(userKeycloak.getEmail());
        user.setCredentials(Collections.singletonList(credential));
        Map<String, List<String>> map = new HashMap<>();
        List<String> gender = new ArrayList<>();
        gender.add(userKeycloak.getGender());
        map.put("gender",gender);
        List<String> fullname = new ArrayList<>();
        fullname.add(userKeycloak.getFullname());
        map.put("fullname",fullname);
        List<String> yearOfBirth = new ArrayList<>();
        yearOfBirth.add(userKeycloak.getYearOfBirth());
        map.put("yearOfBirth",yearOfBirth);
        List<String> position = new ArrayList<>();
        position.add(userKeycloak.getPosition());
        map.put("position",position);
        List<String> phoneNumber = new ArrayList<>();
        phoneNumber.add(userKeycloak.getPhoneNumber());
        map.put("phoneNumber",phoneNumber);
        List<String> imageUrl = new ArrayList<>();
        imageUrl.add(userKeycloak.getImageUrl());
        map.put("imageUrl",imageUrl);
        user.setAttributes(map);
        user.setEnabled(true);
        UsersResource instance = getInstance();
        instance.create(user);
    }

    public void updateUser(String userId, UserKeycloak userKeycloak){
        CredentialRepresentation credential = Credentials
            .createPasswordCredentials(userKeycloak.getPassword());
        UserRepresentation user = new UserRepresentation();
        user.setUsername(userKeycloak.getLogin());
        user.setEmail(userKeycloak.getEmail());
        user.setCredentials(Collections.singletonList(credential));
        Map<String, List<String>> map = new HashMap<>();
        List<String> gender = new ArrayList<>();
        gender.add(userKeycloak.getGender());
        map.put("gender",gender);
        List<String> fullname = new ArrayList<>();
        fullname.add(userKeycloak.getFullname());
        map.put("fullname",fullname);
        List<String> yearOfBirth = new ArrayList<>();
        yearOfBirth.add(userKeycloak.getYearOfBirth());
        map.put("yearOfBirth",yearOfBirth);
        List<String> position = new ArrayList<>();
        position.add(userKeycloak.getPosition());
        map.put("position",position);
        List<String> phoneNumber = new ArrayList<>();
        phoneNumber.add(userKeycloak.getPhoneNumber());
        map.put("phoneNumber",phoneNumber);
        List<String> imageUrl = new ArrayList<>();
        imageUrl.add(userKeycloak.getImageUrl());
        map.put("imageUrl",imageUrl);
        user.setAttributes(map);
        user.setEnabled(true);
        UsersResource usersResource = getInstance();
        usersResource.get(userId).update(user);
    }

    public UserKeycloak getUserId(String id){
        UsersResource usersResource = getInstance();
        Keycloak keycloak = KeycloakConfig.getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(KeycloakConfig.realm);
        UserRepresentation userRepresentation = usersResource.get(id).toRepresentation();
        UserKeycloak userMap = new UserKeycloak();
        userMap.setId(userRepresentation.getId());
        userMap.setEmail(userRepresentation.getEmail());
        userMap.setLogin(userRepresentation.getUsername());
        Map<String, List<String>> map = userRepresentation.getAttributes();
        try {
            userMap.setFullname(map.get("fullname").get(0));
        } catch (Exception e){}

        try {
            userMap.setYearOfBirth(map.get("yearOfBirth").get(0));
        } catch (Exception e){}

        try {
            userMap.setGender(map.get("gender").get(0));
        } catch (Exception e){}

        try {
            userMap.setPosition(map.get("position").get(0));
        } catch (Exception e){}

        try {
            userMap.setPhoneNumber(map.get("phoneNumber").get(0));
        } catch (Exception e){}

        try {
            userMap.setImageUrl(map.get("imageUrl").get(0));
        } catch (Exception e){}
        ClientRepresentation clientRepresentation = realmResource.clients().findByClientId(KeycloakConfig.clientId).get(0);
        List<RoleRepresentation> roles = usersResource.get(userRepresentation.getId()).roles().clientLevel(clientRepresentation.getId()).listAll();
        List<String> roleMap = new ArrayList<>();
        for (RoleRepresentation roleRepresentation : roles){
            roleMap.add(roleRepresentation.getName());
        }
        if (roleMap.contains(AuthoritiesConstants.SYSTEM)){
            userMap.setRole(AuthoritiesConstants.SYSTEM);
        } else {
            if (roleMap.contains(AuthoritiesConstants.ADMIN)){
                userMap.setRole(AuthoritiesConstants.ADMIN);
            }  else {
                userMap.setRole(AuthoritiesConstants.USER);
            }
        }
        return userMap;

    }


    public List<UserKeycloak> searchUser(String username){
        UsersResource usersResource = getInstance();
        List<UserRepresentation> user = usersResource.list();
        Keycloak keycloak = KeycloakConfig.getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(KeycloakConfig.realm);
        List<UserKeycloak> users = new ArrayList<>();
        usersResource.search(username).forEach(userRepresentation -> {
            UserKeycloak userMap = new UserKeycloak();
            userMap.setId(userRepresentation.getId());
            Map<String, List<String>> map = userRepresentation.getAttributes();
            try {
                userMap.setFullname(map.get("fullname").get(0));
            } catch (Exception e){}

            try {
                userMap.setYearOfBirth(map.get("yearOfBirth").get(0));
            } catch (Exception e){}

            try {
                userMap.setGender(map.get("gender").get(0));
            } catch (Exception e){}

            try {
                userMap.setPosition(map.get("position").get(0));
            } catch (Exception e){}

            try {
                userMap.setPhoneNumber(map.get("phoneNumber").get(0));
            } catch (Exception e){}

            try {
                userMap.setImageUrl(map.get("imageUrl").get(0));
            } catch (Exception e){}

            userMap.setEmail(userRepresentation.getEmail());
            userMap.setLogin(userRepresentation.getUsername());
            ClientRepresentation clientRepresentation = realmResource.clients().findByClientId(KeycloakConfig.clientId).get(0);
            List<RoleRepresentation> roles = usersResource.get(userRepresentation.getId()).roles().clientLevel(clientRepresentation.getId()).listAll();
            List<String> roleMap = new ArrayList<>();
            for (RoleRepresentation roleRepresentation : roles){
                roleMap.add(roleRepresentation.getName());
            }
            if (roleMap.contains(AuthoritiesConstants.SYSTEM)){
                userMap.setRole(AuthoritiesConstants.SYSTEM);
            } else {
                if (roleMap.contains(AuthoritiesConstants.ADMIN)){
                    userMap.setRole(AuthoritiesConstants.ADMIN);
                }  else {
                    userMap.setRole(AuthoritiesConstants.USER);
                }
            }
            users.add(userMap);

        });
        return users;

    }


    public void deleteUser(String userId){
        UsersResource usersResource = getInstance();
        usersResource.get(userId)
                .remove();
    }


    public void updateRole(String userId,String role){
        Keycloak keycloak = KeycloakConfig.getKeycloakInstance();
        RealmResource realmResource = keycloak.realm(KeycloakConfig.realm);
        UsersResource userRessource = realmResource.users();
        ClientRepresentation clientRep = realmResource.clients().findByClientId(KeycloakConfig.clientId).get(0);
        RoleRepresentation roleSystem = realmResource.clients().get(clientRep.getId()).roles().get(AuthoritiesConstants.SYSTEM).toRepresentation();
        RoleRepresentation roleAdmin = realmResource.clients().get(clientRep.getId()).roles().get(AuthoritiesConstants.ADMIN).toRepresentation();
        switch (role){
            case AuthoritiesConstants.SYSTEM :{
                userRessource.get(userId).roles().clientLevel(clientRep.getId()).add(Arrays.asList(roleSystem));
                break;
            }
            case AuthoritiesConstants.ADMIN: {
                userRessource.get(userId).roles().clientLevel(clientRep.getId()).remove(Arrays.asList(roleSystem));
                userRessource.get(userId).roles().clientLevel(clientRep.getId()).add(Arrays.asList(roleAdmin));
                break;
            }
            case AuthoritiesConstants.USER: {
                userRessource.get(userId).roles().clientLevel(clientRep.getId()).remove(Arrays.asList(roleSystem));
                userRessource.get(userId).roles().clientLevel(clientRep.getId()).remove(Arrays.asList(roleAdmin));
                break;
            }

        }

    }

    public UsersResource getInstance(){
        return KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users();
    }


}
