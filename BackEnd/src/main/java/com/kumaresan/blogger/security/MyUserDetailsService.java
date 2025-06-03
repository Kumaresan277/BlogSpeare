package com.kumaresan.blogger.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kumaresan.blogger.model.User;
import com.kumaresan.blogger.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	private final UserRepository userRepository;
	
	public MyUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository; 
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsername(username).orElseThrow();
		System.out.println("Login userName : "+user.getUsername()+" your password is : "+user.getPassword());
		return org.springframework.security.core.userdetails.User.builder()
				.username(user.getUsername())
				.password(user.getPassword())
				.roles("USER")
				.build();
	}
	
}
