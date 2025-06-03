package com.kumaresan.blogger.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kumaresan.blogger.model.User;
import com.kumaresan.blogger.repository.UserRepository;
import com.kumaresan.blogger.security.JwtUtils;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AuthService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtils jwtUtils;
	private final AuthenticationManager authenticationManager;
	
	
	public ResponseEntity<?> register(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok("User Registered Successfully");
	}
	
	public ResponseEntity<?> login(User user) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
		);
		
		String token = jwtUtils.generateToken(user.getUsername());
		return ResponseEntity.ok(Map.of("token", token));
	}
}
