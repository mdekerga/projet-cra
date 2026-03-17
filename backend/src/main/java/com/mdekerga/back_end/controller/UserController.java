package com.mdekerga.back_end.controller;

import com.mdekerga.back_end.dto.UserDTO;
import com.mdekerga.back_end.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.findAll();
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDto) {
        return new ResponseEntity<>(userService.save(userDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDto) {
        return userService.update(id, userDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }

    @PatchMapping("/{id}/activation")
    public void toggleActivation(@PathVariable Long id, @RequestParam boolean active) {
        userService.changeActivationStatus(id, active);
    }
}