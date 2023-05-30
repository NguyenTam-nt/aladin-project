package co.aladintech.hcm.web.rest;

import co.aladintech.hcm.service.KeyCloakService;
import co.aladintech.hcm.service.UserService;
import co.aladintech.hcm.service.dto.UserKeycloak;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.PaginationUtil;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/keycloak")
public class KeyCloakResource {

    KeyCloakService service;
    UserService userService;

    public KeyCloakResource(KeyCloakService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping("/userinfo")
    public UserKeycloak getUser(Principal principal) {
        String userid = userService.getUserFromAuthentication((AbstractAuthenticationToken) principal).getId();
        return service.getUserId(userid);
    }

    @PostMapping("adduser")
    public String addUser(@RequestBody UserKeycloak userKeycloak){
        service.addUser(userKeycloak);
        return "User Added Successfully.";
    }

    @PutMapping(path = "/update/{userId}")
    public String updateUser(@PathVariable("userId") String userId, @RequestBody UserKeycloak userKeycloak){
        service.updateUser(userId, userKeycloak);
        return "User Details Updated Successfully.";
    }

    @GetMapping( "/searchuser")
    public Object searchUSer(Pageable pageable, @RequestParam String username){
        try {
            List<UserKeycloak> user = service.searchUser(username);
            int start = (int)pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), user.size());
            if (start > user.size()){
                start = 0;
                end =0;
            }
            Page<UserKeycloak> page= new PageImpl<UserKeycloak>(user.subList(start,end), pageable, user.size());
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        } catch (Exception e){
            return "ERROR";
        }
    }

    @PutMapping(path = "/updateRole/{userId}")
    public String updateRole(@PathVariable("userId") String userId, @RequestParam String role){
        service.updateRole(userId, role);
        return "Updated Role Successfully.";
    }


    @DeleteMapping(path = "/delete/{userId}")
    public String deleteUser(@PathVariable("userId") String userId){
        service.deleteUser(userId);
        return "User Deleted Successfully.";
    }

    @DeleteMapping(path = "/deletelist")
    public String deleteUser(@RequestBody List<String> ids){
        for (String id : ids){
            service.deleteUser(id);
        }
        return "User Deleted Successfully.";
    }
}
