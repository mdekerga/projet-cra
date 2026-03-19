package com.mdekerga.back_end.service;

import com.mdekerga.back_end.dto.UserDTO;
import com.mdekerga.back_end.entity.User;
import com.mdekerga.back_end.enums.Statut;
import com.mdekerga.back_end.exception.ResourceNotFoundException;
import com.mdekerga.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Chercher l'utilisateur en base
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email : " + email));


        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isActive(),
                true,
                true,
                true,
                authorities
        );
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    public UserDTO findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'id : " + id));
        return mapToDTO(user);
    }


    public UserDTO save(UserDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Erreur : Cet email est déjà utilisé.");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        updateEntityWithDto(user, dto);

        if (user.getStatut() == null) {
            user.setStatut(Statut.INTERCONTRAT);
        }

        return mapToDTO(userRepository.save(user));
    }

    public UserDTO update(Long id, UserDTO dto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'id : " + id));

        updateEntityWithDto(existingUser, dto);

        return mapToDTO(userRepository.save(existingUser));
    }

    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Impossible de supprimer : Utilisateur inexistant.");
        }
        userRepository.deleteById(id);
    }

    public void changeActivationStatus(Long id, boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
        user.setActive(active);
        userRepository.save(user);
    }

    private void updateEntityWithDto(User entity, UserDTO dto) {
        entity.setFirst_name((dto.getFirstName()));
        entity.setLast_name(dto.getLastName());
        entity.setActive(dto.isActive());
        entity.setStatut(dto.getStatut());
        entity.setContrat(dto.getContrat());
        entity.setSeniorite(dto.getSeniorite());
        entity.setSalaire(dto.getSalaire());
        entity.setRole(dto.getRole());
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirst_name());
        dto.setLastName(user.getLast_name());
        dto.setEmail(user.getEmail());
        dto.setActive(user.isActive());
        dto.setStatut(user.getStatut());
        dto.setContrat(user.getContrat());
        dto.setSeniorite(user.getSeniorite());
        dto.setSalaire(user.getSalaire());
        dto.setRole(user.getRole());
        return dto;
    }
}